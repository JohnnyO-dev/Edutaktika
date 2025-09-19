// draggable-analog-clock.js
// Self-contained vanilla JS analog clock widget with drag, keyboard, and editor support
// See angle↔time conversion, wrap-around, and snapping comments below
(function (global) {
  function angleToTime(angle, mode, snap) {
    // angle: degrees from 12 o'clock, clockwise
    // mode: '12h' or '24h'
    // snap: snap to nearest N minutes
    // 360deg = 12h or 24h
    var totalHours = mode === '24h' ? 24 : 12;
    var totalMinutes = totalHours * 60;
    var minutes = Math.round((angle % 360) / 360 * totalMinutes);
    // Snap to nearest snap
    minutes = Math.round(minutes / snap) * snap;
    // Wrap-around
    if (minutes < 0) minutes += totalMinutes;
    if (minutes >= totalMinutes) minutes -= totalMinutes;
    var hour = Math.floor(minutes / 60);
    var minute = minutes % 60;
    return { hour: hour, minute: minute };
  }
  function timeToAngle(hour, minute, mode) {
    // Returns degrees from 12 o'clock
    var totalHours = mode === '24h' ? 24 : 12;
    var totalMinutes = totalHours * 60;
    var minutes = (hour % totalHours) * 60 + minute;
    return (minutes / totalMinutes) * 360;
  }
  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }
  function createSVGClock(id, mode) {
    var svgNS = 'http://www.w3.org/2000/svg';
    var size = 200;
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.setAttribute('aria-label', 'Analog clock');
    svg.setAttribute('role', 'img');
    svg.setAttribute('tabindex', '0');
    svg.id = id + '-svg';
    // Face
    var face = document.createElementNS(svgNS, 'circle');
    face.setAttribute('cx', 100);
    face.setAttribute('cy', 100);
    face.setAttribute('r', 95);
    face.setAttribute('fill', '#fff');
    face.setAttribute('stroke', '#333');
    face.setAttribute('stroke-width', 3);
    svg.appendChild(face);
    // Ticks
    for (var i = 0; i < (mode === '24h' ? 24 : 12); i++) {
      var angle = (i / (mode === '24h' ? 24 : 12)) * 2 * Math.PI;
      var x1 = 100 + 80 * Math.sin(angle);
      var y1 = 100 - 80 * Math.cos(angle);
      var x2 = 100 + 90 * Math.sin(angle);
      var y2 = 100 - 90 * Math.cos(angle);
      var tick = document.createElementNS(svgNS, 'line');
      tick.setAttribute('x1', x1);
      tick.setAttribute('y1', y1);
      tick.setAttribute('x2', x2);
      tick.setAttribute('y2', y2);
      tick.setAttribute('stroke', '#333');
      tick.setAttribute('stroke-width', 2);
      svg.appendChild(tick);
    }
    // Hands
    var hourHand = document.createElementNS(svgNS, 'line');
    hourHand.setAttribute('x1', 100);
    hourHand.setAttribute('y1', 100);
    hourHand.setAttribute('x2', 100);
    hourHand.setAttribute('y2', 55);
    hourHand.setAttribute('stroke', '#222');
    hourHand.setAttribute('stroke-width', 6);
    hourHand.setAttribute('stroke-linecap', 'round');
    hourHand.setAttribute('id', id + '-hour');
    hourHand.setAttribute('aria-label', 'Hour hand');
    svg.appendChild(hourHand);
    var minuteHand = document.createElementNS(svgNS, 'line');
    minuteHand.setAttribute('x1', 100);
    minuteHand.setAttribute('y1', 100);
    minuteHand.setAttribute('x2', 100);
    minuteHand.setAttribute('y2', 35);
    minuteHand.setAttribute('stroke', '#0078d7');
    minuteHand.setAttribute('stroke-width', 4);
    minuteHand.setAttribute('stroke-linecap', 'round');
    minuteHand.setAttribute('id', id + '-minute');
    minuteHand.setAttribute('aria-label', 'Minute hand');
    svg.appendChild(minuteHand);
    // Center dot
    var dot = document.createElementNS(svgNS, 'circle');
    dot.setAttribute('cx', 100);
    dot.setAttribute('cy', 100);
    dot.setAttribute('r', 6);
    dot.setAttribute('fill', '#222');
    svg.appendChild(dot);
    return svg;
  }
  function createDraggableClock(container, options) {
    // Options: id, targetTime {hour,minute}, toleranceMinutes, snapToMinutes, clockMode, initialTime
    options = options || {};
    var id = options.id || 'draggable-clock-' + Math.floor(Math.random() * 100000);
    var mode = options.clockMode || '12h';
    var snap = options.snapToMinutes || 1;
    var tolerance = options.toleranceMinutes || 1;
    var target = options.targetTime || { hour: 3, minute: 0 };
    var initial = options.initialTime || { hour: 12, minute: 0 };
    var state = { hour: initial.hour, minute: initial.minute };
    var svg = createSVGClock(id, mode);
    var hourHand = svg.querySelector('#' + id + '-hour');
    var minuteHand = svg.querySelector('#' + id + '-minute');
    var isDragging = false, dragHand = null;
    var submitCb = null;
    // Helper: set hands
    function setHands(hour, minute) {
      // Hour hand angle only depends on hour, no minute influence
      var hourAngle = (hour % (mode === '24h' ? 24 : 12)) * (360 / (mode === '24h' ? 24 : 12));
      var minuteAngle = (minute / 60) * 360;
      hourHand.setAttribute('transform', 'rotate(' + hourAngle + ' 100 100)');
      minuteHand.setAttribute('transform', 'rotate(' + minuteAngle + ' 100 100)');
    }
    setHands(state.hour, state.minute);
    // Mouse/touch helpers
    function getAngleFromEvent(e) {
      var rect = svg.getBoundingClientRect();
      var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left - 100;
      var y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top - 100;
      var angle = Math.atan2(x, -y) * 180 / Math.PI;
      return (angle + 360) % 360;
    }
    function onDragStart(hand, e) {
      e.preventDefault();
      isDragging = true;
      dragHand = hand;
      document.addEventListener('mousemove', onDragMove);
      document.addEventListener('mouseup', onDragEnd);
      document.addEventListener('touchmove', onDragMove);
      document.addEventListener('touchend', onDragEnd);
    }
    function onDragMove(e) {
      if (!isDragging) return;
      var angle = getAngleFromEvent(e);
      if (dragHand === 'minute') {
        // Convert angle directly to minutes (0-59)
        var minutes = Math.round(angle / 360 * 60);
        // Snap to nearest snap value
        minutes = Math.round(minutes / snap) * snap;
        // Wrap around 0-59
        minutes = ((minutes % 60) + 60) % 60;
        state.minute = minutes;
      } else if (dragHand === 'hour') {
        // Convert angle directly to hours based on mode
        var totalHours = mode === '24h' ? 24 : 12;
        var hours = Math.round(angle / 360 * totalHours);
        // Wrap around 0 to (totalHours-1)
        hours = ((hours % totalHours) + totalHours) % totalHours;
        state.hour = hours;
      }
      setHands(state.hour, state.minute);
    }
    function onDragEnd(e) {
      isDragging = false;
      dragHand = null;
      document.removeEventListener('mousemove', onDragMove);
      document.removeEventListener('mouseup', onDragEnd);
      document.removeEventListener('touchmove', onDragMove);
      document.removeEventListener('touchend', onDragEnd);
    }
    // Attach events
    minuteHand.addEventListener('mousedown', onDragStart.bind(null, 'minute'));
    hourHand.addEventListener('mousedown', onDragStart.bind(null, 'hour'));
    minuteHand.addEventListener('touchstart', onDragStart.bind(null, 'minute'));
    hourHand.addEventListener('touchstart', onDragStart.bind(null, 'hour'));
    // Keyboard support
    svg.addEventListener('keydown', function (e) {
      var changed = false;
      if (e.key === 'ArrowUp') {
        state.hour = (state.hour + 1) % (mode === '24h' ? 24 : 12);
        changed = true;
      } else if (e.key === 'ArrowDown') {
        state.hour = (state.hour - 1 + (mode === '24h' ? 24 : 12)) % (mode === '24h' ? 24 : 12);
        changed = true;
      } else if (e.key === 'ArrowRight') {
        state.minute = (state.minute + snap) % 60;
        changed = true;
      } else if (e.key === 'ArrowLeft') {
        state.minute = (state.minute - snap + 60) % 60;
        changed = true;
      }
      if (changed) {
        setHands(state.hour, state.minute);
        e.preventDefault();
      }
    });
    // ARIA
    svg.setAttribute('aria-label', 'Analog clock. Use mouse, touch, or arrow keys to set the time.');
    // Insert
    if (typeof container === 'string') container = document.querySelector(container);
    container.appendChild(svg);
    // API
    var api = {
      getState: function () {
        return { hour: state.hour, minute: state.minute };
      },
      setTarget: function (targetTime) {
        target = targetTime;
      },
      onSubmit: function (cb) {
        submitCb = cb;
      },
      enableEditor: function () {
        // Overlay controls for teacher config
        var overlay = document.createElement('div');
        overlay.className = 'dac-editor-overlay';
        overlay.innerHTML = '<label>Target Hour: <input type="number" min="0" max="' + (mode === '24h' ? 23 : 12) + '" value="' + target.hour + '"></label>' +
          '<label>Target Minute: <input type="number" min="0" max="59" value="' + target.minute + '"></label>' +
          '<label>Tolerance (min): <input type="number" min="0" max="59" value="' + tolerance + '"></label>' +
          '<label>Snap to (min): <input type="number" min="1" max="30" value="' + snap + '"></label>' +
          '<button type="button">Apply</button>';
        overlay.style.position = 'absolute';
        overlay.style.left = '0';
        overlay.style.top = '0';
        overlay.style.background = 'rgba(255,255,255,0.95)';
        overlay.style.padding = '10px';
        overlay.style.border = '1px solid #0078d7';
        overlay.style.zIndex = 10;
        container.style.position = 'relative';
        container.appendChild(overlay);
        overlay.querySelector('button').onclick = function () {
          var inputs = overlay.querySelectorAll('input');
          target.hour = clamp(parseInt(inputs[0].value), 0, mode === '24h' ? 23 : 12);
          target.minute = clamp(parseInt(inputs[1].value), 0, 59);
          tolerance = clamp(parseInt(inputs[2].value), 0, 59);
          snap = clamp(parseInt(inputs[3].value), 1, 30);
          overlay.remove();
        };
      },
      // For demo/testing
      _setTime: function (h, m) {
        state.hour = h; state.minute = m; setHands(h, m);
      }
    };
    // Create question display
    var questionDiv = document.createElement('div');
    questionDiv.className = 'dac-question';
    questionDiv.style.textAlign = 'center';
    questionDiv.style.marginBottom = '10px';
    questionDiv.style.fontSize = '16px';
    questionDiv.style.fontWeight = 'bold';
    
    // Create feedback display
    var feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'dac-feedback';
    feedbackDiv.style.textAlign = 'center';
    feedbackDiv.style.marginTop = '10px';
    feedbackDiv.style.fontSize = '16px';
    feedbackDiv.style.color = '#4CAF50';
    
    // Function to update the displays
    function updateDisplays() {
      var targetStr = (target.hour < 10 ? '0' : '') + target.hour + ':' + 
                     (target.minute < 10 ? '0' : '') + target.minute;
      questionDiv.textContent = 'Set the clock to ' + targetStr;
      
      // Check if current time matches target within tolerance
      var currentTotal = state.hour * 60 + state.minute;
      var targetTotal = target.hour * 60 + target.minute;
      var diff = Math.abs(currentTotal - targetTotal);
      if (diff <= tolerance) {
        feedbackDiv.textContent = 'Correct!';
        feedbackDiv.style.opacity = '1';
      } else {
        feedbackDiv.textContent = '';
        feedbackDiv.style.opacity = '0';
      }
    }
    
    // Add displays to container
    container.insertBefore(questionDiv, svg);
    container.appendChild(feedbackDiv);
    
    // Initial update
    updateDisplays();
    
    // Extend the setHands function to update feedback
    var originalSetHands = setHands;
    setHands = function(hour, minute) {
      originalSetHands(hour, minute);
      updateDisplays();
    };
    
    // Submit button (for demo)
    var submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit';
    submitBtn.className = 'dac-submit-btn';
    submitBtn.onclick = function () {
      if (submitCb) submitCb(api.getState());
    };
    container.appendChild(submitBtn);
    
    // Extend the API to allow updating displays
    var originalSetTarget = api.setTarget;
    api.setTarget = function(targetTime) {
      originalSetTarget(targetTime);
      updateDisplays();
    };
    
    return api;
  }
  global.createDraggableClock = createDraggableClock;
})(window);

let canvas;
let slides = [{objects: []}];
let currentSlide = 0;

function initCanvas() {
    canvas = new fabric.Canvas('canvas', {
        width: 1280,
        height: 720,
        backgroundColor: '#ffffff'
    });

    // Enable object controls
    canvas.on('object:moving', function(e) {
        e.target.opacity = 0.5;
    });
    
    canvas.on('object:modified', function(e) {
        e.target.opacity = 1;
        saveCurrentSlide();
    });

    // Listen for selection changes
    canvas.on('selection:created', updateControls);
    canvas.on('selection:updated', updateControls);
    canvas.on('selection:cleared', updateControls);
}

function updateControls(e) {
    const hasSelection = canvas.getActiveObject();
    document.querySelectorAll('.position-btns button').forEach(btn => btn.disabled = !hasSelection);
    document.querySelectorAll('.layer-btns button').forEach(btn => btn.disabled = !hasSelection);
    
    if (hasSelection && hasSelection.type === 'textbox') {
        document.querySelector('.text-btns').style.display = 'flex';
    } else {
        document.querySelector('.text-btns').style.display = 'none';
    }
}

function addText(type) {
    const text = new fabric.Textbox(type === 'headline' ? 'Headline' : 'Body text', {
        left: 50,
        top: 50,
        fontSize: type === 'headline' ? 48 : 24,
        width: 300,
        fontFamily: 'Inter'
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    saveCurrentSlide();
}

function addShape(shape) {
    let fabricObject;
    
    switch(shape) {
        case 'rect':
            fabricObject = new fabric.Rect({
                left: 100,
                top: 100,
                width: 100,
                height: 100,
                fill: '#b7cdb1'
            });
            break;
            
        case 'circle':
            fabricObject = new fabric.Circle({
                left: 100,
                top: 100,
                radius: 50,
                fill: '#b7cdb1'
            });
            break;
            
        case 'triangle':
            fabricObject = new fabric.Triangle({
                left: 100,
                top: 100,
                width: 100,
                height: 100,
                fill: '#b7cdb1'
            });
            break;
    }
    
    if (fabricObject) {
        canvas.add(fabricObject);
        canvas.setActiveObject(fabricObject);
        saveCurrentSlide();
    }
}

function addImage(url) {
    fabric.Image.fromURL(url, function(img) {
        img.scaleToWidth(300);
        canvas.add(img);
        canvas.setActiveObject(img);
        saveCurrentSlide();
    });
}

function saveCurrentSlide() {
    slides[currentSlide].objects = canvas.toJSON().objects;
}

function loadSlide(index) {
    currentSlide = index;
    canvas.clear();
    canvas.loadFromJSON({objects: slides[currentSlide].objects}, canvas.renderAll.bind(canvas));
}

function addNewSlide() {
    slides.push({objects: []});
    currentSlide = slides.length - 1;
    canvas.clear();
    updateSlidesBar();
}

function updateSlidesBar() {
    const slidesBar = document.getElementById('slides-bar');
    slidesBar.innerHTML = '';
    
    slides.forEach((slide, idx) => {
        const thumb = document.createElement('div');
        thumb.className = `slide-thumb ${idx === currentSlide ? 'active' : ''}`;
        thumb.textContent = idx + 1;
        thumb.onclick = () => {
            saveCurrentSlide();
            loadSlide(idx);
            updateSlidesBar();
        };
        slidesBar.appendChild(thumb);
    });
    
    const addBtn = document.createElement('button');
    addBtn.className = 'add-slide-btn';
    addBtn.textContent = '+';
    addBtn.onclick = addNewSlide;
    slidesBar.appendChild(addBtn);
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
    initCanvas();
    updateSlidesBar();
});

// Replace existing JavaScript with new event handlers
        document.querySelector('.add-headline').onclick = () => addText('headline');
        document.querySelector('.add-body').onclick = () => addText('body');
        
        document.querySelectorAll('.shape-btn').forEach(btn => {
            btn.onclick = () => addShape(btn.dataset.shape);
        });
        
        document.querySelector('.upload-img').onclick = function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function(e) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = function(e) {
                    addImage(e.target.result);
                };
                reader.readAsDataURL(file);
            };
            input.click();
        };
        
        document.querySelector('.img-url').onclick = function() {
            const url = prompt('Enter image URL:');
            if (url) addImage(url);
        };
        
        // Position controls
        document.querySelector('.position-btns').onclick = function(e) {
            const btn = e.target.closest('button');
            if (!btn) return;
            
            const obj = canvas.getActiveObject();
            if (!obj) return;
            
            switch(btn.title) {
                case 'Align Left': obj.centerH(); break;
                case 'Align Center': obj.centerV(); break;
                case 'Align Right': obj.setLeft(canvas.width - obj.width * obj.scaleX); break;
                case 'Align Top': obj.setTop(0); break;
                case 'Align Middle': obj.centerV(); break;
                case 'Align Bottom': obj.setTop(canvas.height - obj.height * obj.scaleY); break;
            }
            canvas.renderAll();
            saveCurrentSlide();
        };
        
        // Layer controls
        document.querySelector('.layer-btns').onclick = function(e) {
            const btn = e.target.closest('button');
            if (!btn) return;
            
            const obj = canvas.getActiveObject();
            if (!obj) return;
            
            switch(btn.title) {
                case 'Bring Forward': canvas.bringForward(obj); break;
                case 'Send Backward': canvas.sendBackwards(obj); break;
                case 'Delete': canvas.remove(obj); break;
            }
            saveCurrentSlide();
        };
        
        // Save and Present buttons
        document.getElementById('save-btn').onclick = function() {
            saveCurrentSlide();
            localStorage.setItem('presentation', JSON.stringify(slides));
            alert('Presentation saved!');
        };
        
        document.getElementById('present-btn').onclick = function() {
            // Implement presentation mode
            window.open('present.php', '_blank');
        };
        
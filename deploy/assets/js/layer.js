function updateLayersPanel() {
    const list = document.getElementById('layers-list');
    if (!list) return;
    list.innerHTML = '';
    // Get all objects in reverse order (top-most first)
    const objects = canvas.getObjects().slice().reverse();
    objects.forEach((obj, idx) => {
        const li = document.createElement('li');
        li.style = 'padding:6px 8px;cursor:pointer;display:flex;align-items:center;gap:8px;border-bottom:1px solid #eee;font-size:1em;';
        // Show a simple icon for type
        let icon = '';
        if (obj.type === 'i-text') icon = '🅣';
        else if (obj.type === 'image') icon = obj._element && obj._element.src && obj._element.src.endsWith('.gif') ? '🖼️ (GIF)' : '🖼️';
        else if (obj.type === 'rect') icon = '▭';
        else if (obj.type === 'circle') icon = '◯';
        else if (obj.type === 'polygon') icon = '⬟';
        else if (obj.type === 'triangle') icon = '▲';
        else if (obj.type === 'ellipse') icon = '⬭';
        else if (obj.type === 'line') icon = '／';
        else icon = '🔲';

        li.innerHTML = `<span>${icon}</span> <span style="flex:1;">${obj.type.charAt(0).toUpperCase() + obj.type.slice(1)}</span>`;

        // Highlight if selected
        if (canvas.getActiveObject() === obj) {
            li.style.background = '#e3f0ff';
            li.style.fontWeight = 'bold';
        }

        // Click to select
        li.onclick = () => {
            canvas.setActiveObject(obj);
            canvas.requestRenderAll();
            updateLayersPanel();
        };

        // Add delete button
        const delBtn = document.createElement('button');
        delBtn.textContent = '🗑️';
        delBtn.style = 'margin-left:8px;border:none;background:none;cursor:pointer;font-size:1em;';
        delBtn.onclick = (e) => {
            e.stopPropagation();
            canvas.remove(obj);
            updateLayersPanel();
        };
        li.appendChild(delBtn);

        // Move up/down buttons
        const upBtn = document.createElement('button');
        upBtn.textContent = '↑';
        upBtn.style = 'margin-left:4px;border:none;background:none;cursor:pointer;font-size:1em;';
        upBtn.onclick = (e) => {
            e.stopPropagation();
            canvas.bringForward(obj);
            updateLayersPanel();
        };
        li.appendChild(upBtn);

        const downBtn = document.createElement('button');
        downBtn.textContent = '↓';
        downBtn.style = 'margin-left:2px;border:none;background:none;cursor:pointer;font-size:1em;';
        downBtn.onclick = (e) => {
            e.stopPropagation();
            canvas.sendBackwards(obj);
            updateLayersPanel();
        };
        li.appendChild(downBtn);

        list.appendChild(li);
    });
}

// Update panel on canvas changes
canvas.on('object:added', updateLayersPanel);
canvas.on('object:removed', updateLayersPanel);
canvas.on('object:modified', updateLayersPanel);
canvas.on('selection:created', updateLayersPanel);
canvas.on('selection:updated', updateLayersPanel);
canvas.on('selection:cleared', updateLayersPanel);

// Initial call
updateLayersPanel();
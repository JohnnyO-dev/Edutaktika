
document.getElementById('upload-element-btn').onclick = function() {
    const input = document.getElementById('element-upload');
    const file = input.files[0];
    if (!file) return alert('Choose a file!');
    const reader = new FileReader();
    reader.onload = function(e) {
        // For images, store as dataURL; for JSON, store as is
        let type = file.type.startsWith('image/') ? 'image' : 'json';
        let data = e.target.result;
        if (type === 'json') {
            try { data = JSON.parse(data); } catch { return alert('Invalid JSON'); }
        }
        db.ref('elements').push({
            type,
            data,
            name: file.name,
            uploaded: Date.now()
        }, () => alert('Element uploaded!'));
    };
    reader.readAsDataURL(file);
};

    function showElementsLibrary() {
        const list = document.querySelector('.elements-library-list');
        list.innerHTML = '';
        db.ref('elements').orderByChild('uploaded').limitToLast(3).once('value', snap => {
            snap.forEach(child => {
                const el = child.val();
                const btn = document.createElement('div');
                btn.style = 'width:60px;height:54px;display:flex;align-items:center;justify-content:center;cursor:pointer;';
                if (el.type === 'image') {
                    btn.innerHTML = `<img src="${el.data}" style="max-width:60px;max-height:54px;">`;
                } else if (el.type === 'json') {
                    btn.innerHTML = `<span style="font-size:2rem;">🧩</span>`;
                }
                btn.title = el.name;
                btn.onclick = function() {
                    if (el.type === 'image') {
                        fabric.Image.fromURL(el.data, function(img) {
                            img.set({ left: 100, top: 100, scaleX: 0.5, scaleY: 0.5 });
                            canvas.add(img);
                            canvas.setActiveObject(img);
                            canvas.requestRenderAll();
                        });
                    } else if (el.type === 'json') {
                        fabric.util.enlivenObjects([el.data], function(objects) {
                            if (objects[0]) {
                                objects[0].set({ left: 100, top: 100 });
                                canvas.add(objects[0]);
                                canvas.setActiveObject(objects[0]);
                                canvas.requestRenderAll();
                            }
                        });
                    }
                };
                list.appendChild(btn);
            });
        });
    }
    showElementsLibrary();

    // See All Elements Modal (shows all images from 'elements' node)
    function showAllElementsModal() {
        db.ref('elements').orderByChild('uploaded').once('value', snap => {
            const elements = [];
            snap.forEach(child => {
                const val = child.val();
                // Only include images
                if (val.type === 'image') {
                    elements.push({ key: child.key, ...val });
                }
            });
            elements.reverse(); // Show most recent first
            // Modal HTML
            let modal = document.getElementById('allElementsModal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'allElementsModal';
                modal.style = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.35);z-index:99999;display:flex;align-items:center;justify-content:center;';
                modal.innerHTML = `
                    <div style="background:#fff;padding:32px 28px;border-radius:14px;max-width:600px;width:96vw;max-height:90vh;overflow:auto;box-shadow:0 4px 24px #0002;position:relative;">
                        <h3 style="margin-top:0;margin-bottom:18px;">All Images</h3>
                        <div id="allElementsList" style="display:flex;flex-wrap:wrap;gap:12px;"></div>
                        <button id="closeAllElementsModal" style="position:absolute;top:10px;right:18px;background:#eee;color:#232946;border:none;padding:6px 18px;border-radius:8px;cursor:pointer;">Close</button>
                    </div>
                `;
                document.body.appendChild(modal);
                document.getElementById('closeAllElementsModal').onclick = function() {
                    modal.style.display = 'none';
                };
            }
            // Render images in the modal
            const listDiv = modal.querySelector('#allElementsList');
            listDiv.innerHTML = '';
            elements.forEach(el => {
                const btn = document.createElement('div');
                btn.style = 'width:60px;height:54px;display:flex;align-items:center;justify-content:center;cursor:pointer;';
                btn.innerHTML = `<img src="${el.data}" style="max-width:60px;max-height:54px;">`;
                btn.title = el.name;
                btn.onclick = function() {
                    fabric.Image.fromURL(el.data, function(img) {
                        img.set({ left: 100, top: 100, scaleX: 0.5, scaleY: 0.5 });
                        canvas.add(img);
                        canvas.setActiveObject(img);
                        canvas.requestRenderAll();
                    });
                    modal.style.display = 'none';
                };
                listDiv.appendChild(btn);
            });
            modal.style.display = 'flex';
        });
    }
    document.getElementById('see-all-elements-btn').onclick = showAllElementsModal;
    
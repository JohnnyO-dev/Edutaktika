// Show only 3 most recent elements in sidebar (from 'elements' node)
function showElementsLibrary() {
    const list = document.querySelector('.elements-library-list');
    list.innerHTML = '';
    db.ref('elements').orderByChild('uploaded').limitToLast(3).once('value', snap => {
        // Firebase returns oldest-to-newest, so reverse for most recent first
        const elements = [];
        snap.forEach(child => elements.push({ key: child.key, ...child.val() }));
        elements.reverse();
        elements.forEach(el => {
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

// See All Elements Modal (shows all from 'elements' node)
function showAllElementsModal() {
    db.ref('elements').orderByChild('uploaded').once('value', snap => {
        const elements = [];
        snap.forEach(child => elements.push({ key: child.key, ...child.val() }));
        elements.reverse();
        // Modal HTML
        let modal = document.getElementById('allElementsModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'allElementsModal';
            modal.style = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.35);z-index:99999;display:flex;align-items:center;justify-content:center;';
            modal.innerHTML = `
                <div style="background:#fff;padding:32px 28px;border-radius:14px;max-width:600px;width:96vw;max-height:90vh;overflow:auto;box-shadow:0 4px 24px #0002;position:relative;">
                    <h3 style="margin-top:0;margin-bottom:18px;">All Graphics</h3>
                    <div id="allElementsList" style="display:flex;flex-wrap:wrap;gap:12px;"></div>
                    <button id="closeAllElementsModal" style="position:absolute;top:10px;right:18px;background:#eee;color:#232946;border:none;padding:6px 18px;border-radius:8px;cursor:pointer;">Close</button>
                </div>
            `;
            document.body.appendChild(modal);
            document.getElementById('closeAllElementsModal').onclick = function() {
                modal.style.display = 'none';
            };
        }
        // Fill modal with all elements
        const allList = modal.querySelector('#allElementsList');
        allList.innerHTML = '';
        elements.forEach(el => {
            const btn = document.createElement('div');
            btn.style = 'width:80px;height:74px;border:1px solid #ccc;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;';
            if (el.type === 'image') {
                btn.innerHTML = `<img src="${el.data}" style="max-width:74px;max-height:74px;">`;
            } else if (el.type === 'json') {
                btn.innerHTML = `<span style="font-size:2.2rem;">🧩</span>`;
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
                modal.style.display = 'none';
            };
            allList.appendChild(btn);
        });
        modal.style.display = 'flex';
    });
}
document.getElementById('see-all-elements-btn').onclick = showAllElementsModal;
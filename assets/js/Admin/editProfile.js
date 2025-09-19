// --- Edit Profile Modal Logic for Admin ---

// Open modal and fill with current admin info
document.querySelector('.profile-edit-btn').onclick = async function() {
    const user = firebase.auth().currentUser;
    if (!user) return;
    const snap = await firebase.database().ref('admins/' + user.uid).once('value');
    const data = snap.val() || {};
    document.getElementById('edit_fname').value = data.fname || '';
    document.getElementById('edit_mname').value = data.mname || '';
    document.getElementById('edit_lname').value = data.lname || '';
    document.getElementById('editProfileModal').style.display = 'flex';
};

function closeEditProfileModal() {
    document.getElementById('editProfileModal').style.display = 'none';
}

// Save changes for admin
document.getElementById('editProfileForm').onsubmit = async function(e) {
    e.preventDefault();
    const user = firebase.auth().currentUser;
    if (!user) return;
    const updates = {
        fname: document.getElementById('edit_fname').value,
        mname: document.getElementById('edit_mname').value,
        lname: document.getElementById('edit_lname').value
    };
    await firebase.database().ref('admins/' + user.uid).update(updates);
    closeEditProfileModal();
    // Optionally, refresh profile info on sidebar
    location.reload();
};

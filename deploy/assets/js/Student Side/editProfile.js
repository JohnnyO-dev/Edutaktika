// --- Edit Profile Modal Logic for Student ---

// Wait for DOM to be ready before attaching event
document.addEventListener('DOMContentLoaded', function() {
    const editBtn = document.querySelector('.profile-edit-btn');
    if (editBtn) {
        editBtn.onclick = async function() {
            const user = firebase.auth().currentUser;
            if (!user) return;
            const snap = await firebase.database().ref('students/' + user.uid).once('value');
            const data = snap.val() || {};
            document.getElementById('edit_fname').value = data.fname || '';
            document.getElementById('edit_mname').value = data.mname || '';
            document.getElementById('edit_lname').value = data.lname || '';
            document.getElementById('edit_gradelevel').value = data.gradelevel || '';
            document.getElementById('edit_section').value = data.section || '';

            // Make grade level and section required
            document.getElementById('edit_gradelevel').setAttribute('required', 'required');
            document.getElementById('edit_section').setAttribute('required', 'required');

            document.getElementById('editProfileModal').style.display = 'flex';
        };
    }
});

function closeEditProfileModal() {
    document.getElementById('editProfileModal').style.display = 'none';
}

// Save changes
document.getElementById('editProfileForm').onsubmit = async function(e) {
    e.preventDefault();
    const user = firebase.auth().currentUser;
    if (!user) return;

    // Validate required fields
    const gradelevel = document.getElementById('edit_gradelevel').value.trim();
    const section = document.getElementById('edit_section').value.trim();
    if (!gradelevel || !section) {
        alert('Grade Level and Section are required.');
        return;
    }

    const updates = {
        fname: document.getElementById('edit_fname').value,
        mname: document.getElementById('edit_mname').value,
        lname: document.getElementById('edit_lname').value,
        gradelevel: gradelevel,
        section: section
    };
    await firebase.database().ref('students/' + user.uid).update(updates);
    closeEditProfileModal();
    // Optionally, refresh profile info on sidebar
    location.reload();
};

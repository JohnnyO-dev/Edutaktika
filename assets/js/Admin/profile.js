// Listen for auth state and only allow the single admin (by email)
const ADMIN_EMAIL = "youradmin@email.com"; // <-- Replace with your admin email

// ...existing code...
firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
        const uid = user.uid;
        const snapshot = await db.ref('admins/' + uid).once('value');
        const admin = snapshot.val();
        if (admin && user.emailVerified) {
            // Allow access, do nothing (stay on page)
        } else if (admin && !user.emailVerified) {
            alert('Please verify your email before accessing this page.');
            await firebase.auth().signOut();
            window.location.href = "logreg.html";
        } else {
            // Not an admin, sign out and redirect to login
            await firebase.auth().signOut();
            window.location.href = "logreg.html";
        }
    } else {
        // Not logged in, redirect to login
        window.location.href = "logreg.html";
    }
});
// ...existing code...

// Logout logic

document.addEventListener("DOMContentLoaded", function() {
    const logoutBtn = document.getElementById('logoutSwitch');
    if (logoutBtn) {
        logoutBtn.onclick = function() {
            firebase.auth().signOut().then(function() {
                window.location.href = "logreg.html";
            });
        };
    }
});
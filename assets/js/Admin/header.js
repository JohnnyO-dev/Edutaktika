document.addEventListener("DOMContentLoaded", function() {
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const sidebar = document.getElementById('profileSidebar');
            if (sidebar) sidebar.classList.add('active');
        });
    }

    const closeSidebar = document.getElementById('closeSidebar');
    if (closeSidebar) {
        closeSidebar.addEventListener('click', function() {
            const sidebar = document.getElementById('profileSidebar');
            if (sidebar) sidebar.classList.remove('active');
        });
    }

    window.addEventListener('click', function(e) {
        const sidebar = document.getElementById('profileSidebar');
        if (sidebar && sidebar.classList.contains('active') && !sidebar.contains(e.target) && e.target.id !== 'profileBtn') {
            sidebar.classList.remove('active');
        }
    });

    const logoutSwitch = document.getElementById('logoutSwitch');
    if (logoutSwitch) {
        logoutSwitch.addEventListener('click', function() {
            this.classList.toggle('active');
            const logoutLabel = document.getElementById('logoutLabel');
            if (logoutLabel) logoutLabel.classList.toggle('active');
            setTimeout(function() {
                const logoutForm = document.getElementById('logoutForm');
                if (logoutForm) logoutForm.submit();
            }, 350);
        });
    }
});
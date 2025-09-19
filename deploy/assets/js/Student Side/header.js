document.getElementById('profileBtn').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('profileSidebar').classList.add('active');
    });
    document.getElementById('closeSidebar').addEventListener('click', function() {
        document.getElementById('profileSidebar').classList.remove('active');
    });
    window.addEventListener('click', function(e) {
        var sidebar = document.getElementById('profileSidebar');
        if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && e.target.id !== 'profileBtn') {
            sidebar.classList.remove('active');
        }
    });
    // Logout switch logic
    document.getElementById('logoutSwitch').addEventListener('click', function() {
        this.classList.toggle('active');
        document.getElementById('logoutLabel').classList.toggle('active');
        setTimeout(function() {
            document.getElementById('logoutForm').submit();
        }, 350);
    });
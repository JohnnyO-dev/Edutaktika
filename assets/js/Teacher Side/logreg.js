
    function showTab(tab) {
        document.getElementById('loginTab').classList.remove('active');
        document.getElementById('registerTab').classList.remove('active');
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('registerSection').style.display = 'none';
        if (tab === 'login') {
            document.getElementById('loginTab').classList.add('active');
            document.getElementById('loginSection').style.display = 'block';
        } else {
            document.getElementById('registerTab').classList.add('active');
            document.getElementById('registerSection').style.display = 'block';
        }
    }

    // On page load, show the correct tab based on PHP logic
    document.addEventListener('DOMContentLoaded', function() {
        if (window.showLoginTab === undefined || window.showLoginTab) {
            showTab('login');
        } else {
            showTab('register');
        }
    });

    function togglePassword(fieldId, el) {
        var input = document.getElementById(fieldId);
        var icon = el.querySelector('i');
        if (input.type === "password") {
            input.type = "text";
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = "password";
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }

    // Real-time password match check
    document.getElementById('reg_confirm_password').addEventListener('input', checkPasswordMatch);
    document.getElementById('reg_password').addEventListener('input', checkPasswordMatch);

    function checkPasswordMatch() {
        var pw = document.getElementById('reg_password').value;
        var cpw = document.getElementById('reg_confirm_password').value;
        var msg = document.getElementById('password-match-message');
        if (!cpw) {
            msg.textContent = '';
            return;
        }
        if (pw === cpw) {
            msg.textContent = 'Passwords match!';
            msg.style.color = 'green';
        } else {
            msg.textContent = 'Passwords do not match!';
            msg.style.color = 'red';
        }
    }

    function checkPasswordMatchSubmit() {
        checkPasswordMatch();
        var msg = document.getElementById('password-match-message');
        return msg.textContent === 'Passwords match!';
    }

    
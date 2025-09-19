
    // Example data for demonstration
    // 1. Completion Rate Pie
    new Chart(document.getElementById('completionGraph'), {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'In Progress'],
            datasets: [{
                data: [75, 25],
                backgroundColor: ['#2e8b57', '#ffe082'],
                borderWidth: 2
            }]
        },
        options: {
            cutout: '70%',
            plugins: {
                legend: { display: true, position: 'bottom' }
            }
        }
    });

    // 2. Average Scores per Subject Bar
    new Chart(document.getElementById('subjectGraph'), {
        type: 'bar',
        data: {
            labels: ['Math', 'English', 'Science'],
            datasets: [{
                label: 'Average Score',
                data: [88, 79, 84],
                backgroundColor: ['#2e8b57', '#ff69b4', '#ffe082']
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true, max: 100 }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    // 3. Monthly Activity Line
    new Chart(document.getElementById('monthlyGraph'), {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Activities',
                data: [12, 19, 15, 22, 18, 25],
                fill: false,
                borderColor: '#2e8b57',
                backgroundColor: '#ffe082',
                tension: 0.3
            }]
        },
        options: {
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Scroll effect: fade in and slide up
document.addEventListener('DOMContentLoaded', function() {
    const scrollEls = document.querySelectorAll('.scroll-fade');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.18 });

    scrollEls.forEach(el => observer.observe(el));
});
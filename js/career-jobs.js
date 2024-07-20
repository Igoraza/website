    // Function to fetch jobs from the API
    async function fetchJobs() {
        try {
            const response = await fetch('https://igorazabackend-production.up.railway.app/api/v1/career/jobs/');
            const data = await response.json();
            const msg = document.getElementById("not-found-message");
            if (data.length === 0) {
                msg.classList.remove("mil-hide");
            } else {
                msg.classList.add("mil-hide");
            }
            return data;
        } catch (error) {
            console.error('Error fetching jobs:', error);
            return [];
        }
    }

    // Function to create HTML for a single job
    function createJobHTML(job) {
        return `
            <div class="mil-accordion-group mil-up">
                <div class="mil-accordion-menu">
                    <p id="career-title" class="mil-accordion-head">${job.title}</p>
                </div>
                <p id="career-description" class="mil-mb-30">${job.description}</p>
                <p class="mil"><strong>Location:</strong> ${job.location}</p>
                <p class="mil"><strong>Type:</strong> ${job.type}</p>
                <p class="mil-mb-30"><strong>Expiry:</strong> ${job.expiry}</p>
                <div class="mil-up mil-mb-30">
                    <a target="_blank" rel="noopener noreferrer" href="apply.html?id=${job.id}" class="mil-link mil-dark mil-arrow-place">
                        <span>Apply Now</span>
                    </a>
                </div>
            </div>
        `;
    }

    // Function to render all jobs
    function renderJobs(jobs) {
        const jobsContainer = document.getElementById('jobs-container');
        jobsContainer.innerHTML = jobs.map(createJobHTML).join('');
    }

    // Function to initialize the career page
    async function initCareerPage() {
        const jobs = await fetchJobs();
        renderJobs(jobs);
    }

    // Initialize the career page when the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', initCareerPage);
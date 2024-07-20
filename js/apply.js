


function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const jobId = getQueryParam('id');
console.log('Job ID:', jobId);

// Function to show the modal
function showModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = "block";
}

// Function to hide the modal
function hideModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = "none";
}

// Event listeners for closing the modal
document.querySelector('.mil-modal-close').addEventListener('click', hideModal);
document.getElementById('modalCloseBtn').addEventListener('click', hideModal);
window.addEventListener('click', function (event) {
    const modal = document.getElementById('successModal');
    if (event.target == modal) {
        hideModal();
    }
});

document.getElementById('career-form').addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("Func work")

    const form = event.target;
    const formData = new FormData(form);

    const data = {
        name: formData.get('name') || '',
        email: formData.get('email') || '',
        phone: formData.get('phone') || '',
        linkedIn: formData.get('linkedin') || '',
        tweeter: formData.get('twitter') || '',
        instagram: formData.get('instagram') || '',
        why_applying: formData.get('why-applying') || '',
        job: jobId || '',
    };

    const postData = new FormData();

    Object.keys(data).forEach(key => {
        postData.append(key, data[key]);
    });

    const resumeFile = formData.get('resume');
    if (resumeFile) {
        postData.append('resume', resumeFile, resumeFile.name);
    }

    fetch('https://igorazabackend-production.up.railway.app/api/v1/career/register/', {
        method: 'POST',
        body: postData,
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw err; });
            }
            return response.json();
        })
        .then(result => {
            console.log('Success:', result);
            showModal(); // Show the success modal
            form.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            let errorMessage = 'There was an error submitting your application. Please check all fields and try again.';
            if (typeof error === 'object' && error !== null) {
                errorMessage += '\n\nDetails:\n' + Object.entries(error).map(([key, value]) => `${key}: ${value}`).join('\n');
            }
            alert(errorMessage); // Keep the alert for errors
        });
});
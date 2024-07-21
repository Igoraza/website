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

    let isValid = true;

    const form = event.target;
    const formData = new FormData(form);

    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const linkedin = formData.get('linkedin');
    const twitter = formData.get('twitter');
    const instagram = formData.get('instagram');
    const whyApplying = formData.get('why-applying');
    const resume = formData.get('resume');

    // Clear previous error messages
    document.getElementById('name-error').innerText = '';
    document.getElementById('email-error').innerText = '';
    document.getElementById('phone-error').innerText = '';
    document.getElementById('linkedin-error').innerText = '';
    document.getElementById('twitter-error').innerText = '';
    document.getElementById('instagram-error').innerText = '';
    document.getElementById('why-applying-error').innerText = '';
    document.getElementById('resume-error').innerText = '';

    // Validate inputs
    if (!name) {
        document.getElementById('name-error').innerText = 'Name is required';
        isValid = false;
    }
    if (!email) {
        document.getElementById('email-error').innerText = 'Email is required';
        isValid = false;
    }
    if (!phone) {
        document.getElementById('phone-error').innerText = 'Phone is required';
        isValid = false;
    }
    if (!linkedin) {
        document.getElementById('linkedin-error').innerText = 'LinkedIn is required';
        isValid = false;
    }
    if (!twitter) {
        document.getElementById('twitter-error').innerText = 'Twitter is required';
        isValid = false;
    }
    if (!instagram) {
        document.getElementById('instagram-error').innerText = 'Instagram is required';
        isValid = false;
    }
    if (!whyApplying) {
        document.getElementById('why-applying-error').innerText = 'This field is required';
        isValid = false;
    }
    if (!resume) {
        document.getElementById('resume-error').innerText = 'Resume is required';
        isValid = false;
    } else if (resume.type !== 'application/pdf') {
        document.getElementById('resume-error').innerText = 'Only PDF files are allowed';
        isValid = false;
    } else if (resume.size > 7 * 1024 * 1024) {
        document.getElementById('resume-error').innerText = 'File size must be under 7MB';
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    let btnLabel = document.getElementById("form-btn-label");
    btnLabel.innerHTML = "Submitting....";
    document.getElementById("form-btn").disabled = true;

    const data = {
        name: name,
        email: email,
        phone: phone,
        linkedIn: linkedin,
        twitter: twitter,
        instagram: instagram,
        why_applying: whyApplying,
        job: jobId || '',
    };

    const postData = new FormData();

    Object.keys(data).forEach(key => {
        postData.append(key, data[key]);
    });

    if (resume) {
        postData.append('resume', resume, resume.name);
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
            showModal();
            form.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            let errorMessage = 'There was an error submitting your application. Please check all fields and try again.';
            if (typeof error === 'object' && error !== null) {
                errorMessage += '\n\nDetails:\n' + Object.entries(error).map(([key, value]) => `${key}: ${value}`).join('\n');
            }
            alert(errorMessage);
        })
        .finally(() => {
            btnLabel.innerHTML = "Apply Now";
            document.getElementById("form-btn").disabled = false;
        });
});
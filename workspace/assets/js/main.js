


// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
    e.preventDefault();

    // Get values
    var firstName = getInputVal('firstName');
    var lastName = getInputVal('lastName');
    var countryname = getInputVal('countryname');
    var City = getInputVal('City');
    var emailAddress = getInputVal('emailAddress');
    var phoneNumber = getInputVal('phoneNumber');
    var message = getInputVal('message');

    // Save message
    saveMessage(firstName, lastName, countryname, City, emailAddress, phoneNumber, message);

    // Show alert
    document.querySelector('.alert').style.display = 'block';

    // Hide alert after 3 seconds
    setTimeout(function () {
        document.querySelector('.alert').style.display = 'none';
    }, 3000);

    // Clear form
    // document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(firstName, lastName, countryname, City, emailAddress, phoneNumber, message) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        firstName: firstName,
        lastName: lastName,
        countryname: countryname,
        City: City,
        emailAddress: emailAddress,
        phoneNumber: phoneNumber,
        message: message
    });
}
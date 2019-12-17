


// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
    e.preventDefault();
 
    // Get values
    var f = getInputVal('f');
    var l = getInputVal('l');
    var cy = getInputVal('cy');
    var City = getInputVal('City');
    var e = getInputVal('e');
    var m = getInputVal('m');
    var message = getInputVal('message');

    // Save message
    saveMessage(f, l, cy, City, e, m, message);

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
function saveMessage(f, l, cy, City, e, m, message) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        f: f,
        l: l,
        cy: cy,
        City: City,
        e: e,
        m: m,
        message: message
    });
}
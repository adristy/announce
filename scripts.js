document.addEventListener('DOMContentLoaded', () => {
    let database = [];

    // Fetch data from JSON file
    fetch('staffprsfix.json')
        .then(response => response.json())
        .then(data => {
            database = data;
        })
        .catch(error => console.error('Error fetching the JSON data:', error));

    const announcementForm = document.getElementById('announcementForm');
    const textInShape = document.querySelector('.textinshape');
    const resultDiv = document.getElementById('result');

    announcementForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nrpInput = document.getElementById('nrp').value.trim();

        // Check if input is a number and has 10 digits
        if (!/^\d{10}$/.test(nrpInput)) {
            resultDiv.innerHTML = '<p class="error" style="font-size: 10px;">NRP must be a 10-digit number.</p>';
            return;
        }

        // Check if NRP exists in the database
        const student = database.find(student => student.NRP.toString() === nrpInput);

        // Hide the form after submission
        announcementForm.style.display = 'none';
        textInShape.style.display = 'none'; // Menghilangkan textinshape

        if (student) {
            resultDiv.innerHTML = `
                <h3>Hello, ${student.Nama}! Welcome to our team!</h3>
                <p> We are glad to let you know that <strong class="approve"> you are accepted as PRS 2024’s Crew! </strong> </p>
                <p> Congratulations to you! You did well in showing your potential! 
                <br> <br>Oh- we will reach you out in no time regarding your verification, 
                so please check your email regularly – both inbox and spam.

                <br> <br> See you soon!
                 </p>
            `;
            resultDiv.style.color = '';
        } else {
            resultDiv.innerHTML = `
                <h3> We are sorry to say that <strong style="color: red;"> you are unfortunately not eligible for the position.</strong></h3>
                <p>But don't be afraid, you still have many opportunities to show your potential out there! 
                There are several events that are waiting for you. Keep your head up! You still have a long 
                way to go and may we meet in different circumstances.</p>
                
                <p>See you at another time!</p>
            `;
            resultDiv.style.color = '';
        }
    });
});

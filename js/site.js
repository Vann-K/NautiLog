var events = [{
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 240000,
    date: "06/01/2017",
},
{
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 250000,
    date: "06/01/2018",
},
{
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 257000,
    date: "06/01/2019",
},
{
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 130000,
    date: "06/01/2017",
},
{
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 140000,
    date: "06/01/2018",
},
{
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 150000,
    date: "06/01/2019",
},
{
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 40000,
    date: "06/01/2017",
},
{
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 45000,
    date: "06/01/2018",
},
{
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 50000,
    date: "06/01/2019",
},
];

function buildDropDown() {
    // Get the drop down menu from page
    let dropDownMenu = document.getElementById('eventDropDown');
    // Empty innerHTML to ensure it is clean
    dropDownMenu.innerHTML = '';
    // Get our events
    let currentEvents = events;

    // Filter Cities - get array of city names

    // Pull out city names
    let eventCities = currentEvents.map((event) => event.city);
    //  filter the cities to only DISTINCT city names
    let distinctCities = [...new Set(eventCities)]; //... spread operator that makes an array. Set(an object, with a constructor (a function or method that creates and object) takes in array and gives back only distinct values

    // Get template from page
    const template = document.getElementById('dropDownItemTemplate');

    // Copy Template

    let dropDownTemplateNode = document.importNode(template.content, true);   // Import node is how we grab our template from the page. .content gets us what's inside the template. True is deep copy includes child elements of that template. false is shallow copy would not get the child elements.

    // Get <a> tag 
    let menuItem = dropDownTemplateNode.querySelector('a'); // Takes a css selector and gives back the first thing that matches the css selector
    // Change the text
    menuItem.textContent = 'All Cities';
    menuItem.setAttribute("data-string", "All"); //<a class="dropdDownItem" data-string="All"

    // Add item to the page
    dropDownMenu.appendChild(menuItem); //Append puts it at the end. Puts menuItem on the drop down menu.

    for (let index = 0; index < distinctCities.length; index++) {
        let cityMenuItem = document.importNode(template.content, true);

        let cityButton = cityMenuItem.querySelector('a');

        cityButton.textContent = distinctCities[index];
        cityButton.setAttribute("data-string", distinctCities[index]);

        dropDownMenu.appendChild(cityMenuItem);

    }

    displayStats(currentEvents);
    displayEventData(currentEvents);




}

function displayStats(eventsArray) {
    let totalAttendance = calcTotal(eventsArray);
    let averageAttendance = calcAverage(eventsArray);
    let mostAttended = calcMostAttended(eventsArray);
    let leastAttended = calcLeastAttended(eventsArray);

    // Do some math

    document.getElementById('total').textContent = totalAttendance.toLocaleString();
    document.getElementById('average').textContent = averageAttendance.toLocaleString(
        "en-US", {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
    });
    document.getElementById('most').textContent = mostAttended.toLocaleString();
    document.getElementById('least').textContent = leastAttended.toLocaleString();
}

function calcTotal(eventsArray) {

    let sum = 0;

    for (i = 0; i < eventsArray.length; i++) {
        let currentEvent = eventsArray[i];
        sum += currentEvent.attendance;
    }

    return sum;
}

function calcAverage(eventsArray) {
    let total = calcTotal(eventsArray);
    let average = total / eventsArray.length;
    return average;

}

function calcMostAttended(eventsArray) {
    let max = eventsArray[0].attendance;

    for (i = 0; i < eventsArray.length; i++) {
        let currentEvent = eventsArray[i];

        if (currentEvent.attendance > max) {
            max = currentEvent.attendance;
        }
    }

    return max;
}

function calcLeastAttended(eventsArray) {
    let minimum = eventsArray[0].attendance;

    for (i = 0; i < eventsArray.length[i]; i++) {
        let currentEvent = eventsArray[i];

        if (currentEvent.attendance < min) {
            minimum = currentEvent['attendance'];
        }
    }

    return minimum;
}


function calcStats(eventsArray) {
    let minimum = eventsArray[0].attendance;
    let max = eventsArray[0].attendance;
    let sum = 0
    let average = 0;

    for (let i = 0; index < eventsArray.length; i++) {
        let currentEvent = eventsArray[i];

        sum += currentEvent.attendance

        if (currentEvent.attendance > max) {
            max = currentEvent.attendance;
        }

        if (currentEvent.attendance < min) {
            min = currentEvent['attendance'];
        }

    }
    average = sum / eventsArray.length

    let stats = {
        total: sum,
        averageAttendance: average,
        minimumAttendance: minimum,
        maximumAttendance: max
    }

    return stats
}



function displayEventData(eventsArray) {
    let tableBody = document.getElementById('tableBody');
    const tableRowTemplate = document.getElementById('eventTableRowTemplate');

    tableBody.innerHTML = '';



    for (i = 0; i < eventsArray.length; i++) {
        let eventRow = document.importNode(tableRowTemplate.content, true);
        let currentEvent = eventsArray[i];

        let tableCells = eventRow.querySelectorAll("td");

        tableCells[0].textContent = currentEvent.event;
        tableCells[1].textContent = currentEvent.city;
        tableCells[2].textContent = currentEvent.state;
        tableCells[3].textContent = currentEvent.attendance;
        tableCells[4].textContent = currentEvent.date;

        tableBody.appendChild(eventRow);

    }


}
//VARIABLES
//On page load display current day and date
var today = dayjs().format("dddd, MMMM D, YYYY");
$("#currentDay").text(today);

var time = dayjs().format("h:m");
console.log(time);
console.log(dayjs().hour());

//Time slot
var apptBlocks = [
  {
    hour: "9am",
    apptText: "Walk the dog",
    timeMarker: 9,
  },
  {
    hour: "10am",
    apptText: "",
    timeMarker: 10,
  },
  {
    hour: "11am",
    apptText: "Make lunch",
    timeMarker: 11,
  },
  {
    hour: "12pm",
    apptText: "",
    timeMarker: 12,
  },
  {
    hour: "1pm",
    apptText: "",
    timeMarker: 13,
  },
  {
    hour: "2pm",
    apptText: "",
    timeMarker: 14,
  },
  {
    hour: "3pm",
    apptText: "",
    timeMarker: 15,
  },
  {
    hour: "4pm",
    apptText: "",
    timeMarker: 16,
  },
  {
    hour: "5pm",
    apptText: "",
    timeMarker: 17,
  },
];

//ELEMENTS
var button = $("button");

//TODO: JSON KEY = appointments
//LS-GET Checks local storage for previous scores
var storedAppts = JSON.parse(localStorage.getItem("keyAppts"));
console.log(storedAppts);

//LS-SET
saveAppointments();
function saveAppointments() {
  localStorage.setItem("keyAppts", JSON.stringify(apptBlocks));
}

//PAGE RENDER/-ok////////////////////////////////////////////////

for (var i = 0; i < apptBlocks.length; i++) {
  //Creates row div for every array object, set "data-hour"
  var sectionDiv = $("<section>");
  sectionDiv.addClass("row row-jg time-block");
  sectionDiv.attr("data-hour", i);
  //console.log("data-hour");
  $(".container").append(sectionDiv);

  //Create row grid spaces
  for (var b = 0; b < 3; b++) {
    if (b === 0) {
      //Hour block
      var hrBlock = $("<div>");
      hrBlock.text(apptBlocks[i].hour);
      // hrBlock.attr(apptBlocks[i].timeMarker);
      $(sectionDiv).append(hrBlock);
      hrBlock.addClass("col-2 col-lg-1 hour");
    } else if (b === 1) {
      //Text block
      var textBlock = $("<textarea>");
      textBlock.text(apptBlocks[i].apptText);
      textBlock.addClass("col-8 col-lg-10");

      //Create Button
      var saveBtn = $("<button>");
      saveBtn.addClass(
        "col-2 col-lg-1 btn btn-block saveBtn d-flex justify-content-center align-items-center"
      );
      saveBtn.attr("data-hour", i);
      saveBtn.append("<img class='img-fluid' src='assets/save-icon.png'>");
      //Append elements to sectionDiv
      $(sectionDiv).append(hrBlock, textBlock, saveBtn);
    }
  }
}
////////////////

//BUTTON tied to data-hour - ok
$(".container").on("click", function (event) {
  //event.preventDefault();
  var target = $(event.target);
  targetData = target.attr("data-hour");
  // event.stopPropagation();
  console.log(targetData);
});

////////////////

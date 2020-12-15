//VARIABLES

// On page load display current day and date
var now = dayjs();
console.log(now);

var today = dayjs().format("dddd, MMMM D, YYYY"); //Date to load in header

var currentTime = dayjs().hour(); //Shows hour
console.log(typeof currentTime);

var hour = dayjs().format("HH");
console.log(typeof hour);

//Time slot
var apptBlocks = [
  {
    timeMarker: 9,
    hour: "9am",
    apptText: "",
  },
  {
    timeMarker: 10,
    hour: "10am",
    apptText: "",
  },
  {
    timeMarker: 11,
    hour: "11am",
    apptText: "",
  },
  {
    timeMarker: 12,
    hour: "12pm",
    apptText: "",
  },
  {
    timeMarker: 13,
    hour: "1pm",
    apptText: "",
  },
  {
    timeMarker: 14,
    hour: "2pm",
    apptText: "",
  },
  {
    timeMarker: 15,
    hour: "3pm",
    apptText: "",
  },
  {
    timeMarker: 16,
    hour: "4pm",
    apptText: "",
  },
  {
    timeMarker: 17,
    hour: "5pm",
    apptText: "",
  },
];

//TODO: Try to redo code using hours array vs. apptBlocks
// var hour = "9 10 11 12 1 2 3 4 5".split(" ");
// console.log(hour);

//RENDER current day on page load
$("#currentDay").text(today);

//Add clear button to clear old appts
// $(clearBtn).on("click", function () {
//   localStorage.clear();
//   $(textarea).text("");
// });
// function clearTodaysApptBtn {
//   var clearBtn = $("<button>");
//   clearBtn.addClass("btn btn-jg btn-secondary");
//   clearBtn.text("Clear Schedule");
//   $(".jumbotron").append(clearBtn);
// }

//GET appts from LS
init();

//RENDER Scheduler on page load
//TODO: ISSUE - when in a function page doubles on click

for (var i = 0; i < apptBlocks.length; i++) {
  //Creates row div for every array object, set "data-hour"
  var sectionDiv = $("<section>");
  sectionDiv.addClass("row row-jg time-block");
  sectionDiv.attr("data-hour", apptBlocks[i].timeMarker);
  //console.log("data-hour");
  $(".container").append(sectionDiv);

  //Create column/grid for row
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
      textBlock.attr("data-hour", apptBlocks[i].timeMarker);
      textBlock.attr("data-hour2", hour);
      textBlock.addClass("col-8 col-lg-10");

      //Create Button
      var saveBtn = $("<button>");
      saveBtn.addClass(
        "col-2 col-lg-1 btn btn-block saveBtn d-flex justify-content-center align-items-center fas fa-save"
      );
      saveBtn.attr("data-hour", apptBlocks[i].timeMarker);
      saveBtn.val(i);
      //Append elements to sectionDiv
      $(sectionDiv).append(hrBlock, textBlock, saveBtn);
    }
  }

  //EXTRA BUTTON TO CLEAR SCHEDULE

  ///////////////COLORIZE TIME BLOCKS//////////////////
  //Colorize past, present, future

  var dataHr = $(sectionDiv).attr("data-hour");

  if (parseInt(dataHr) === parseInt(currentTime)) {
    textBlock.addClass("present");
  } else if (parseInt(dataHr) < parseInt(currentTime)) {
    textBlock.addClass("past");
  } else {
    textBlock.addClass("future");
  }
}

///////////////LOCAL STORAGE FUNCTIONS////////////////
//GET apps from LS
function init() {
  storedAppts = JSON.parse(localStorage.getItem("apptBlocks"));
  if (storedAppts !== null) {
    apptBlocks = storedAppts;
  }
  //RENDER Scheduler
  //renderScheduler();
}

//TO STORE
function storeAppts() {
  localStorage.setItem("apptBlocks", JSON.stringify(apptBlocks));
}

//BUTTON tied to data-hour - ok
$(".container").on("click", ".saveBtn", function (event) {
  event.preventDefault();
  //Target clicked button in order to target the sibling (textarea) value
  target = $(event.target);
  console.log(target);

  //Grab appt input based on relation to target button
  var appt = target.prev().val(); //this is textarea value
  console.log(appt);
  //target clicked button assigned value to target array index item to update
  var targetVal = $(event.target).val();
  console.log(targetVal);

  //Change targeted key value in array
  apptBlocks[targetVal].apptText = appt;

  //Store in local storage
  storeAppts();

  var targetDataHr = target.attr("data-hour");
  console.log(typeof targetDataHr);
  console.log(typeof hour);
});
///////////////

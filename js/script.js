var task = document.getElementById("task");
var type = document.getElementById("type");
var hours = document.getElementById("hours");
var lastDate = document.getElementById("lastDate");

var toDo = [];

var data = localStorage.getItem("todo");
toDo = JSON.parse(data);

if(toDo == null)
{
    toDo = [];
}

function addTask()
{
    var obj = {
        name : task.value,
        type : type.value,
        hours : hours.value,
        lastDate : lastDate.value,
    }
    console.log(obj);
    toDo.push(obj); 
    localStorage.setItem("todo", JSON.stringify(toDo));

    task.value = '';
    type.value = '';
    hours.value = '';
    lastDate.value = '';

    // document.getElementById("personal").setAttribute("selected" , "selected");
    var taskType = document.getElementById("type");
    taskType.options[0].selected = true;

    viewtoDO();
}

function viewtoDO()
{
    var resultsHtml = '';
    toDo.map((v, i)=>{
        if(v.type == "Personal")
        {
            resultsHtml += `<div class="task d-flex" style="background-color:green">`;
        }
        else if(v.type == "Family")
        {
            resultsHtml += `<div class="task d-flex" style="background-color:#ffc100">`;
        }
        else if(v.type == "Office")
        {
            resultsHtml += `<div class="task d-flex" style="background-color:red">`;
        }
        else if(v.type == "Other")
        {
            resultsHtml += `<div class="task d-flex" style="background-color:gray">`;
        }
        else
        {
            resultsHtml += `<div class="task d-flex">`;
        }
        resultsHtml+= `<div class="tname">${v.name}</div>`;
        resultsHtml += `<div class="tduration">${v.hours} hours</div>`;
        resultsHtml += `<div class="tdate">${v.lastDate}</div>`;
        resultsHtml += `<div class="tdone"><label class="container"><input type="checkbox"><span class="checkmark"></span></label></div>`;
        resultsHtml += `<div class="tremove"><a href="javascript:deleteTask(${i})"><i class="ri-delete-bin-6-fill"></i></a></div>`;
        resultsHtml += `</div>`;
    })
    document.getElementById("results").innerHTML = resultsHtml;
};
viewtoDO();

function deleteTask(index)
{
    toDo.splice(index, 1);
    localStorage.setItem("todo", JSON.stringify(toDo));
    viewtoDO();
}
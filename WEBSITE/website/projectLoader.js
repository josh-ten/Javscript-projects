$(() => { 
    $.getJSON('projectRef.json', (data) => { dataLoaded(data); });
});

function dataLoaded(data) {
    var projID = getUrlParam("id");
    var project = findProjectWithId(projID, data);
    if (project) {
        var projectCont = document.getElementById("projectScripts");
        // console.log(project.url);
        // $("#project").load("./projects/" + project.url);
        for (var i = 0; i < project.files.length; i++) {
            var script = document.createElement("script");
            script.setAttribute("src", "../projects/" + project.url + '/' + project.files[i]);
            projectCont.appendChild(script);
        }
    }
}

function getUrlParam(param) {
    var pageURL = window.location.search.substring(1);
    var URLVarables = pageURL.split("&");
    for (var i = 0; i < URLVarables.length; i++) {
        var paramName = URLVarables[i].split("=");
        if (paramName[0] == param) return paramName[1];
    }
}

function findProjectWithId(id, data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) return data[i];
    }
}
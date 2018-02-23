$.getJSON('projectRef.json', (data)=>{ loadBoxes(data); });

function loadBoxes(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].url != "" && !data[i].exclude)
            generateBox(data[i].title, 
                        data[i].id, 
                        data[i].url,
                        'projects/' + data[i].imageUrl, 
                        data[i].description);
    }
}

function generateBox(name, id, url, imageUrl, strDescription) {
    var container = document.getElementById("grid");
    //Item
    var item = document.createElement("div");    
    item.setAttribute("class", "item");
        //a href
        var link = document.createElement("a");
        link.setAttribute("href", "projectContainer.html?id=" + id);       

            //imageContainer
            var imageContainer = document.createElement("div");
            imageContainer.setAttribute("class", "imageContainer");

                //image
                var image = document.createElement("div");
                image.setAttribute("class", "image");

                    //img
                    var img = document.createElement("img");
                    img.setAttribute("src", "../" + imageUrl);
                    img.classList.add("freezeframe");
                    img.classList.add("freezeframe-responsive");

                //overlay
                var overlay = document.createElement("div");
                overlay.setAttribute("class", "overlay");
                overlay.innerHTML = name;

        //description
        var description = document.createElement("div");
        description.setAttribute("class", "description");
        description.innerHTML = strDescription;

    image.appendChild(img);
    imageContainer.appendChild(image);
    imageContainer.appendChild(overlay);
    link.appendChild(imageContainer);
    item.appendChild(link);
    item.appendChild(description);

    container.appendChild(item);
}
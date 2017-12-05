jQuery.getJSON('projectRef.json', (data)=>{ loadBoxes(data); });

function loadBoxes(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].url != "")
            generateBox(data[i].title, 
                        data[i].url, 
                        data[i].imageUrl, 
                        data[i].description);
    }
}

function generateBox(name, url, imageUrl, strDescription) {
    var container = document.getElementById("grid");
    //Item
    var item = document.createElement("div");    
    item.setAttribute("class", "item");
        //a href
        var link = document.createElement("a");
        link.setAttribute("href", url);

            //imageContainer
            var imageContainer = document.createElement("div");
            imageContainer.setAttribute("class", "imageContainer");

                //image
                var image = document.createElement("div");
                image.setAttribute("class", "image");

                    //img
                    var img = document.createElement("img");
                    img.setAttribute("src", imageUrl);

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
/*
<div class="item">
    <a href="Fear-JoshTen-LudumDare40/index.html">
    <div class="imageContainer">
        <div class="image">
            <img src="Fear-JoshTen-LudumDare40/demo.png">
        </div>
        <div class="dark"></div>
    </div></a>
    <div class="description">
    (Ludum Dare Entry) Fear: Avoid your fears but they'll still get worse.
    </div>
</div>
*/
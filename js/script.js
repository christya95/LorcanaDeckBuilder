// Author: Josua Christyanton
// Date: June 20th 2020
// Description: Website functionality for roster selection. Pick and choose character name and picture to show up in "My Roster"

//Global variables used to create a ListArray for chosen characters in roster
var arrayListImage = [];
var arrayListName = [];
var index = 0;

//Updates "My Roster" with chosen characters from user. Retrieves the image source and name of each character from HTML li.
function reply_click(clicked_id){

    var player = "player" + (index + 1);
    var imageSource = document.getElementById(clicked_id).children[0].src;
    console.log(imageSource);
    var name = document.getElementById(clicked_id).title;
    console.log(name);
    var star = document.getElementById(clicked_id).children[0].className;
    console.log(star);

    //Add to ArrayList
    arrayListImage.push(imageSource);
    arrayListName.push(name);

    //Rewrite HTML to include name and picture
    document.getElementById(player).innerHTML = `
    <figure class=${star}>
                        <img src=${arrayListImage[index]} class="art">
                    </figure>
                    <div class="info unknown">
                        <span class="name">${arrayListName[index]}</span>
                    </div>
    `;

    index++;

    //Maybe the number of ArrayList indicies need to be limited?
    // if (index == 13) {
    //     index--;
    //     alert("Index is " + index)
    // }
    // alert("ArrayList length is: " + arrayListName.length)
}
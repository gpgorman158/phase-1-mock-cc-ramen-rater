// ramen images in the div with the id of ramen-menu
//display the image for each of the ramen using an img tag inside the #ramen-menu div.
//Click on an image from the #ramen-menu div and see all the info about that ramen displayed inside the #ramen-detail div 
//and where it says insert comment here and insert rating here.
//Create a new ramen after submitting the new-ramen form. The new ramen should be added to the#ramen-menu div. 
//The new ramen does not need to persist; 
//in other words, if you refresh the page, it's okay that the new ramen is no longer on the page.

let ramenTopList = document.getElementById('ramen-menu');
let comment;
let rating;
let ramenArray;
let currentId;
let deleteButton;

fetch('http://localhost:3000/ramens')
.then((response) => response.json())
.then((json) => {
    ramenArray = json;
    setTopRamen(json)
})


function setTopRamen (){ 
    //console.log(ramenTopList); //works
    ramenArray.forEach(ramen => {
        let ramenImg = document.createElement('img');
        deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        ramenImg.addEventListener('click', (e)=> {
            //console.log(e); //works
            rating = document.getElementById('rating-display');
            rating.textContent = ramen.rating;
            comment = document.getElementById('comment-display');
            comment.textContent = ramen.comment;
            currentId = ramen.id;
            let clickRamenImg = document.getElementById('detail-image-ramen');
            console.log(clickRamenImg);
            clickRamenImg.src = ramen.image;
            let ramenName = document.querySelector('h2.name');
            ramenName.textContent = ramen.name;
            let ramenRestaurant = document.querySelector('h3.restaurant');
            ramenRestaurant.textContent = ramen.restaurant;
        })
        ramenImg.src = ramen.image;
        ramenTopList.append(deleteButton, ramenImg);

    }) 
}

function ramenForm (){
    let ramenForm = document.querySelector('#new-ramen');
    //console.log(ramenForm); //works
    ramenForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        //console.log(e); //works
        let submitRamen = e.target['new-name'].value;
        let submitRestaurant = e.target['new-restaurant'].value;
        let submitImage = e.target['new-image'].value;
        let submitRating = e.target['new-rating'].value;
        let submitComment = e.target['new-comment'].value;
        let submitImageContainer = document.createElement('img');
        submitImageContainer.src = submitImage;
        ramenTopList.append(submitImageContainer, deleteButton);

        ramenForm.reset();
    })
}
ramenForm();

function updateRamen (){
    let ramenUpdate = document.querySelector('#edit-ramen');
    console.log(ramenUpdate);
    ramenUpdate.addEventListener('submit', (e)=> {
        e.preventDefault();
        let newRating = e.target['new-rating2'].value;
        let newComment = e.target['new-comment2'].value;
        //set the inputted form info into the currently selected ramen
        rating.textContent = newRating;
        comment.textContent = newComment;

        ramenUpdate.reset();
});
};
updateRamen();

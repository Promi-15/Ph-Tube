 const cardContainer = document.getElementById("card-container")
 const divButton = document.getElementById("buttonContainer")
 let selectedCategory = 1000;



const categories = () => {
  
    fetch ('https://openapi.programming-hero.com/api/videos/categories')
    .then(res => res.json())
    .then(({data}) => {
        console.log(data);
        data.forEach(i => {
            const newBtn = document.createElement('button')
            newBtn.className = 'btn btn-active'
            newBtn.innerText = i.category
            newBtn.addEventListener('click',()=> fetchDataByCategory(i.category_id) )
           divButton.appendChild(newBtn)
        })

    })
}
const fetchDataByCategory = (categoryId) => {
    selectedCategory = categoryId
    fetch (`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    .then(res => res.json())
    .then(({data}) => {
        //console.log(data);
        cardContainer.innerHTML = ' '
        data.forEach(video => {
         console.log(video);
            const newCard = document.createElement('div')
            newCard.innerHTML = `
           <div class="card bg-base-100 shadow-xl">
            <figure><img class="h-48 w-full" src="${video.thumbnail}"  /></figure>
            <div class="card-body">
              <h2 class="card-title">${video.title}</h2>
                <div class="flex ">
                    <p>${video.authors[0].profile_name}</p>
                    <img class="w-6 h-6" src='${video.authors[0].profile_picture}'>
                </div>
                <p>100K Views</p>
             
            </div>
          </div> 
            `
            cardContainer.appendChild(newCard)
        })
       
        })
}

categories()
fetchDataByCategory(selectedCategory)
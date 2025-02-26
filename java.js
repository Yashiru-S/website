const menu = document.querySelector("#mobile-menu")
const menuLinks = document.querySelector(".navbar__menu")
const searchInput = document.querySelector("[data-search]")

menu.addEventListener("click", function() {
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
})

/*Popup Code*/
let popup1 = document.getElementById("chat__popup");
let popup2 = document.getElementById("chat__btn")
function openPopup() {
    popup1.classList.add("open-popup1");
    popup2.classList.add("open-popup2");         
}
function closePopup() {
    popup1.classList.remove("open-popup1");  
    popup2.classList.remove("open-popup2");         
}


//Search Bar
const search = document.querySelector(".search")
const icon = document.querySelector(".search__icon")
icon.onclick = function(){
    search.classList.toggle("active")
    }


/*let souwar = []

fetch('https://api.quran.gading.dev/surah/')
    .then(res => res.json())
    .then(data => {
        const ar_surah = data.data.name.long 
        const eng_surah = data.data.name.transliteration.en
    })

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    souwar.forEach(surah => {
        const isVisible = ar_surah.includes(value) || eng_surah.toLowerCase().includes(value)
        user.element.classList.toggle("hide", !isVisible)
    })
})*/


//Quran Part

let audio = document.querySelector(".quranPlayer"),
    surahsContainer = document.querySelector(".quran__surahs"),
    ayah = document.querySelector(".quran__ayah"),
    next = document.querySelector(".next"),
    prev = document.querySelector(".prev"),
    play = document.querySelector(".play");
    getSurahs();

    function getSurahs()
    {
        fetch('https://api.quran.gading.dev/surah/')
        .then(response => response.json())
        .then(data=>{
            for (let surah in data.data) 
            {
                surahsContainer.innerHTML+= 
                `
                    <div>
                        <p>${data.data[surah].name.long}</p>
                        <p>${data.data[surah].name.transliteration.en}</p>
                    </div>
                ` 
            }

            let allSurahs = document.querySelectorAll('.quran__surahs div'),
            AyahsAudios,
            AyahsText;
            allSurahs.forEach((surah, index)=>{
                surah.addEventListener('click',()=>{
                    fetch(`https://api.quran.gading.dev/surah/${index + 1}`)
                    .then(response => response.json())
                    .then(data=> {
                        let verses =  data.data.verses;
                        AyahsAudios = [];
                        AyahsText = [];
                        verses.forEach(verse=>{
                            AyahsAudios.push(verse.audio.primary)
                            AyahsText.push(verse.text.arab)
                        })
                        let AyahIndex = 0;
                        changeAyah(AyahIndex)
                        audio.addEventListener('ended',()=>{
                            AyahIndex++;
                            if(AyahIndex < AyahsAudios.length)
                            {
                                changeAyah(AyahIndex)
                            }
                            else
                            {
                                AyahIndex = 0;
                                changeAyah(AyahIndex);
                                audio.pause()
                                
                            }
                        })

                         next.addEventListener('click',()=>{
                             AyahIndex < AyahsAudios.length - 1 ? AyahIndex++ : AyahIndex = 0;
                             changeAyah(AyahIndex)
                         })
                         prev.addEventListener('click',()=>{
                             AyahIndex == 0 ? AyahIndex = AyahsAudios.length - 1 : AyahIndex--;
                             changeAyah(AyahIndex)
                         })

                         let isPlaying = false ;
                         togglePlay()
                         function togglePlay()
                         {
                             if(isPlaying)
                             {   
                                audio.pause();
                                play.innerHTML = `<i class="fas fa-play"></i>`;
                                isPlaying =false;
                             }
                             else
                             {
                                 audio.play();
                                 play.innerHTML = `<i class="fas fa-pause"></i>`;
                                 isPlaying = true;
                             }
                             
                         }
                         play.addEventListener('click',togglePlay)
                        function changeAyah(index)
                        {
                             audio.src = AyahsAudios[index];
                             ayah.innerHTML = AyahsText[index]
                        }
                        
                    })
                })
             })
         })
     }


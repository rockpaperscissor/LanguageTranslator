const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
selectTag = document.querySelectorAll("select"),
exchangeIcon = document.querySelector(".exchange"),
translateBtn = document.querySelector("button"),
icons = document.querySelectorAll(".row i");

selectTag.forEach((tag,id)=> {
    for (const countrycode in countries){
        //select english to hindi as default
        let selected;
        if(id == 0 && countrycode =="en-GB") {
            selected="selected";
        }
        else if(id ==1 && countrycode == "hi-IN") {
            selected = "selected";
        }
        let option = `<option value="${countrycode}" ${selected}>${countries[countrycode]}</option>`;
        tag.insertAdjacentHTML("beforeend",option);

        
    }

});

exchangeIcon.addEventListener("click",()=>{
    let tempText = fromText.value;
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
});
translateBtn.addEventListener("click",()=>{
    let text = fromText.value;
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    if(!text) return;
    toText.setAttribute("placeholder","Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    //fetching api response and returning it with parsing into js object
    //and in another then method recieving that object
    fetch(apiUrl).then(res => res.json()).then(data =>{
        console.log(data);
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder","Translation");
    });

});

icons.forEach(icon =>{
    icon.addEventListener("click",({target})=>{
        if(target.classList.contains("fa-copy")) {
            //if clicked icon has from id,copy the fromText area value or else copy the to text area value
            if(target.id =="from"){
                navigator.clipboard.writeText(fromText.value);

            }else{
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if(target.id == "from") {
                //if clicked icon has from id,speak the fromText are or else the toText area
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);//speak the passed utterance
        }

    });
})



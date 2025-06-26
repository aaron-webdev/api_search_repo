function searchGiphy()
{

 //create variables using DOM as needed
    let msgText = 'search button clicked';
    let displayDiv = document.getElementById('displayAreaDiv');
    let searchTerm = document.getElementById('userInput');
    const myKey = 'opXNmbGTidJKCOpqar49xBJGnlqlIP37';
    

    console.log(msgText);
    displayDiv.innerHTML = msgText;

 // verify searchTerm has been linked with a vailid DOM object
    if ((searchTerm == null) || (searchTerm == undefined))
    {
        msgText = 'Did not find input field';
        console.log(msgText);
        displayDiv.innerHTML = msgText;
        return false;
    }
 // verify that the input field is not empty
    if (searchTerm.value.trim().length == 0)
    {
        msgText = 'Input text then click search.';
        console.log(msgText);
        displayDiv.innerHTML = msgText;
        return false;
    }
 // create varibles with the values needed to promtp an api fetch
    msgText = "Looking for gifs with '" + searchTerm.value + "' as the keyword";
    console.log(msgText);
    displayDiv.innerHTML = msgText;

    const searchedTerm = searchTerm.value;
    const returnedDataFile = ".data/giphy@.json";
    const APIurl = `https://api.giphy.com/v1/gifs/search?api_key=${myKey}&q=${searchedTerm}&limit=40&rating=g`;

    let requestedURL = ""

        if(myKey.trim().length == 0)
        {
            requestedURL = returnedDataFile;
        }
        else
        {
            requestedURL = APIurl;
        }

    console.log(requestedURL)
 //if return satus is okay the data will be parsed into a json format
    fetch(requestedURL)
    .then(response => {
        if(!response.ok)
        {
        throw new Error('Could not fetch data from URL')
        }
        return response.json();
    })
    .then(data => {
        console.log(data)
        let resultImage = "";
 //inform user of no matches found       
        if ((data == null) || (data.data.length == 0))
        {
            displayDiv.innerText = "I cant seem to find any matches.";
            return false;
        }

 // loop through ther data, for each result create an image and add it to my display area  
        let divHTML = ""
        for (i=0; i<data.data.length;i++)
        {
            resultImage = data.data[i].images.original.url;
            console.log(resultImage);
           divHTML+= `<img width='200' height='200' src='${resultImage}'>`;
        }

        displayDiv.innerHTML = divHTML;

    })

}
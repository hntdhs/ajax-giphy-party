console.log("Let's get this party started!");

const $gifArea = $("#gif-area");
const $searchInput = $("#search");

/* use ajax result to add a gif */

function addGif(res) {
  let numResults = res.data.length; // the number of results returned by the search
  if (numResults) { // if there are results that came back from the search...
    let randomIdx = Math.floor(Math.random() * numResults);
    let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" }); // create a div with the specifications in this class; there's 12 template columns per row and you can use however many per column you want to create - md-4 is a medium column taking up 4/12 columns
    let $newGif = $("<img>", {
      src: res.data[randomIdx].images.original.url, // from the search results data, go to a random index and get the url from the image there
      class: "w-100" // take up 100% of the width of the column
    });
    $newCol.append($newGif);
    $gifArea.append($newCol);
  }
}

/* handle form submission: clear search box & make ajax call */

$("form").on("submit", async function(evt) {
  evt.preventDefault();

  let searchTerm = $searchInput.val();
  $searchInput.val(""); //resets search term field after submission

  const response = await axios.get("http://api.giphy.com/v1/gifs/search", { // this is the search endpoint for Giphy gif URL's
    params: {
      q: searchTerm, // defined just above
      api_key: "H3whgnXmf1hM8EHY3TcxWWDhxP9tuSZH" // Generated on the Giphy dev site
    }
  });
  addGif(response.data);
});

/* remove gif */

$("#remove").on("click", function() {
  $gifArea.empty();
});
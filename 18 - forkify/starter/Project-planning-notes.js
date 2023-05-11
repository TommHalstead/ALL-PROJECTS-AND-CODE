/*

 ------------------------------------------------------------- PROJECT PLANNING --------------------------------------------------------------------

USER STORIES: 

1.) As a user, I want to SEARCH FOR RECIPES, so that I can find NEW IDEAS FOR MEALS
2.) As a user, I wasnt to be able to UPDATE THE NUMBER OF SERVINGS, so that I can cook a meal for DIFFERENT NUMBER OF PEOPLE 
3.) As a user, I want to BOOKMARK RECIPES, so that I can REVIEW THEM LATER
4.) As a user, I want to be able to CREATE MY OWN RECIPES, so that I have them all ORGANIZED IN THE SAME APP
5.) As a user, I want to be able to SEE MY BOOKMARKS AND RECIPES SO THAT I CAN VIEW THEM LATER ONCE I CLOSE THE APP.


FEATURES: 

        User-1 - Search for items
1.) Search functionality: Input fields to send request to API with searched keywords
2.) Display results with multiple pages (pagination) for multiple results.
3.) Display recipe with cooking time, servings and ingredients 

        User-2 - Update servings
4.) Change servings functionality: Update all ingredients according th current number of servings

        User-3 - Bookmark recipes
5.) Bookmarking functionality: Display list of all bookmarked ingredients

        User-4 - Create recipes
6.) User can upload their own recipes
7.) User own recipes will automatically be bookmarked
8.) User can only see their own recipes, not recipes from other users.

        User-5 - See my bookmarks and recipes and come back later
9.) Store bookmark data in the browser using local storage.
10.) On page load, read saved bookmarks from local storage and display them on the page.



 ------------------------------------------------------------- SETTING UP PARCEL -------------------------------------------------------------------

- When working with your package.json file, a devDependency is an element that contains all the packages that your prject requires in the development process and not in the prodcution or testing environments/phases.

- When we set up parcel, the folders that parcel create in the 'dist' folder are the real ones that we will use for future deployment.

- Since we referenced the css file within the <link rel>, parcel knows it needs to compile the sass file to css. href="src/sass/main.scss", that way parcel will know it needs to compile the sass css file to css in the end, and place that compiled code into the new index.html file that was created by parcel. The same works with the images, parcel will copy all of these files and give them a new name, and replace that image in the newly creaetd index.html file to the new image names that parcel has created.

- A module bundler takes our raw source code and compiles it into a nice package (folder) that browsers can understand, and then be shipped to the browser so that it can display this newly created source code.

- For reminder, we use the const res = await fetch(`API URL`) to await the promise within an async function. Once the data is received, it will be stored into this variable for later use. Once we parse our first response through json() we can then get our data from that parsed response.

- Parcel can import all sorts of things, not just variables or modules, but images and icons etc etc.

- When using parcel, we also need add polyfills for ES6 features via packages with npm to our codebase.

- We use regenerator-runtime for the compiling of async functions. 

- We use core-js for polyfilling general ES6 features and methods, etc.

- npm i core-js regenerator-runtime will install both of these packages at once.

- Once we install these packages, we have to import them into our code so that they can be utilized. 

----------------------------------------------------------- GENERAL PROGRAMMING TIPS ---------------------------------------------------------------

- A common practice (if needed) is to rename variables inside of an object received by an API call to match javascript standards.

- Within a URL like so: 'https://forkify-v2.netlify.app/#5ed6604591c37cdc054bcd09' The digits at the end is the ID of the URL and the # with all of the numbers, is the hash.

- The hash changing, is an event that we can actually listen for and make decisions based off of that hash changing. In order to listen to the event of the hash changing, we first have to add an event listener to the window object. So, window.addEventListener(`hashchange`, callback fn).

- In order to change the data based on this hash, we grab the hash location with 'window.location.hash'.


----------------------------------------------------- IMPORTING ICONS AND IMAGES WITH PARCEL -------------------------------------------------------

- When we are developing our project with parcels development environment, our originally linked images and icons will no longer be the ones we have in our assets folder, but instead they will be the ones sent to this 'dist' folder by parcel. So in order to use them, we must import them from our original icons folder into our file they we are doing our work in.

- When we import these images or icons, we have to import it in regards to our current file location. For example if the folder is a sibling of the current folder, we must use '../' that way we are accessing our parent folder, and from there we can navigate to the folder we are trying to reach. For example: "import icons from 'url:../img/icons.svg';" with parcel 2, we must also use the 'url:' keyword beforehand in order for this to work.









































































































*/

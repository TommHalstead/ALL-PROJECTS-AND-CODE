/*
----------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------- PROJECT PLANNING --------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------


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


----------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------- SETTING UP PARCEL -------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------


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

- When we import packages from npm, we don't need to specify any patch because they are in the package.json folder. 

----------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------ GENERAL PROGRAMMING TIPS --------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------


- A common practice (if needed) is to rename variables inside of an object received by an API call to match javascript standards.

- Within a URL like so: 'https://forkify-v2.netlify.app/#5ed6604591c37cdc054bcd09' The digits at the end is the ID of the URL and the # with all of the numbers, is the hash.

- The hash changing, is an event that we can actually listen for and make decisions based off of that hash changing. In order to listen to the event of the hash changing, we first have to add an event listener to the window object. So, window.addEventListener(`hashchange`, callback fn).

- In order to change the data based on this hash, we grab the hash location with 'window.location.hash'.

----------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------- IMPORTING ICONS AND IMAGES WITH PARCEL -------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------


- When we are developing our project with parcels development environment, our originally linked images and icons will no longer be the ones we have in our assets folder, but instead they will be the ones sent to this 'dist' folder by parcel. So in order to use them, we must import them from our original icons folder into our file they we are doing our work in.

- When we import these images or icons, we have to import it in regards to our current file location. For example if the folder is a sibling of the current folder, we must use '../' that way we are accessing our parent folder, and from there we can navigate to the folder we are trying to reach. For example: "import icons from 'url:../img/icons.svg';" with parcel 2, we must also use the 'url:' keyword beforehand in order for this to work.


----------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------ ARCHITECTURE --------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------


- We must create a structure for our program so that our code isn't just all over the place in the global scope etc etc.

- When building a project, the architecture is very important for maintainability, a project is NEVER DONE! We will always have to go back and maintain the code within our projects, so organizing our code helps very much with this.

- Architecture helps with expandability, in case we want to come back later and add more features. This is only possible with a good structure that we can rely on in order to implement new abilities easier.

-- The perfect achitecture is the one that allows all three of these key ideas to work together best.

- We can build our own architecture, but this is very difficult. Especially with a large program. There are established architecture patterns developed by previous programmers. Such as MVC, MVP, Flux etc.

- Frameworks like React, Angular, Vue, Svelte etc. are popular ways for organzing and structuring code.

-- There are some main components that any architecture must have, those are:

1.) Business Logic 
- All the code that solves the actual business problems. 
- The actual processing logic of the application. (Taxes calculation, messaging, storing transactions etc.)
2.) State
- Application state is what stores all the data about the application running in the browser (The data about the front-end processes) e.g objects from APIs, form data, any data used on the front-end
- Should be the 'single source of truth' 
- Should be kepy in sync with the UI. If data changes in the state, the UI should represent this.
- State management libraries exist like redux  
3.) HTTP library
- Responsible for making and receiving AJAX requests.
- Fetch requests etc.
4.) Application Logic (Router)
- Code that is only concerned about the implementation of the application itself. (Handling UI events, nav on the page etc.) Rendering elements to the DOM and these type of non-business related items
5.) Presentation Logic (UI LAYER)
- Code that is concerned with the actual UI design. 
- Essensially displays the applications state so users can interact with this state.
- We need to keep the state in sync with the UI layer, by having our UI represent the state and update both according to the application logic.

-- Any good achitecture has a way of seperating all of these componenets so they are neatly organized and work toegether well with each other.

-- We will be using the MVC ( Model, View, Controller ) architecture design pattern.

- Model - Applications data ( Usually contains the state and the business logic, also contains the HTTP library as well.)

- View - Presentation Logic

- Controller - Application logic, sits in between the model and the view as a way to implement the model to the view. 

-- One of the big goals the the MVC pattern is to seperate the business logic from the application logic. Doing this, we need a way to connect the business logic to the presentation logic. This is the controller, or the application logic.

- A mini representation to how this works is as follows: User clicks a button, 'controller' - handles this event and communicates this to the business logic 'model' - does computations and sends this info to the controller, who then updates the presentation logic or the 'view'. 

- With this logic, it's only the controller who calls functions and imports from the model and the view. The MODEL and the VIEW are completely standalone logics within this paradigm that are only controlled and interacted with by the controller.

- All that either the view or the model do is sit there with their own processes and logic ready to be interacted with by logic and function calls from the controller.

----------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------- ACTUAL IMPLEMENTATION ----------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------

- We create a seperate javascript folder for our controller, model, and then the multiple views.

- We use multiple view folders simply because we don't want to folder to contain 500+ lines of code. We could also split up the controller and the model as well, but for this project that won't be necessary because they shouldn't be too big.

- We first start by creating our state object and loadRecipe() functionality and export all of this info to the controller.js module.

- If we have async functions in one module and we export them, all the same rules still apply. We still must await these promises and parse these promises before we can have access to them.

- ITS VERY IMPORTANT to remember that whenever we create an async function it will ALWAYS return a promise that we first must handle whenever we call that async function to get data. EVEN IF this function returns nothing, we still must handle the promise when we call it.

- Export default means to only export one item. 

- We create a class for our recipes and we export a new object created from that class. export default new RecipeView();. Since we don't have a constructor, we don't need to pass any data into this new class. After this we have to import this class into our controller file so we can use this data in this other module.

- When we import default, we can give that default any name on the importing file.





















































































*/

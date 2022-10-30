# `User Display CRUD`

The project was built using react and redux toolkit as well as react router dom.
 It's a simple IO taking advantage of Redux's Immer to write seemingly state
 mutating logic in the reducers and taking advantage of thunks to make
  asynchronous calls to a fake api.

As aforementioned above, the API is fake so storage is done using localstorage
 and the calls are really setItem and getItem rather than POST and Get.

What ought to have been the requests are commented out and left in the userSlice
in spite of it being bad programming practice. This is just to show how in a real
world scenario, the requests would seem.

The async thunks in the userSlice during their request cycle are forced to behave
 as action creators for the extraReducers labelled 'fulfilled, rejected and
 pending corresponding to a promise's stages as it heads towards complete
 resolution.
In order to trigger the actions, the asynchronous thunks in the userSlice return 
promises that resolve mock data in an effort to mimic the behavior of a real api 
call.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

You may also head to 

### `https://userdisplayio.netlify.app/`

in case you're not in the mood to run the app in your local machine but would still like to see it in action.



## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


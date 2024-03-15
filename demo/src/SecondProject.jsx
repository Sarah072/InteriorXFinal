import React, { useEffect, useState } from 'react';
import ContainerDimensions from 'react-container-dimensions';
import Immutable, {Map} from 'immutable';
import immutableDevtools from 'immutable-devtools';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import MyCatalog from './catalog/mycatalog';

import ToolbarScreenshotButton from './ui/toolbar-screenshot-button';
import {
  Models as PlannerModels,
  reducer as PlannerReducer,
  ReactPlanner,
  Plugins as PlannerPlugins,
} from 'react-planner';


//define state
let AppState = Map({
  'react-planner': new PlannerModels.State()
});

//define reducer
let reducer = (state, action) => {
  state = state || AppState;
  state = state.update('react-planner', plannerState => PlannerReducer(plannerState, action));
  return state;
};

let blackList = isProduction === true ? [] : [
  'UPDATE_MOUSE_COORDS',
  'UPDATE_ZOOM_SCALE',
  'UPDATE_2D_CAMERA'
];

if( !isProduction ) {
  console.info('Environment is in development and these actions will be blacklisted', blackList);
  console.info('Enable Chrome custom formatter for Immutable pretty print');
  immutableDevtools( Immutable );
}

//init store
let store = createStore(
  reducer,
  null,
  !isProduction && window.devToolsExtension ?
    window.devToolsExtension({
      features: {
        pause   : true,     // start/pause recording of dispatched actions
        lock    : true,     // lock/unlock dispatching actions and side effects
        persist : true,     // persist states on page reloading
        export  : true,     // export history of actions in a file
        import  : 'custom', // import history of actions from a file
        jump    : true,     // jump back and forth (time travelling)
        skip    : true,     // skip (cancel) actions
        reorder : true,     // drag and drop actions in the history list
        dispatch: true,     // dispatch custom actions or action creators
        test    : true      // generate tests for the selected actions
      },
      actionsBlacklist: blackList,
      maxAge: 999999
    }) :
    f => f
);

let plugins = [
  PlannerPlugins.Keyboard(),
  PlannerPlugins.Autosave('react-planner_v0'),
 // PlannerPlugins.ConsoleDebugger(),
];

let toolbarButtons = [
  ToolbarScreenshotButton,
];

function SecondProject() {
 /* const [plannerState, setPlannerState] = useState(AppState.get('react-planner')); 
  const [previousPlannerState, setPreviousPlannerState] = useState(null); 

  useEffect(() => {
    const intervalId = setInterval(() => {
   
      const sendPlannerStateToBackend = async (state) => {
        // Your code for sending planner state to the backend
        console.log("Sending planner state to backend:", state);

        const username = localStorage.getItem('username'); // Fetch username from local storage
        try {
          const response = await fetch('http://localhost:3000/collab', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, projectData: JSON.stringify(state)}),
          });
        
          const data = await response.json();
        
          if (response.ok) {
            console.log(data.message); // Assuming you want to log the message
            // Fetch the updated state from the database
            fetchUpdatedStateFromDatabase();
          } else {
            console.log('Error saving design:', data.message);
          }
        } catch (error) {
          console.error('An error occurred:', error);
        };
      }

        sendPlannerStateToBackend(plannerState.toJS());
        setPreviousPlannerState(plannerState);
      
    }, 2000); 

    return () => clearInterval(intervalId); // Cleanup function to clear interval on component unmount
  }, [plannerState, previousPlannerState]);

  const handleStateChange = (newState) => {
    console.log("handleStateChange called"); // Check if handleStateChange is called
    setPlannerState(newState.get('react-planner'));
  };

  
  const fetchUpdatedStateFromDatabase = async () => {
   

      const username = localStorage.getItem('username'); // Fetch username from local storage
      try {
        const response = await fetch('http://localhost:3000/collab/getUpdatedState', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });

      const data = await response.json();
  
      const dataObject = JSON.parse(data);
      const sceneData = dataObject.scene;
      console.log('Scene data:', sceneData);
 // console.log('updated data is: ',data);
    
    // Save the project data to local storage
   // localStorage.setItem('react-planner_v0', JSON.stringify(data.get('scene').toJS()));

      localStorage.setItem('react-planner_v0', JSON.stringify(sceneData));
      console.log("hurrayyyyyyyyyyyyyyyyyy");
    } catch (error) {
      console.error('Error fetching updated state from database:', error);
    }
  };
*/


  return (
    <Provider store={store}>
      <ContainerDimensions>
        {({ width, height }) => (
          <ReactPlanner
            catalog={MyCatalog}
            width={width}
            height={height}
            plugins={plugins}
            toolbarButtons={toolbarButtons}
            stateExtractor={(state) => state.get('react-planner')}
           // onChange={handleStateChange}
          />
        )}
      </ContainerDimensions>
    </Provider>
  );
}

/*
function SecondProject() {
  const [plannerState, setPlannerState] = useState(AppState.get('react-planner')); // Initialize state using useState hook
  const [previousPlannerState, setPreviousPlannerState] = useState(null); // Keep track of previous state


  useEffect(() => {
    // Function to send planner state to backend
    const sendPlannerStateToBackend = async (state) => {
   /*   try {
        // Make HTTP request to store state in the database
        await axios.post('/api/storePlannerState', { state });
        console.log('Planner state stored successfully:', state);
      } catch (error) {
        console.error('Error storing planner state:', error);
      }*/
      /*
      console.log("Sending planner state to backend:", state);
      const username = localStorage.getItem('username'); // Fetch username from local storage
try {
  const response = await fetch('http://localhost:3000/postDesign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, projectData: {state}}),
  });

  const data = await response.json();

  if (response.ok) {
    console.log(data.message); // Assuming you want to log the message
  } else {
    console.log('Error saving design:', data.message);
  }
} catch (error) {
  console.error('An error occurred:', error);
    };
    
    // Check if planner state has changed
    if (!previousPlannerState || !Immutable.is(previousPlannerState, plannerState)) {
      // Dispatch action to send planner state to backend whenever it changes
      sendPlannerStateToBackend(plannerState.toJS()); // Convert Immutable state to plain JavaScript object
      setPreviousPlannerState(plannerState); // Update previous state
    }
  }
  }, [plannerState, previousPlannerState]); // Trigger effect whenever plannerState or previousPlannerState changes

  const handleStateChange = (newState) => {
    console.log("hurrrrrrrrrrrrrrrrrr");
    setPlannerState(newState.get('react-planner')); // Update state when planner state changes
  };

  return (
    <Provider store={store}>
      <ContainerDimensions>
        {({ width, height }) => (
          <ReactPlanner
          onChange={handleStateChange} // Call handleStateChange when planner state changes
            catalog={MyCatalog}
            width={width}
            height={height}
            plugins={plugins}
            toolbarButtons={toolbarButtons}
            stateExtractor={(state) => state.get('react-planner')}
           
          />
        )}
      </ContainerDimensions>
    </Provider>
  );
}
*/
export default SecondProject;

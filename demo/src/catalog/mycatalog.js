import {Catalog} from 'react-planner';

import * as Areas from './areas/**/planner-element.jsx';
import * as Lines from './lines/**/planner-element.jsx';
import * as Holes from './holes/**/planner-element.jsx';
import * as Items from './items/**/planner-element.jsx';

let catalog = new Catalog();

for( let x in Areas ) catalog.registerElement( Areas[x] ); //floor
for( let x in Lines ) catalog.registerElement( Lines[x] ); //walls
for( let x in Holes ) catalog.registerElement( Holes[x] ); //doors and windows
for( let x in Items ) catalog.registerElement( Items[x] ); //furniture

catalog.registerCategory('windows', 'Windows', [Holes.window, Holes.sashWindow, Holes.venetianBlindWindow, Holes.windowCurtain] );
catalog.registerCategory('doors', 'Doors', [Holes.door, Holes.door2, Holes.door3, Holes.doorDouble, Holes.panicDoor, Holes.panicDoorDouble, Holes.slidingDoor] );

export default catalog;

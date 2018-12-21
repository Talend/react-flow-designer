[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1391fe51ad7e4a409f9bdb7df0ad7754)](https://www.codacy.com/app/Talend/react-flow-designer_2?utm_source=github.com&utm_medium=referral&utm_content=Talend/react-flow-designer&utm_campaign=badger)
[![Build Status](https://travis-ci.org/Talend/react-flow-designer.svg?branch=master)](https://travis-ci.org/Talend/react-flow-designer.svg?branch=master)

[![dependencies Status](https://david-dm.org/acateland/react-flow-designer/status.svg)](https://david-dm.org/acateland/react-flow-designer)

[![Coverage Status](https://coveralls.io/repos/github/acateland/react-flow-designer/badge.svg)](https://coveralls.io/github/acateland/react-flow-designer)

LIB in active development, concept are not fully scoped

Do Not Use !

# Datastream Designer

Use D3 for calculations.
Redux as a state manager.

## Designed inside dataflow webapp but meant to be used as a module.

### How to use it

#### Use the rendering component

```js
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
node;
import configureStore from './store/configureStore';

import { DatastreamDesigner } from './datastream_designer/';

const store = configureStore();

render(
	<Provider store={store}>
		<DatastreamDesigner />
	</Provider>,
	document.getElementById('app'),
);
```

#### integrate the reducer into your redux data store

```js
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { datastreamDesignerReducer } from '../datastream_designer/';

const rootReducer = combineReducers({
	routing: routerReducer,
	datastream: datastreamDesignerReducer,
});

export default rootReducer;
```

the datastream_designer module expose its components, reducers, and action type constants.

Action type constants are exposed for the sake of listening to them and add new feature to your application arround the datastream designer.

Exemple a reducer listening for 'DATASTREAM_DESIGNER_NODE_SELECTED' could trigger a form so you can edit the node data.

## Redux API

The redux part of this library, actions and reducer are just a thin layer on top of the API. Redux being just a medium to expose a way to interact with the API in a React/Redux application.

This action api allow the user to create/update/delete each kind of pipeline component, with the underlying datastructure healing itself, for example a link being detached from an existing port has no longer a meaning and should be deleted.

Or the action api provide `batchFlowActions` that allow an user to transform the flow datastructure trought many unstable change with a the auto healing done only when all action are applied.

### Graph

-   Graph
    -   batchFlowActions [List<Action<Node|Link|Port>>]
    -   resetFlow
-   Node
    -   add NodeRecord
    -   update NodeRecord
    -   delete NodeRecord
    -   moveStart nodeId Position
    -   move nodeId Vector
    -   moveEnd nodeId Position
-   Link
    -   add LinkRecord
    -   update LinkRecord
    -   delete LinkRecord
-   Port
    -   add PortRecord
    -   update PortRecord
    -   delete PortRecord

each of those action are intended to be used with the apply function

If any of those action fail it will throw an exception in dev mode, and just return the previous graph state un production mode.

special action for movement are kept for optimisation purpose, nothing prevent the user to update position via the `update` action


## Core API

The core API is meant to be sued to manipulate the Graph datastructure and its constituent elements at the lowest level.
Those fonction are :
- curryed by default allowing you to create complex transformation pipeline.
- check for parameter safety, throwing in dev, not applying transformation in production if those are not safe.
- Provide immutable transformation.


### Graph level

Graph level function are here to transform the graph, adding, removing and updating graph elements in the grpah context.
Those function applied to the graph do not ensure that the graph is a complient DAG, you have to commit the graph at the end of your graph operation.

```javascript
/**
 lets assume that our state contain 2 nodes with one port each * linked by a link, the `deletePort` will remove a port making * the link unstable because a link can exist only if attached to * two ports
 */
let newState = Flow.deletePort(state, 'onPortId');
/**
 the `commit` will search for all detached link and remove them resulting in a clean graph state.
 */
let newState = Flow.commit(newState);
```

### Element level

Element level function exist solely to create, transform and query information from any Graph element constituents without the context of the Graph. For example `Link.setTargetId` function will not warn you if linked port does not exist in the graph.

#### Node

#### Link

#### Port

#### Graph

#### Data

#### Size

#### Position

Overview

link https://www.lucidchart.com/documents/edit/a573ef3b-c155-4ade-983e-c7e6a16b7674/0

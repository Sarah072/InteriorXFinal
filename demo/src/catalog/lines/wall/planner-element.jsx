import {ElementsFactories} from 'react-planner';

const info = {
  title: 'wall',
  tag: ['wall'],
  description: 'Wall with different textures',
  image: require('./images.png'),
  visibility: {
    catalog: true,
    layerElementsVisible: true
  }
};

const textures = {
  bricks: {
    name:'Painted',
    uri: require('./textures/painted-normal.jpg'),
    lengthRepeatScale: 0.01,
    heightRepeatScale: 0.01,
    normal: {
      uri: require('./textures/painted-normal.jpg'),
      lengthRepeatScale: 0.01,
      heightRepeatScale: 0.01,
      normalScaleX: 0.4,
      normalScaleY: 0.4
    }
  },
  painted: {
    
      name: 'Bricks',
      uri: require('./textures/bricks.jpg'),
      lengthRepeatScale: 0.01,
      heightRepeatScale: 0.01,
      normal: {
        uri: require('./textures/bricks-normal.jpg'),
        lengthRepeatScale: 0.01,
        heightRepeatScale: 0.01,
        normalScaleX: 0.8,
        normalScaleY: 0.8
    }
  },
  bricksNormal: {
    name:'Bricks-normal',
    uri: require('./textures/bricks-normal.jpg'),
    lengthRepeatScale: 0.01,
    heightRepeatScale: 0.01,
    normal: {
      uri: require('./textures/bricks-normal.jpg'),
      lengthRepeatScale: 0.01,
      heightRepeatScale: 0.01,
      normalScaleX: 0.4,
      normalScaleY: 0.4
    }
  }, paintedNormal: {
    name:'Painted-normal',
    uri: require('./textures/painted.jpg'),
    lengthRepeatScale: 0.01,
    heightRepeatScale: 0.01,
    normal: {
      uri: require('./textures/painted.jpg'),
      lengthRepeatScale: 0.01,
      heightRepeatScale: 0.01,
      normalScaleX: 0.4,
      normalScaleY: 0.4
    }
  },slapBrus: {
    name: 'Slap Brus',
    uri: require('./textures/slap brus.jpg'),
    lengthRepeatScale: 1.0,
    heightRepeatScale: 1.0,
    normal: {
      uri: require('./textures/slap brus.jpg'),
      lengthRepeatScale: 1.0,
      heightRepeatScale: 1.0,
      normalScaleX: 0.4,
      normalScaleY: 0.4
    }
  },
  sandSwirl: {
    name:'Sand-swirl',
    uri: require('./textures/sand-swirl.jpg'),
    lengthRepeatScale: 0.01,
    heightRepeatScale: 0.01,
    normal: {
      uri: require('./textures/sand-swirl.jpg'),
      lengthRepeatScale: 0.01,
      heightRepeatScale: 0.01,
      normalScaleX: 0.4,
      normalScaleY: 0.4
    }
  },
   Wooden: {
    name:'Wooden',
    uri: require('./textures/Wooden.jpg'),
    lengthRepeatScale: 0.01,
    heightRepeatScale: 0.01,
    normal: {
      uri: require('./textures/Wooden.jpg'),
      lengthRepeatScale: 0.01,
      heightRepeatScale: 0.01,
      normalScaleX: 0.4,
      normalScaleY: 0.4
    }
  },
};

export default ElementsFactories.WallFactory('wall', info, textures);


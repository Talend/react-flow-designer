"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * substract x and y coordinates beetwen to points
 * @param point1 Object
 * @param point2 Object
 */
var substractCoordinate = exports.substractCoordinate = function substractCoordinate(point1, point2) {
  return {
    x: point1.x - point2.x,
    y: point1.y - point2.y
  };
};

/**
 * Add x and y coordinates beetwen to points
 * @param point1 Object
 * @param point2 Object
 */
var addCoordinate = exports.addCoordinate = function addCoordinate(point1, point2) {
  return {
    x: point1.x + point2.x,
    y: point1.y + point2.y
  };
};

/**
 * Calculate relative angle beetwen two points
 */
var angleFromSource = exports.angleFromSource = function angleFromSource(source) {
  return function (target) {
    var angle = Math.atan2(target.y - source.y, target.x - source.x) * 180 / Math.PI;
    if (angle < 0) {
      angle += 360;
    }
    return angle;
  };
};

/**
 * Define boxmodel object, usefull for absolute rendering coordinates, drag calculation etc...
 */
var defineBox = exports.defineBox = function defineBox(width, height) {
  var edgeDistance = function edgeDistance() {
    return {
      x: width / 2,
      y: height / 2
    };
  };

  var absoluteDrawCoordinate = function absoluteDrawCoordinate(relativeDrawCoordinate) {
    return substractCoordinate(relativeDrawCoordinate, edgeDistance());
  };

  var relativeDrawCoordinateFromCursorDragHandle = function relativeDrawCoordinateFromCursorDragHandle(cursorPosition) {
    return addCoordinate(cursorPosition, edgeDistance());
  };

  var contain = function contain(relativeDrawCoordinate, point) {
    return relativeDrawCoordinate.x - edgeDistance().x < point.x && relativeDrawCoordinate.x + edgeDistance().x > point.x && relativeDrawCoordinate.y - edgeDistance().y < point.y && relativeDrawCoordinate.y + edgeDistance().y > point.y;
  };

  return {
    contain: contain,
    edgeDistance: edgeDistance,
    absoluteDrawCoordinate: absoluteDrawCoordinate,
    relativeDrawCoordinateFromCursorDragHandle: relativeDrawCoordinateFromCursorDragHandle
  };
};
//# sourceMappingURL=2DTools.js.map
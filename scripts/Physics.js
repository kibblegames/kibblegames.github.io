// The scale between Box2D units and pixels
const SCALE = 30;

// Multiply to convert degrees to radians.
const DEG_TO_RAD = Math.PI / 180.;

// Multiply to convert radians to degrees.
const RAD_TO_DEG = 180. / Math.PI;

// 360 degrees in radians.
const TWO_PI = Math.PI * 2.;
        
if (module === undefined)
    var module = {};

//Shorthand alias' for long Box2D method names
const Physics = {
        
     Vec2:           Box2D.Common.Math.b2Vec2,
     
     BodyDef:        Box2D.Dynamics.b2BodyDef,
     Body:           Box2D.Dynamics.b2Body,
     FixtureDef:     Box2D.Dynamics.b2FixtureDef,
     Fixture:        Box2D.Dynamics.b2Fixture,
     World:          Box2D.Dynamics.b2World,
     MouseJointDef:  Box2D.Dynamics.Joints.b2MouseJointDef,
     
     DebugDraw:      Box2D.Dynamics.b2DebugDraw,

     AABB:           Box2D.Collision.b2AABB,
     MassData:       Box2D.Collision.Shapes.b2MassData,
     PolygonShape:   Box2D.Collision.Shapes.b2PolygonShape,
     CircleShape:    Box2D.Collision.Shapes.b2CircleShape,
     EdgeShape:      Box2D.Collision.Shapes.b2EdgeShape
}

module.exports.Physics = Physics;
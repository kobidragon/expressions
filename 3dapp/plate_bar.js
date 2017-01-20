"use strict";

var importIsLoaded = false;
var importedObject;
var renderer;
var scene;
var camera;
var torus;
var mobius;

function init() {
   window.onload = function() {

    var canvasContainer = document.getElementById('canvas1');


    renderer = new THREE.WebGLRenderer({canvas: canvasContainer, antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight/2);
    //renderer.setSize( 600, 400);
    document.body.appendChild( renderer.domElement); 

    scene = new THREE.Scene( );
    camera = new THREE.PerspectiveCamera( 75, (window.innerWidth / window.innerHeight)*2, 0.1, 1000);
        
    //handler for window resize event
    window.addEventListener( 'resize', function( )
    {
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize( width, height/2 );
        camera.aspect = (width / height)*2;
        camera.updateProjectionMatrix( );
    });

    // controls
    var controls = new THREE.OrbitControls( camera, renderer.domElement );

    // create geometry
    var torusGeometry1 = new THREE.TorusKnotGeometry( 1.2, .3, 100, 10 );
    var mobiusGeometry1 = new THREE.ParametricGeometry( THREE.ParametricGeometries.mobius3d, 30, 30 );

  
    // create material
    var torusMaterial = new THREE.MeshLambertMaterial( {color: 0x3366FF});
    var mobiusMaterial = new THREE.MeshPhongMaterial( {color: 0xaa4466, shininess: 60 });
    
    // create object and scene
    torus = new THREE.Mesh( torusGeometry1, torusMaterial );
    scene.add( torus);
        
    mobius = new THREE.Mesh( mobiusGeometry1, mobiusMaterial );
    scene.add( mobius );

    mobius.position.x = 10;
    torus.position.x = -6;
    mobius.position.z = -7;
    torus.position.z = -5;


    var loader = new THREE.ObjectLoader();
    loader.load('plate_bar.json', function(obj) {
            importIsLoaded = true;
            scene.add(obj);
            obj.name = "object1"
            console.log("object handle \n" + obj);
            importedObject = scene.getObjectByName( "object1", true );
   
    });
  
    var ambientLight = new THREE.AmbientLight(0xFFFFFF, .5);
    scene.add(ambientLight);
    
    var spotLight = new THREE.SpotLight(0xffffff, 1.0, 100);
    spotLight.position.set(10, 15 ,10);
    scene.add(spotLight);

    camera.position.z = 6;

   };
}; // end of init()

// game logic
function update()
{
 if (importIsLoaded) {
        console.log ("updating import position");
        console.log("object in update \n" + importedObject);
        
        importedObject.rotation.x += 0.001;
        importedObject.rotation.y += 0.01;
        importedObject.position.y = 2;
    }

    torus.rotation.x += 0.0005;
    torus.rotation.y += 0.01;

    mobius.rotation.x -= 0.0005;
    mobius.rotation.y -= 0.01;

};

// draw Scene
function render()
{
    renderer.render( scene, camera );
    console.log("render loop");
};


//run GameLoop ( update, render, repeat )
function GameLoop()
{
    requestAnimationFrame( GameLoop );
    update( );
    render( );
};

// run these
init(),
GameLoop();
        
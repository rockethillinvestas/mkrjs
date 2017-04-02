var makerjs = require('makerjs');
var app = require('electron').remote; 
var dialog = app.dialog;
var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)
var opentype = require('opentype.js');
var font = opentype.loadSync('./fonts/Roboto-Regular.ttf');

var SignXT = require('./components/SignXT.js');
var Sign202 = require('./components/Sign202.js');
var Sign203 = require('./components/Sign203.js');

var newSigns = { models: {} }

function generatedSigns(signs) {

    for (var i = 0; i<signs.length; i++) {
        var signType = checkType(signs[i]);

        // Finner kva type skilt som skal brukes med grunnlag i brytertype.
        switch(signType) {
            case "202":
                var feederSignModel = new Sign202(signs[i].name, signs[i].type, signs[i].rating, signs[i].cable, signs[i].consumer);
                break;
            case "203":
                var feederSignModel = new Sign203(signs[i].name, signs[i].type, signs[i].rating, signs[i].cable, signs[i].consumer);
                break;
            case "XT":
                var feederSignModel = new SignXT(signs[i].name, signs[i].type, signs[i].rating, signs[i].cable, signs[i].consumer);
                break;
            default:
                var feederSignModel = new SignXT(signs[i].name, signs[i].type, signs[i].rating, signs[i].cable, signs[i].consumer);
                break;
        }

        // Skalerer opp skiltene, kun for testing.
        makerjs.model.scale(feederSignModel, 5);

        
        makerjs.model.center(feederSignModel);
        makerjs.model.zero(feederSignModel);    

        // Brukes til å organisere hvordan skiltene blir lagt opp i bildet.
        if (i <= 9) {    
        makerjs.model.moveRelative(feederSignModel, [0, -(makerjs.measure.modelExtents(feederSignModel).height) * i])
        }
        if (i > 9 && i <= 19 ) {
            makerjs.model.moveRelative(feederSignModel, [makerjs.measure.modelExtents(newSigns.models[i-10]).width, 
                                                        (-(makerjs.measure.modelExtents(feederSignModel).height) * (i-10))]);
        }
        if (i > 19 && i <= 29 ) {
            makerjs.model.moveRelative(feederSignModel,  [makerjs.measure.modelExtents(newSigns.models[i-20]).width + makerjs.measure.modelExtents(newSigns.models[i-10]).width, 
                                                        (-(makerjs.measure.modelExtents(feederSignModel).height) * (i-20))]);
        }
        if (i > 29 && i <= 39 ) {
            makerjs.model.moveRelative(feederSignModel, [makerjs.measure.modelExtents(newSigns.models[i-30]).width + makerjs.measure.modelExtents(newSigns.models[i-20]).width + makerjs.measure.modelExtents(newSigns.models[i-10]).width, 
                                                        (-(makerjs.measure.modelExtents(feederSignModel).height) * (i-30))]);
        }
        if (i > 39 && i <= 49) {
            makerjs.model.moveRelative(feederSignModel, [makerjs.measure.modelExtents(newSigns.models[i-40]).width + makerjs.measure.modelExtents(newSigns.models[i-30]).width + makerjs.measure.modelExtents(newSigns.models[i-20]).width + makerjs.measure.modelExtents(newSigns.models[i-10]).width, 
                                                        (-(makerjs.measure.modelExtents(feederSignModel).height) * (i-40))]);
        }
        if (i > 49 && i <= 59) {
            makerjs.model.moveRelative(feederSignModel, [makerjs.measure.modelExtents(newSigns.models[i-50]).width + makerjs.measure.modelExtents(newSigns.models[i-40]).width + makerjs.measure.modelExtents(newSigns.models[i-30]).width + makerjs.measure.modelExtents(newSigns.models[i-20]).width + makerjs.measure.modelExtents(newSigns.models[i-10]).width, 
                                                        (-(makerjs.measure.modelExtents(feederSignModel).height) * (i-50))]);
        }
        
        newSigns.models[i] = feederSignModel;
    }
        
    var svg = makerjs.exporter.toSVG(newSigns);

    var downloadButton = document.createElement('a');
    downloadButton.innerText = 'Download DXF';    
    downloadButton.className = 'button';
    downloadButton.addEventListener("click", downloadDXF, false);
    
    document.getElementById('svgViewer').innerHTML = svg;
    document.getElementById('svgTools').appendChild(downloadButton);

    var loader = document.getElementById('file-loader');
    loader.parentNode.removeChild(loader);
}

function checkType(sign){
    var consumerType = sign.type;
    if (consumerType.indexOf("S202") >= 0) {
        return "202";
    } else if (consumerType.indexOf("S203") >= 0) {
        return "203";
    } else if (consumerType.indexOf("XT") >= 0) {
        return "XT";
    }
}

function downloadDXF(){
    var exportDXF = makerjs.exporter.toDXF(newSigns);

    // fileName is a string that contains the path and filename created in the save file dialog.  
    fs.writeFile("fwe3dw2.dxf", exportDXF, function (err) {
        if (err) {
            alert("An error ocurred creating the file " + err.message)
        }
        else {
            alert("The file has been succesfully saved");
        }
    });
}

module.exports = generatedSigns;



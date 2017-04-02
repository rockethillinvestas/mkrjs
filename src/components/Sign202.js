/*
Product width: 35mm

*/

var makerjs = require('makerjs');
var opentype = require('opentype.js');

var font = opentype.loadSync('./fonts/Roboto-Regular.ttf');

function Sign(name, type, rating, cable, consumer) {

    var nameText = new makerjs.models.Text(font, name, 2);
    var typeText = new makerjs.models.Text(font, type, 2);
    var ratingText = new makerjs.models.Text(font, rating, 2);
    var cableText = new makerjs.models.Text(font, cable, 2);
    var consumerText = new makerjs.models.Text(font, consumer, 2);

    var rectangle = new makerjs.models.Rectangle(35, 30);

    this.models = {
        nameText1: nameText,
        typeText2: typeText,
        cableText3: cableText,
        ratingText5: ratingText,
        consumerText5: consumerText,
        rectangle: rectangle
    }

    // Centering models
    makerjs.model.center(rectangle);
    makerjs.model.center(nameText);
    makerjs.model.center(typeText);
    makerjs.model.center(ratingText);
    makerjs.model.center(cableText);
    makerjs.model.center(consumerText);


    makerjs.model.moveRelative(nameText, [-12, 12]);
    makerjs.model.moveRelative(typeText, [-12, -12]);
    makerjs.model.moveRelative(ratingText, [12, -12]);
    makerjs.model.moveRelative(cableText, [0, -12]);

    makerjs.model.zero(this);

    this.units = makerjs.unitType.Millimeter;
}

module.exports = Sign;
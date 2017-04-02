/*
Product width: 52.5mm

*/

var makerjs = require('makerjs');
var opentype = require('opentype.js');

var font = opentype.loadSync('./fonts/Roboto-Regular.ttf');

function Sign(name, type, rating, cable, consumer) {

    var nameText = new makerjs.models.Text(font, name, 3);
    var typeText = new makerjs.models.Text(font, type, 3);
    var ratingText = new makerjs.models.Text(font, rating, 3);
    var cableText = new makerjs.models.Text(font, cable, 3);
    var consumerText = new makerjs.models.Text(font, consumer, 3);

    var rectangle = new makerjs.models.Rectangle(52.5, 30);

    this.models = {
        nameText: nameText,
        typeText: typeText,
        cableText: cableText,
        ratingText: ratingText,
        consumerText: consumerText,
        rectangle: rectangle
    }

    // Centering models
    makerjs.model.center(rectangle);
    makerjs.model.center(nameText);
    makerjs.model.center(typeText);
    makerjs.model.center(ratingText);
    makerjs.model.center(cableText);
    makerjs.model.center(consumerText);

    makerjs.model.moveRelative(nameText, [-20, 10]);
    makerjs.model.moveRelative(typeText, [-20, -10]);
    makerjs.model.moveRelative(ratingText, [20, -10]);
    makerjs.model.moveRelative(cableText, [0, -10]);

    makerjs.model.zero(this);

    this.units = makerjs.unitType.Millimeter;
}

module.exports = Sign;
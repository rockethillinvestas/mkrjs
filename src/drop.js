var Excel = require('exceljs');
var workbook = new Excel.Workbook();
var signs = [];
var makerjs = require('makerjs');
var Sign = require('./signGenerator.js');

var app = require('electron').remote;
var dialog = app.dialog;
var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)


(function () {
    var holder = document.getElementById('drag-file');

    holder.ondragover = () => {
        var text = document.getElementById('status-text');
        text.innerHTML = "SLEPP DA!";
        return false;
    };

    holder.ondragleave = () => {
        var text = document.getElementById('status-text');
        text.innerHTML = "Dra filer her";
        return false;
    };

    holder.ondragend = () => {
        var text = document.getElementById('status-text');
        text.innerHTML = "Dra filer her";
        return false;
    };

    holder.ondrop = (e) => {
        e.preventDefault();

        for (let f of e.dataTransfer.files) {
            readXLSX(f.path);
        }
        return false;
    };

    var uploadButton = document.getElementById('upload-btn');
    uploadButton.addEventListener("click", openFileDialog);
})();

function openFileDialog() {
    dialog.showOpenDialog(function (fileNames) {
        if (fileNames === undefined) {
            console.log("No file selected");
        } else {
            readFile(fileNames[0]);
        }
    });
}

function readFile(filepath) {
    fs.readFile(filepath, 'utf-8', function (err, data) {
        if (err) {
            alert("An error ocurred reading the file :" + err.message);
            return;
        }
        readXLSX(filepath);
    });
}

function readXLSX(path) {

        var dropZone = document.getElementById('drop-zone');
        dropZone.parentNode.removeChild(dropZone);

        var fileZone = document.getElementById('file-choose');
        fileZone.parentNode.removeChild(fileZone);

        var loader = document.createElement('div');
        loader.id = "file-loader";
        document.body.appendChild(loader);

    workbook.xlsx.readFile(path).then(function () {
        var worksheet = workbook.getWorksheet(1);
        for (i = 1; i < 40; i++) {


            if (worksheet.getCell('A' + i).value === null) {
                continue;
            }

            var sign = {
                name: worksheet.getCell('A' + i).value,
                type: worksheet.getCell('B' + i).value,
                rating: worksheet.getCell('C' + i).value,
                cable: worksheet.getCell('D' + i).value,
                consumer: worksheet.getCell('E' + i).value,
            };
            signs.push(sign);
        }
        var signPort = new Sign(signs);

    });
}

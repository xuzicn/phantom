var path = require('path');
var fs = require('fs');

var replacementFolder = "replacement";
var destinationFolder = process.cwd();
var replaces = {
    "shim.js": {
        source: path.resolve(__dirname, replacementFolder, "shim.js"),
        destination: path.resolve(destinationFolder, "shim.js")
    },
    "index.js": {
        source: path.resolve(__dirname, replacementFolder, "index.js"),
        destination: path.resolve(destinationFolder, "phantom.js")
    },
    "dnode.js": {
        source: path.resolve(__dirname, replacementFolder, "libs", "dnode", "dnode.js"),
        destination: path.resolve(destinationFolder, "node_modules", "dnode", "lib", "dnode.js")
    },
    "parse_args.js": {
        source: path.resolve(__dirname, replacementFolder, "libs", "dnode", "parse_args.js"),
        destination: path.resolve(destinationFolder, "node_modules", "dnode", "lib", "parse_args.js")
    },
    "dnode\\index.js": {
        source: path.resolve(__dirname, replacementFolder, "libs", "dnode", "index.js"),
        destination: path.resolve(destinationFolder, "node_modules", "dnode", "index.js")
    },
    "package.json": {
        source: path.resolve(__dirname, replacementFolder, "package.json"),
        destination: path.resolve(destinationFolder, "package.json")
    }
}

for (var i in replaces) {
    console.log(replaces[i].source)
    copyTo(replaces[i].source, replaces[i].destination);
}

function copyTo(source, destination) {
    try {
        //预留文件备份
        fs.rename(destination, destination+".backup", function (error) {
            if (!!error) {
                console.log(error);
                console.log("Cannot save backup file. ", destination);
            } else {
                console.log("Save backup file successfully. ", destination);
                // 覆盖文件
                fs.writeFileSync(destination, fs.readFileSync(source));
            }
        });


    } catch (e) {
        console.log("cannot replace file. Source file: ", source, ". Destination: ", destination);
        console.log(e);
    } finally {
        // fs.close();
    }
}

process.chdir(__dirname);
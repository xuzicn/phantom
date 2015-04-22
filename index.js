var fs = require('fs');
var path = require('path');
var phantompack = require(path.resolve(process.cwd(), "package.json"));

if (phantompack.name !== 'phantom') {
    console.log("Please direct to phantom root directory and run again.");
    return;
}

try {
    require(path.resolve(__dirname, "versions", phantompack.version, "main.js"));
} catch (e) {
    if (e.code == "MODULE_NOT_FOUND") {
        console.log("phantom v", phantompack.version, "is not suppported yet. Please report an issue to use.")
    } else {
        console.log(e);
    }
}
"nodejs";
const app = require("app");

// const { packageName } = require("app");
// console.log(packageName);

// 打印nodejs的版本
console.log(`Node.js版本: ${process.version}`);


const apps = app.getInstalledApps({
    get: ['meta_data'],
    match: ['system_only']
});
console.log(apps);
//1478530123
//npm init -y
// npm i  nanoid
const http = require('http')
const fs = require('fs');
const { nanoid } = require('nanoid')



http.createServer((req, res, next) => {
    const { url, method } = req
    if (url == '/' && method == 'GET') {
        let fsData = JSON.parse(fs.readFileSync('myDB.json'))
        console.log(fsData);
        res.write(JSON.stringify(fsData))
        res.end()

    } else if (url == '/addUser' && method == 'POST') {

        let bodyData;
        req.on('data', (chunk) => {
            bodyData = chunk
        })

        req.on('end', () => {
            let convertBody = JSON.parse(bodyData);
            console.log(convertBody);
            let fsData = JSON.parse(fs.readFileSync('myDB.json'))
            console.log(fsData);
            let findUser = fsData.find((ele) => {
                return ele.email == convertBody.email
            })

            if (findUser) {
                res.write("in-valid user ");
                res.end()
            } else {
                convertBody.id = nanoid()
                console.log(convertBody);
                fsData.push(convertBody)
                fs.writeFileSync('myDB.json', JSON.stringify(fsData))
                res.write("Done");
                res.end()
            }
        })
    } else if (url == '/updateUser' && method == 'PUT') {

        let bodyData;
        req.on("data", (chunk) => {

            bodyData = chunk
        })

        req.on('end', () => {
            let convertBody = JSON.parse(bodyData);
            let fsData = JSON.parse(fs.readFileSync('myDB.json'))

            fsData = fsData.map((ele) => {
                return ele.id == convertBody.id ? convertBody : ele
            })

            fs.writeFileSync('myDB.json', JSON.stringify(fsData))
            res.write(JSON.stringify(fsData))
            res.end()

        })
    } else if (url == '/deleteUser' && method == 'DELETE') {

        let bodyData;
        req.on("data", (chunk) => {

            bodyData = chunk
        })

        req.on('end', () => {
            let convertBody = JSON.parse(bodyData);
            let fsData = JSON.parse(fs.readFileSync('myDB.json'))

            fsData = fsData.filter((ele, i) => {
                console.log(i);
                console.log(ele);
                return ele.id != convertBody.id
            })

            fs.writeFileSync('myDB.json', JSON.stringify(fsData))
            res.write(JSON.stringify(fsData))
            res.end()

        })
    } else if (url == '/searchUser' && method == 'GET') {

        let bodyData;
        req.on("data", (chunk) => {

            bodyData = chunk
        })

        // searchName, searchkey
        // if ((name == searchName && id == searchkey) || (name == searchName && email == searchKey))


        req.on('end', () => {
            let convertBody = JSON.parse(bodyData);
            let fsData = JSON.parse(fs.readFileSync('myDB.json'))

            fsData = fsData.filter((ele, i) => {

                return ele.id == convertBody.searchKey ||
                    ele.userName == convertBody.searchKey ||
                    ele.email == convertBody.searchKey
            })

            res.write(JSON.stringify(fsData))
            res.end()

        })
    }
}).listen(3000, () => {
    console.log('running');
})
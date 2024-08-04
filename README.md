# first-CRUD-op-in-backend-
let play with first CRUD opertion in node js and keeep play 


const http = require('http');

http.createServer((req,res,next)=>{




    const{ url , method } = req;
    console.log( url);
    console.log( method); 


    // my arr 
    let myArr = [
       { id : 1 , name :'mahmoud' , age: 16},
        {id : 1 , name :'ali' , age: 18},
        {id : 1 , name :'omar' , age: 19},

    ]
     
    // get all user using GET method
     if( url == '/' && method == GET){
        res.write(JSON.stringify(myArr));
        res.end();
     }

     // update user by id
     else if ( url == '/updateByNAme' && mrthod == 'PATCh'){


        let myDAta ;
        req.on('data' , (ham)=>{
            myDAta =ham
        })
        req.on('end'  ,()=>{
            const conv = JSON.parse(myDAta);
            console.log(conv);
            let findUser = false;
            for (let i = 0; i < array.length; i++) {
                if(myArr[i].id== conv.id){
                    myArr[i].name = conv.name
                    findUser = true;
                
                }

                } 
                if (findUser){
                    res.write(JSON.stringify(conv));
                    res.end();
                }
                else{
                    res.write("user not excit");
                    res.end()
                }

        })
     }

    
     // find user by Name
     else if( url == '/findByname' && method == 'GET'){
        let nam ;
        req.on('data' ,(hamol)=>{
            nam=hamol
        })
        req.on('end',()=>{
            const convert = JSON.parse(nam);
            console.log(nam);
            const findB = myArr.filter((ele)=>{
                return ele.name = nam.name;
            })
            res.write(JSON.stringify(nam));
            res.end();
     })
     }


     // find user by ID
     else if (url == '/searchByID' && method == 'GET') {
        let bodyData;
        req.on('data', (chunk) => {
            bodyData = chunk
        })

        req.on('end', () => {
            let convertBody = JSON.parse(bodyData);
            let findUser = myArr.find((ele) => {
                return ele.id == convertBody.id
            })
            if (findUser) {
                res.write(JSON.stringify(findUser))
                res.end()
            } else {
                res.write('in-valid userID')
                res.end()
            }

        })

    }


     // add new USer 
     else if( url ='/addUSer' && method == 'POST'){


        let myBodyData 
        req.on('data' , (chunk)=>{
            myBodyData = chunk
        })
        req.on( 'end',()=>{
            console.log(myBodyData);
            const convertBuffer = JSON.parse(myBodyData);
            console.log(convertBuffer);

            const findUser = myArr.find((ele)=>{
                 return ele.id = findUser.id
            })
            if(findUser){
                res.write("USer aready excit");
                res.end()
            }
            else {
                myArr.push(JSON.stringify(convertBuffer));
                res.write("adddded");
                res.end();
            }

        } )
     }

     // delete user by id 
     else if( url == '/DeleteUSer' && method == 'DELETE'){
        let nam ;
        req.on('data' ,(hamol)=>{
            nam=hamol
        })
        req.on('end',()=>{
            const convert = JSON.parse(nam);
            console.log(nam);
            const findB = myArr.filter((ele)=>{
                return ele.id != convert.id;
            })
            if(findB){
            res.write(JSON.stringify(nam));
            res.end();
        }
        else
        {
            res.write("in_valid User");
            res.end();
        }
     })
     }


     // make all data revers
     else if( url =='/revers' && method == 'GET'){
        res.write(JSON.stringify(myArr.reverse()))
        res.end();

     }
     else {
        res.write("errrrrrroor 404")
        res.end();
     }



}).listen(5000 , ()=>{
    console.log('runnnnnnnnnning ')
})

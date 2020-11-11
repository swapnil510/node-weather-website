const path = require('path')
const hbs = require('hbs')
const express = require('express');
const { response } = require('express');

const geoCode = require('./utils/geocode');
const weatherStack = require('./utils/weatherstack');

const app = express();
const port = process.env.PORT || 3000
console.log(__dirname)

//Defining Paths for Express configs
const publicDirPath = path.join(__dirname,'../public')
const viewsPathDir = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//app.set(views) is required if we are not using views folder as express look at it by default. If we use custom folders, then we need to do following

//setup handlebar engine and views location
app.set('views',viewsPathDir)
app.set('view engine','hbs');
hbs.registerPartials(partialsPath);

//setup static directory to sever contents from (html,images,client side js etc)
app.use(express.static(publicDirPath))

// app.get('',(req, res)=>{    // this is commented because app.use will be used for root url by chronology. If that is commented then these 3 lines can be used
//     res.send('<h1>Hello Express!!</h1>')
// })

//below is a working code. commented as content was moved to a separate html file
// app.get('/help',(req,res)=>{
//     res.send('Help Page')
// })

//below line is required if we want to use hbs instead of index.html
app.get('',(req,res) =>{
    res.render('index',{
        title:'Hello rendering from root',
        name:'Swapnil'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Hello about',
        name:'Swapnil & Riya'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Swapnil',
        message:"This is your help message"
    })
})
// app.get('/about',(req,res)=>{
//     res.send([{
//         name:'Swapnil',
//         age:29
//     },{
//         name:'Riya',
//         age:27,
//         sirname:'Patni'
//     }])
// })




app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Address must be provided'
        })
    }

    geoCode(req.query.address,(error,{longitude,latitude,location} ={} )=>{
        if(error){
            return res.send({
                error
            });
        }

        weatherStack(longitude,latitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast:forecastData,
                address:req.query.address,
                location
            })
        })
    })

    // res.send([
    //     {
    //         location:'Milpitas',
    //         weather:'Cloudy',
    //         address: req.query.address
    //     }
    // ])
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:' Search term has to be provided'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})

//404 page with specific wildcard
app.get('/help/*',(req,res)=>{
    res.render('404',{
        name:'Swapnil',
        title:'404',
        helpMessage:'Help Article not found'
    })
})
//404 page with generic wildcard

app.get('*',(req,res)=>{
    res.render('404',{
        name:'Swapnil',
        title:'404',
        helpMessage:'Page not found'
    })
})
app.listen(port,()=>{
    console.log('Server started on ' + port)
})

console.log('In the end of the file')
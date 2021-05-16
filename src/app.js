const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

// app.get('', (req, res) => {
//     res.send('Hello Express');    // can pass array - [], JSON- {}, html
// })

const publicDirectoryPath = path.join(__dirname, '../public');

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

// app.get('/help', (req, res) => {
//     res.send('help page');
// })
// app.get('/about', (req, res) => {
//     //res.send('about page');
//     res.send('<h1>About</h1>')
// })
app.get('', (req, res) => {
    res.render('index',{
        title : 'Weather App',
        name: 'Andrew'
    })
})
app.get('/about', (req, res) => {
    res.render('about',{
        title : 'About Page',
        name: 'Andrew'
    })
})
app.get('/help', (req, res) => {
    res.render('help',{
        title : 'Help Page',
        name: 'Andrew'
    })
})

app.get('/weather', (req, res) => {
    //res.send('weather page');
    if(! req.query.address)
    {
        return res.send({
            error : 'must provide address'
        })
    }
    // res.send({
    //     location : 'India',
    //     forcast : 30,
    //     address : req.query.address
    // })

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error)
        {
            return res.send({error});
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if(error)
            {
                return res.send({error});
            }

            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'andrew',
        errorMessage : 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port);
})
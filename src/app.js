import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';
import geoCode from './utils/geoCode.js';
import weather from './utils/weather.js';

//little hack to use the __dirname like the old days
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

//default path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

//handlebars engine setup and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ankit',
        content: 'Uhm, this is the homepage of the weather app'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ankit',
        about: 'Yea, he is very cool!!!'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ankit',
        helpfulText: 'This is some very helpful text'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        weather(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                location,
                temperature: (data.temp - 273.15).toFixed(2) + '\u00B0C',
                description: data.description
            })
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ankit',
        errorMessage: 'Help article not found'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ankit',
        errorMessage: 'Article not found'
    })
});



app.listen(port, () => {
    console.log('Listening on port ' + port + '...');
})
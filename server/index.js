const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/images', express.static(path.join(__dirname, '../images')));
app.use('/js', express.static(path.join(__dirname, '../js')));
app.use('/styles', express.static(path.join(__dirname, '../styles')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Data for planets
const planets = [
  {
    id: 'mercury',
    name: 'Mercury',
    description: 'The smallest planet in our solar system and closest to the Sun.',
    facts: [
      'Mercury is only slightly larger than Earth\'s Moon.',
      'It has a solid, cratered surface, much like the Earth\'s Moon.',
      'Mercury has a thin atmosphere, and it isn\'t thick enough to protect the planet from meteoroids.'
    ],
    image: '/images/mercury.jpeg'
  },
  {
    id: 'venus',
    name: 'Venus',
    description: 'Often called Earth\'s twin because of their similar size and structure.',
    facts: [
      'Venus rotates on its axis backward compared to most planets.',
      'It\'s the hottest planet in our solar system, even though Mercury is closer to the Sun.',
      'The atmospheric pressure on Venus is 92 times greater than Earth\'s.'
    ],
    image: '/images/venus.jpeg'
  },
  {
    id: 'earth',
    name: 'Earth',
    description: 'Our home planet and the only known place in the universe confirmed to host life.',
    facts: [
      'Earth is the only planet not named after a god.',
      'The Earth\'s rotation is gradually slowing down.',
      'Earth has a powerful magnetic field that protects us from the solar wind.'
    ],
    image: '/images/earth.jpeg'
  },
  {
    id: 'mars',
    name: 'Mars',
    description: 'Known as the Red Planet due to its reddish appearance.',
    facts: [
      'Mars has the largest dust storms in the solar system.',
      'Mars has two moons, Phobos and Deimos.',
      'There is evidence that Mars once had water on its surface.'
    ],
    image: '/images/mars.jpeg'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    description: 'The largest planet in our solar system, a gas giant with a distinctive Great Red Spot.',
    facts: [
      'Jupiter has the shortest day of all the planets, rotating once every 10 hours.',
      'The Great Red Spot is a giant storm that has been raging for over 300 years.',
      'Jupiter has at least 79 moons.'
    ],
    image: '/images/Jupiter.jpeg'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    description: 'Famous for its beautiful rings made of ice and rock particles.',
    facts: [
      'Saturn is the least dense planet in the solar system - it would float in water.',
      'Saturn\'s rings extend up to 175,000 miles from the planet but are only about 3,200 feet thick.',
      'Saturn has at least 82 moons.'
    ],
    image: '/images/Saturn.jpeg'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    description: 'An ice giant that rotates at a nearly 90-degree angle from the plane of its orbit.',
    facts: [
      'Uranus was the first planet discovered with a telescope.',
      'It rotates on its side, likely due to a collision with an Earth-sized object.',
      'Uranus has 13 known rings.'
    ],
    image: '/images/Uranus.jpeg'
  },
  {
    id: 'neptune',
    name: 'Neptune',
    description: 'The most distant planet in our solar system, a cold and windy world.',
    facts: [
      'Neptune has the strongest winds in the solar system, reaching up to 1,200 mph.',
      'It takes Neptune 165 Earth years to orbit the Sun.',
      'Neptune has 14 known moons.'
    ],
    image: '/images/Neptune.jpeg'
  }
];

// Space missions data
const missions = [
  {
    id: 'apollo11',
    name: 'Apollo 11',
    year: 1969,
    description: 'First manned mission to land on the Moon.',
    image: '/images/apollo11.jpeg'
  },
  {
    id: 'iss',
    name: 'International Space Station',
    year: 1998,
    description: 'Largest modular space station in low Earth orbit.',
    image: '/images/iss.jpeg'
  }
];

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/api/planets', (req, res) => {
  res.json(planets);
});

app.get('/api/planets/:id', (req, res) => {
  const planet = planets.find(p => p.id === req.params.id);
  if (!planet) {
    return res.status(404).json({ message: 'Planet not found' });
  }
  res.json(planet);
});

app.get('/api/missions', (req, res) => {
  res.json(missions);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // In a real app, you would save this to a database or send an email
  console.log('Contact form submission:', { name, email, message });
  
  // For demo purposes, just write to a file
  const contactData = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nDate: ${new Date().toISOString()}\n\n`;
  
  fs.appendFile(path.join(__dirname, 'contacts.txt'), contactData, (err) => {
    if (err) {
      console.error('Error saving contact:', err);
      return res.status(500).json({ message: 'Error saving your message' });
    }
    
    res.json({ message: 'Thank you for your message! We will get back to you soon.' });
  });
});

// Newsletter subscription
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  
  // In a real app, you would save this to a database or send to a mailing service
  console.log('Newsletter subscription:', { email });
  
  // For demo purposes, just write to a file
  const subscriptionData = `Email: ${email}\nDate: ${new Date().toISOString()}\n\n`;
  
  fs.appendFile(path.join(__dirname, 'subscribers.txt'), subscriptionData, (err) => {
    if (err) {
      console.error('Error saving subscription:', err);
      return res.status(500).json({ message: 'Error processing your subscription' });
    }
    
    res.json({ message: 'Thank you for subscribing to our newsletter!' });
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke! Please try again later.');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the website`);
}); 
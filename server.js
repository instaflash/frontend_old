const
PORT = process.env.PORT || 80;
express = require('express'),
app = express();
app.use(express.static('dist'));
app.listen(PORT, () => console.log(`HTTP server listening on port ${PORT}!`));

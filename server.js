const app = require('./api/index');
const express = require('express');
const path = require('path');

// Serve static frontend files locally
app.use(express.static(__dirname));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Local dev server running on port ${PORT}`));

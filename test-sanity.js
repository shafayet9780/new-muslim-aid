const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'yeenwe79s',
  dataset: 'production',
  apiVersion: '2023-12-01',
  useCdn: false,
});

async function testConnection() {
  try {
    console.log('Testing Sanity connection...');
    console.log('Project ID:', 'yeenwe79s');
    console.log('Dataset:', 'production');
    
    // Try a simple query to test the connection
    const result = await client.fetch('*[_type == "siteSettings"][0]');
    console.log('Connection successful!');
    console.log('Result:', result);
  } catch (error) {
    console.log('Connection failed:', error.message);
    console.log('Full error:', error);
  }
}

testConnection(); 
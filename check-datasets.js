import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: 'production', // This will be overridden
  apiVersion: '2023-12-01',
  useCdn: false,
});

async function checkDatasets() {
  try {
    console.log('Checking available datasets...');
    console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
    
    // Try to list datasets (this might not work with read-only token)
    const datasets = await client.datasets.list();
    console.log('Available datasets:', datasets.map(d => d.name));
  } catch (error) {
    console.log('Error checking datasets:', error.message);
    console.log('\nTo fix this:');
    console.log('1. Go to https://manage.sanity.io');
    console.log('2. Select your project');
    console.log('3. Go to Settings → Datasets');
    console.log('4. Create a dataset named "production" or update your .env.local with the correct dataset name');
  }
}

checkDatasets(); 
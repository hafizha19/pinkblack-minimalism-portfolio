import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env' });

async function testConnection() {
  console.log('🔍 Testing MongoDB Connection...\n');
  
  const MONGODB_URI = process.env.MONGODB_URI;
  
  // Check if URI exists
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in .env');
    console.log('\n📝 Create a .env file with:');
    console.log('MONGODB_URI=mongodb://localhost:27017/portfolio');
    console.log('or');
    console.log('MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio');
    process.exit(1);
  }

  console.log('📋 Connection String:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'));
  console.log('');

  try {
    // Attempt to connect
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });

    console.log('✅ Successfully connected to MongoDB!\n');

    // Get connection info
    const db = mongoose.connection.db;
    const admin = db?.admin();
    
    // if (admin) {
    //   const serverStatus = await admin.serverStatus();
    //   console.log('📊 Server Info:');
    //   console.log(`   - Host: ${serverStatus.host}`);
    //   console.log(`   - Version: ${serverStatus.version}`);
    //   console.log(`   - Uptime: ${Math.floor(serverStatus.uptime / 3600)} hours`);
    // }

    // List collections in current database
    const collections = await mongoose.connection.db?.listCollections().toArray();
    console.log('\n📦 Collections in current database:');
    if (collections && collections.length > 0) {
      for (const collection of collections) {
        const count = await mongoose.connection.db?.collection(collection.name).countDocuments();
        console.log(`   - ${collection.name}: ${count} documents`);
      }
    } else {
      console.log('   (No collections yet - run "npm run seed" to create them)');
    }

    console.log('\n✅ Connection test completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Connection failed!');
    
    if (error instanceof Error) {
      console.error(`\n🔴 Error: ${error.message}`);
      
      // Provide helpful error messages
      if (error.message.includes('ECONNREFUSED')) {
        console.log('\n💡 Troubleshooting:');
        console.log('   1. Make sure MongoDB is running locally:');
        console.log('      - Check with: mongod --version');
        console.log('      - Start with: brew services start mongodb-community (Mac)');
        console.log('      - Or: sudo systemctl start mongod (Linux)');
      } else if (error.message.includes('authentication failed')) {
        console.log('\n💡 Authentication Error:');
        console.log('   - Check your username and password in MONGODB_URI');
        console.log('   - For Atlas: verify user has correct permissions');
      } else if (error.message.includes('Server selection timed out')) {
        console.log('\n💡 Connection Timeout:');
        console.log('   - For local: ensure MongoDB is running');
        console.log('   - For Atlas: check IP whitelist (0.0.0.0/0 for dev)');
        console.log('   - Verify network connection');
      }
    }
    
    process.exit(1);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('\n🔌 Connection closed');
  }
}

// Run the test
testConnection();
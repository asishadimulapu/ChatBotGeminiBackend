const validateEnvironment = () => {
  const requiredEnvVars = [
    'GEMINI_API_KEY',
    'JWT_SECRET',
    'MONGO_URI',
    'PORT'
  ];

  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(envVar => console.error(`   - ${envVar}`));
    console.error('\nPlease check your .env file and ensure all required variables are set.');
    process.exit(1);
  }

  // Validate JWT_SECRET strength
  if (process.env.JWT_SECRET.length < 32) {
    console.error('❌ JWT_SECRET must be at least 32 characters long for security.');
    process.exit(1);
  }

  // Validate PORT
  const port = parseInt(process.env.PORT);
  if (isNaN(port) || port < 1 || port > 65535) {
    console.error('❌ PORT must be a valid number between 1 and 65535.');
    process.exit(1);
  }

  console.log('✅ Environment validation passed');
};

module.exports = { validateEnvironment };

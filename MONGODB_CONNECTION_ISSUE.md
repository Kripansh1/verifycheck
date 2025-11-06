# MongoDB Connection Issue - Diagnosis

## Problem
The MongoDB cluster at `verifycheck.0xvqj.mongodb.net` is not reachable. DNS lookup returns NXDOMAIN (non-existent domain).

## Error Details
```
Error: querySrv ENOTFOUND _mongodb._tcp.verifycheck.0xvqj.mongodb.net
```

## Possible Causes
1. **Cluster was deleted** - The MongoDB Atlas cluster may have been deleted
2. **Cluster is paused** - Some MongoDB Atlas configurations pause clusters after inactivity
3. **Network/IP restriction** - IP access list may have blocked access
4. **Connection string changed** - The cluster may have been recreated with a new connection string

## Current Connection String
```
MONGODB_URI=mongodb+srv://verifykart2:verifykart2@verifycheck.0xvqj.mongodb.net/verifycheck?retryWrites=true&w=majority
```

## How to Fix

### Option 1: Update Existing Cluster (MongoDB Atlas Dashboard)
1. Go to https://cloud.mongodb.com/
2. Login with your MongoDB Atlas account
3. Check if the `verifycheck` cluster exists
4. If it exists:
   - Click **Connect** → **Connect your application**
   - Copy the new connection string
   - Update `.env` file with new connection string
5. If it doesn't exist, go to Option 2

### Option 2: Create New Cluster
1. Go to https://cloud.mongodb.com/
2. Click **Create** → **Cluster**
3. Choose **Free** tier (M0)
4. Choose your region (prefer Mumbai/BOM for India)
5. Click **Create Cluster**
6. Once created:
   - Click **Connect** → **Connect your application**
   - Copy the connection string
   - Update credentials if needed
   - Update `.env` file

### Option 3: Check IP Access List
1. Go to MongoDB Atlas → **Network Access**
2. Click **Add IP Address**
3. Add your IP or `0.0.0.0/0` for development (not recommended for production)
4. Test the connection again

## Steps to Update
1. Get the new connection string from MongoDB Atlas
2. Update `.env` file:
   ```bash
   MONGODB_URI=your_new_connection_string_here
   ```
3. Restart the Next.js dev server:
   ```bash
   pkill -f "next dev"
   npm run dev
   ```
4. Test the connection:
   ```bash
   curl http://localhost:3000/api/test-db
   ```

## Test the Connection
After updating, run:
```bash
curl http://localhost:3000/api/test-db
```

Should return:
```json
{"success":true,"message":"MongoDB connection successful","connectionState":"connected","database":"verifycheck"}
```

## Alternative: Use Different Database Provider
If you prefer, you could also use:
- **MongoDB Atlas** (Recommended - Free tier available)
- **Railway** - Has MongoDB addon
- **PlanetScale** - MySQL compatible
- **Supabase** - PostgreSQL with MongoDB-like API



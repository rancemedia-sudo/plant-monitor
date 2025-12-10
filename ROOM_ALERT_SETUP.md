# Room Alert Integration Guide

This guide will help you connect your Room Alert device to the GreenThumb app to display live temperature and humidity data for your gardens.

## Quick Start

1. **Start the app in development mode** (mock data enabled by default):
   ```bash
   npm run dev
   ```

2. **Configure a garden**:
   - Login to the app
   - Select or create a garden
   - Click the **"Configure"** button on the garden card
   - Enter a mock Device ID (e.g., "RA-12345")
   - Enter a sensor name (optional)
   - Click "Save Configuration"

3. **View live data**:
   - Select the configured garden
   - You'll see a live environment data card showing temperature and humidity
   - Data automatically updates every 30 seconds

## Connecting Your Real Room Alert Device

### Step 1: Find Your Device Information

1. Log into your Room Alert account at [https://www.avtech.com](https://www.avtech.com)
2. Navigate to your device settings
3. Note down:
   - Device ID (usually starts with "RA-" or similar)
   - API endpoint URL (if applicable)
   - Whether your device requires API authentication

### Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and update the values:
   ```env
   # Set to false to use real Room Alert data
   VITE_USE_MOCK_ROOM_ALERT=false
   
   # Your Room Alert API base URL
   VITE_ROOM_ALERT_BASE_URL=https://avtech.com/api/v1
   
   # Your API key (if required)
   VITE_ROOM_ALERT_API_KEY=your_actual_api_key
   ```

### Step 3: Update API Endpoint (if needed)

The Room Alert API varies by model. You may need to customize the API endpoint in `src/utils/roomAlertService.ts`:

```typescript
// Example for different Room Alert models:

// Model 1: Cloud API
const url = `${ROOM_ALERT_BASE_URL}/devices/${deviceId}/sensors`;

// Model 2: Local network device
const url = `http://${deviceId}/api/sensors`;

// Model 3: Direct IP access
const url = `http://192.168.1.100/api/data`;
```

Consult your Room Alert documentation for the correct endpoint format.

### Step 4: Configure Your Garden

1. In the GreenThumb app, go to Garden Selection
2. Click "Configure" on your target garden
3. Enter your actual Room Alert Device ID
4. Enter a friendly sensor name
5. Save the configuration

### Step 5: Test the Connection

1. Select the configured garden
2. Check the environment data card
3. If data doesn't appear:
   - Open browser console (F12)
   - Look for error messages
   - Verify device ID and API settings
   - Check network connectivity

## Features

### Live Data Display
- **Temperature**: Displayed in Fahrenheit with color-coded indicators
  - Blue: < 60°F (cool)
  - Green: 60-80°F (optimal)
  - Red: > 80°F (warm)

- **Humidity**: Displayed as percentage with color coding
  - Orange: < 40% (dry)
  - Green: 40-70% (optimal)
  - Blue: > 70% (humid)

### Auto-Refresh
- Data automatically updates every 30 seconds
- Configurable refresh interval
- Visual indicator shows last update time

### Error Handling
- Displays connection status
- Shows error messages if device is unreachable
- Falls back gracefully if no device is configured

## API Service Structure

The Room Alert integration consists of:

1. **roomAlertService.ts**: API client for fetching sensor data
2. **EnvironmentData.tsx**: UI component for displaying live data
3. **Garden type**: Extended to store Room Alert configuration
4. **GardenSelection**: Interface for configuring devices

## Customization

### Change Refresh Interval

Edit `src/components/PlantSelection.tsx`:

```typescript
<EnvironmentData 
  deviceId={garden.roomAlertConfig?.deviceId}
  sensorName={garden.roomAlertConfig?.sensorName}
  refreshInterval={60000}  // 60 seconds instead of 30
/>
```

### Modify Temperature Units

To display Celsius instead of Fahrenheit, edit `src/components/EnvironmentData.tsx`:

```typescript
// Add conversion
const tempInCelsius = ((data.temperature - 32) * 5) / 9;

// Display
<p className={`text-2xl font-bold ${getTemperatureColor(data.temperature)}`}>
  {tempInCelsius.toFixed(1)}°C
</p>
```

### Add More Sensors

Extend the `RoomAlertData` type in `src/types/index.ts`:

```typescript
export interface RoomAlertData {
  temperature: number;
  humidity: number;
  lightLevel?: number;  // Add new sensor
  co2Level?: number;    // Add new sensor
  timestamp: Date;
  deviceId: string;
  sensorName: string;
}
```

## Troubleshooting

### Data Not Appearing

1. Check browser console for errors
2. Verify `VITE_USE_MOCK_ROOM_ALERT` is set correctly in `.env`
3. Confirm device ID is correct
4. Test device API directly with curl or Postman

### CORS Issues

If accessing a local Room Alert device, you may encounter CORS errors:

**Solution**: Add a proxy in `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.100',
        changeOrigin: true,
      }
    }
  }
});
```

### Authentication Errors

Some Room Alert models require authentication:

1. Generate API key in your Room Alert account
2. Add to `.env` file
3. Verify header format in `roomAlertService.ts`

### Different Data Format

If your Room Alert returns data in a different format, update the parsing logic in `roomAlertService.ts`:

```typescript
// Adjust based on your actual API response
const tempSensor = data.sensors.find(s => s.type === 'temperature');
const humiditySensor = data.sensors.find(s => s.type === 'humidity');
```

## Support

For Room Alert device-specific questions:
- Visit [AVTECH Support](https://avtech.com/support)
- Check your device's user manual
- Contact AVTECH technical support

For app integration issues:
- Check browser console for error messages
- Verify environment variable configuration
- Review API response format in Network tab (F12)

## Development Mode

The app includes mock data for development:

- Simulates realistic temperature (68-76°F) and humidity (50-70%) values
- Adds slight random variations to mimic real sensors
- 500ms simulated API delay
- No actual Room Alert device needed

To use mock mode:
```env
VITE_USE_MOCK_ROOM_ALERT=true
```

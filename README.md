# CreatorInsights - YouTube Channel Analyzer

A comprehensive YouTube channel analytics tool that provides real-time insights, growth recommendations, and competitor analysis using the YouTube Data API v3.

## 🚀 Features

### Real-Time YouTube Data Integration
- **Live Statistics**: Real subscriber counts, views, and video metrics
- **Recent Video Analysis**: Performance analysis of latest 50 videos
- **Engagement Metrics**: Likes, comments, and interaction rates
- **Growth Tracking**: Upload frequency and performance trends

### Advanced Analytics
- **Channel Health Score**: Comprehensive performance scoring system
- **Competitor Comparison**: Side-by-side channel benchmarking
- **AI-Powered Recommendations**: Content optimization suggestions
- **Performance Visualization**: Interactive charts and graphs

### Premium User Experience
- **Responsive Design**: Works perfectly on all devices
- **Smooth Animations**: Framer Motion powered interactions
- **Real-Time Updates**: Live data fetching with progress indicators
- **Quota Management**: API usage monitoring and optimization

## 🛠️ Setup Instructions

### 1. Get YouTube Data API v3 Key

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select an existing one
3. Enable the YouTube Data API v3
4. Create credentials (API Key)
5. Copy your API key

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
VITE_YOUTUBE_QUOTA_LIMIT=10000
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```

## 📊 API Usage & Quotas

### Quota Costs per Operation
- **Channel Analysis**: ~3-5 quota units
- **Video Fetching**: ~1-2 quota units  
- **Channel Comparison**: ~6-10 quota units

### Daily Quota Limit
- **Free Tier**: 10,000 units per day
- **Paid Tier**: Higher limits available

### Quota Optimization
- Intelligent caching to reduce API calls
- Progress tracking for quota usage
- Automatic quota management

## 🔧 Technical Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Recharts** - Data visualization
- **React Router** - Client-side routing

### API Integration
- **YouTube Data API v3** - Real channel data
- **Axios** - HTTP client with interceptors
- **Error Handling** - Comprehensive error management
- **Quota Tracking** - Usage monitoring

### Development Tools
- **ESLint** - Code linting
- **Hot Reload** - Fast development
- **TypeScript Support** - Type safety (optional)

## 📱 Supported Channel URL Formats

The analyzer supports various YouTube URL formats:

```
https://youtube.com/@channelhandle
https://youtube.com/channel/UC1234567890
https://youtube.com/c/customname
https://youtube.com/user/username
```

## 🎯 Key Metrics Analyzed

### Channel Performance
- Subscriber count and growth rate
- Total views and average views per video
- Upload consistency and frequency
- Engagement rate (likes + comments / views)

### Video Analysis
- Top performing videos
- Recent video performance trends
- Content optimization opportunities
- Upload timing analysis

### Health Score Calculation
- **Subscriber Count** (0-20 points)
- **Engagement Rate** (0-25 points)
- **Upload Consistency** (0-20 points)
- **View Growth** (0-20 points)
- **Video Count** (0-15 points)

## 🚦 Error Handling

### Common Issues & Solutions

**Invalid API Key**
```
Error: Invalid YouTube API key
Solution: Check your API key in .env file
```

**Quota Exceeded**
```
Error: YouTube API quota exceeded
Solution: Wait for quota reset or upgrade your limit
```

**Channel Not Found**
```
Error: Channel not found
Solution: Ensure the channel URL is correct and public
```

## 🔒 Privacy & Security

- **API keys stored locally** - Never sent to external servers
- **No data collection** - All analysis happens client-side
- **Public data only** - Only analyzes publicly available YouTube data
- **GDPR compliant** - No personal data storage

## 📈 Performance Optimizations

### API Efficiency
- Batch requests for multiple videos
- Intelligent caching strategies  
- Quota-aware request scheduling
- Error retry mechanisms

### UI Performance
- Lazy loading for components
- Optimized re-renders
- Smooth animations with Framer Motion
- Responsive image loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the troubleshooting guide above
2. Review YouTube API documentation
3. Create an issue on GitHub
4. Contact support team

---

**Note**: This application uses the YouTube Data API v3 and requires a valid API key to function. The accuracy of data depends on YouTube's public statistics availability.
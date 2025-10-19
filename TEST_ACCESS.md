# Noesis App - Testing Access

## ✅ Server is Running!

Your Expo development server is running and accessible to your friends for testing.

---

## 📱 How Your Friends Can Access the App

### Option 1: Direct URL (Easiest)
Tell your friends to:
1. Install **Expo Go** app on their phone:
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

2. Open Expo Go

3. Enter this URL manually:
   ```
   exp://129.80.86.121:8082
   ```

### Option 2: QR Code (Scan to Connect)
Your friends can scan the QR code that was just generated above in the terminal, or regenerate it with:

```bash
npx qrcode-terminal "exp://129.80.86.121:8082"
```

---

## 🔧 Server Details

- **Status**: ✅ Running
- **Port**: 8082
- **IP Address**: 129.80.86.121
- **URL**: exp://129.80.86.121:8082

The server is accessible from outside your local network, so your friends can connect from anywhere.

---

## 🎨 What's New - Noesis Rebrand

Your friends will see:
- **New name**: "Noesis" (direct knowing through integration)
- **Warm aesthetic**: Terra cotta, sage green, golden colors
- **Onboarding**: First-time users see 6-slide welcome carousel
- **All screens updated**: Consistent warm, earthy design throughout
- **Fixed overlaps**: Navigation buttons no longer cover content
- **Session Preparation**: Now fully functional with all sections

---

## 🐛 Testing Checklist

Have your friends test:
- [ ] Login screen (warm gradient, sparkle logo)
- [ ] Onboarding carousel (swipe through 6 slides)
- [ ] Home screen (terra cotta accents)
- [ ] Education section
- [ ] Session Tools → Session Preparation (all 4 sections work)
- [ ] Exercise Library
- [ ] Navigation buttons (should not overlap content)

---

## 💡 Tips

- **Keep server running**: Don't close the terminal with `npx expo start`
- **Reload app**: Shake phone and tap "Reload" if changes don't appear
- **Check logs**: Watch the terminal for errors

---

## 🛑 To Stop the Server

When done testing:
```bash
# Press Ctrl+C in the terminal running expo
```

Or find and kill the process:
```bash
netstat -ano | findstr :8082
# Then: powershell -Command "Stop-Process -Id [PID] -Force"
```

---

## 📝 Notes

- Server started: Just now
- Latest commit: SessionPreparationScreen fixes
- All 22 screens updated with Noesis aesthetic
- Safe area fixes applied throughout

**Your friends can now test the beautiful new Noesis app!** 🎉

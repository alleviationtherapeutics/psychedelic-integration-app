# Figma → React Native Workflow with Claude

## 🎨 **Option A: Figma + Claude** (Recommended)

This is the best workflow for designing UI and having me convert it to React Native code that integrates perfectly with your Noesis design system.

---

## 📋 **Step-by-Step Workflow**

### 1. **Set Up Figma** (Free)

1. Go to https://figma.com
2. Sign up for free account
3. Download desktop app OR use web version

### 2. **Create Your Design**

#### Option 2A: Start from Template
- Browse Figma Community for React Native templates
- Search for: "React Native App", "Mobile App", "Wellness App"
- Duplicate template to your workspace
- Customize with Noesis colors

#### Option 2B: Start from Scratch
- Create new file
- Set up frames for mobile screens (375x812 for iPhone)
- Use Noesis color palette (I'll provide)

### 3. **Use Noesis Design Tokens in Figma**

Create color styles in Figma matching your theme:

**Colors to add as Figma Styles:**
- Primary: `#D4725C` (Terra Cotta)
- Primary Dark: `#C76B5C`
- Clay: `#C97B63`
- Sage: `#8B9D83`
- Sand: `#E8DCC4`
- Cream: `#F5F1E8`
- Deep Earth: `#7A5C4D`
- Slate: `#6B7D8F`
- Golden: `#E6B17E`
- White: `#FFFFFF`
- Text: `#3A3A3A`

**Typography Styles:**
- Header XL: 32px, Bold, -0.5 letter spacing
- Header L: 24px, Bold, -0.3 letter spacing
- Header M: 20px, Bold
- Body: 16px, Regular
- Secondary: 14px, Regular

**Spacing:**
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- xxl: 48px

**Border Radius:**
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px

### 4. **Design Your Screen**

Tips for designs that convert well:
- ✅ Use Auto Layout (like Flexbox in React)
- ✅ Name layers clearly ("headerContainer", "primaryButton")
- ✅ Use components for repeated elements
- ✅ Keep hierarchy simple
- ✅ Use consistent spacing (8px grid)

### 5. **Share with Me**

**When your design is ready:**

1. Click "Share" button in Figma
2. Set to "Anyone with link can view"
3. Copy the link
4. Send to me with instructions like:

```
Here's my Figma design for the [Screen Name]:
[Figma Link]

Please convert this to React Native and integrate with:
- Noesis color system
- Existing navigation structure
- SafeAreaView for navigation bars
```

### 6. **I'll Convert It**

I will:
1. ✅ Analyze your Figma design
2. ✅ Extract layout, spacing, colors, typography
3. ✅ Write React Native component code
4. ✅ Use your existing Noesis theme (`colors.js`)
5. ✅ Match exact spacing and styling
6. ✅ Add SafeAreaView and proper navigation
7. ✅ Test and commit the code

### 7. **Iterate**

- Review on your device
- Request adjustments
- I'll update the code
- Repeat until perfect!

---

## 🎯 **What Makes This Workflow Great**

### For You:
- 🎨 **Visual design** - See exactly what you're building
- 🖱️ **Easy changes** - Drag, drop, adjust in Figma
- 👥 **Collaboration** - Share with team/friends for feedback
- 📱 **Realistic preview** - See mobile mockups

### For Me:
- 🔍 **Precise conversion** - I can read exact measurements
- 🎨 **Color extraction** - Auto-match your Noesis palette
- 📐 **Layout analysis** - Convert Auto Layout to Flexbox
- ✨ **Perfect implementation** - Matches design exactly

---

## 📚 **Figma Resources**

### Learn Figma (Fast):
- **Figma Basics**: https://www.youtube.com/watch?v=FTFaQWZBqQ8 (10 min)
- **Auto Layout**: https://www.youtube.com/watch?v=TyaGpGDFczw (15 min)
- **Mobile App Design**: https://www.youtube.com/watch?v=PeGfX7W1mJk (30 min)

### Figma Plugins to Install:
1. **Stark** - Accessibility checker
2. **Unsplash** - Free stock photos
3. **IconScout** - Free icons
4. **Color Shades** - Generate color palettes

### Community Files to Explore:
- Search "React Native" in Figma Community
- Duplicate free templates
- Study how they're structured

---

## 🚀 **Quick Start Example**

Let's say you want to redesign the Session Detail screen:

### Your Process:
1. Open Figma
2. Create 375x812 frame (iPhone)
3. Add your content:
   - Header with gradient
   - Session info cards
   - Action buttons
4. Apply Noesis colors from the palette above
5. Share link with me

### My Process:
```javascript
// I'll create something like:
import { colors, gradients, spacing, borderRadius } from '../theme/colors';

const SessionDetailScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <LinearGradient colors={gradients.warm} style={styles.header}>
        {/* Exactly matching your Figma design */}
      </LinearGradient>
      {/* ... rest of your design converted to code */}
    </SafeAreaView>
  );
};
```

---

## 💡 **Alternative: Quick Iterations Without Figma**

If you don't want to learn Figma right now, you can also:

### Option 1: Describe It
```
"I want the session detail screen to have:
- Gradient header (warm colors) with title
- Card showing session date, type, duration
- Big 'Start Session' button at bottom
- Back button in header
```

I'll code it and you review on device.

### Option 2: Sketch & Photo
- Draw on paper or whiteboard
- Take photo
- Share with me
- I'll convert to code

### Option 3: Reference Other Apps
```
"Make it look like [App Name]'s [Screen Name]
but with Noesis colors"
```

---

## ✅ **Current Status**

Your Noesis app already has:
- ✅ Complete design system in `theme/colors.js`
- ✅ All 22 screens with consistent styling
- ✅ Navigation and safe areas working
- ✅ Ready for Figma designs to be dropped in!

**Next time you want to add/redesign a screen:**
1. Design it in Figma (or sketch/describe)
2. Share with me
3. I'll code it perfectly integrated
4. Test on device
5. Done!

---

## 🎊 **Ready to Start?**

1. **Create free Figma account**: https://figma.com
2. **Watch 10-min tutorial**: https://www.youtube.com/watch?v=FTFaQWZBqQ8
3. **Design your first screen**
4. **Share link with me**
5. **Get perfect React Native code!**

This workflow will make UI design so much faster and more precise! 🚀

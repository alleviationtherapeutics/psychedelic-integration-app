# Content Management Guide

This folder contains all editable content for exercises and educational materials. Edit these files to add, remove, or modify content **without touching any component code**.

## 📁 Files

### `exercises.js`
Contains all therapeutic exercises with their steps and instructions.

### `education.js`
Contains all educational topics with their content sections.

---

## ✏️ How to Edit Exercises

### Adding a New Exercise

1. Open `exercises.js`
2. Find the category array (e.g., `breathing`, `grounding`, `somatic`, etc.)
3. Add a new object to the array:

```javascript
{
  title: "Your Exercise Name",
  steps: [
    "Step 1 instruction",
    "Step 2 instruction",
    "Step 3 instruction"
  ],
  duration: 5,  // time in minutes
  instructions: "What this exercise does and why it's helpful"
}
```

### Editing an Existing Exercise

1. Find the exercise in its category
2. Modify the `title`, `steps`, `duration`, or `instructions`
3. Save the file - changes will appear in the app immediately

### Adding a New Category

1. Add a new category to the `exercises` object:
```javascript
myNewCategory: [
  {
    title: "First Exercise",
    steps: [...],
    duration: 5,
    instructions: "..."
  }
]
```

2. Add the category metadata to `exerciseCategories`:
```javascript
{
  id: 'myNewCategory',
  name: 'My Category Name',
  icon: 'icon-name',  // MaterialIcons name
  color: '#hexcolor',
  description: 'Brief description'
}
```

---

## 📚 How to Edit Educational Content

### Adding a New Topic

1. Open `education.js`
2. Add a new object to the `educationTopics` array:

```javascript
{
  id: 'my_topic',
  title: 'Topic Title',
  description: 'Brief overview for the topic card',
  emoji: '📖',
  estimatedTime: '10 minutes',
  content: [
    {
      title: 'Section 1 Title',
      text: 'Section content here...'
    },
    {
      title: 'Section 2 Title',
      text: 'More content...'
    }
  ],
  keyTakeaways: [
    'Main point 1',
    'Main point 2',
    'Main point 3'
  ]
}
```

### Editing Existing Content

1. Find the topic by its `id`
2. Edit the sections in the `content` array
3. Update `keyTakeaways` if needed
4. Save the file

### Content Structure

Each topic has:
- **id**: Unique identifier (use lowercase with underscores)
- **title**: Display name
- **description**: Brief overview shown on topic card
- **emoji**: Icon for visual identification
- **estimatedTime**: How long to read (e.g., "5 minutes")
- **content**: Array of sections, each with:
  - `title`: Section heading
  - `text`: Section content (can use \n for line breaks, • for bullet points)
- **keyTakeaways**: Array of main points (optional)

---

## 🎨 Formatting Tips

### Text Formatting

Use plain text with these conventions:
- `\n` for new lines
- `• ` for bullet points (bullet + space)
- **Bold** won't work in plain strings, but you can use CAPS for emphasis
- Keep paragraphs concise for mobile readability

### Example:
```javascript
text: `This is an introduction paragraph.

Here's a list:
• First point
• Second point
• Third point

And a closing thought.`
```

---

## 🔄 Testing Your Changes

1. **Save the file** (exercises.js or education.js)
2. **Reload the app** (restart the development server if needed)
3. **Navigate to the relevant screen**:
   - Exercise Library: Home → Exercise Library
   - Education: Home → Learning Library
4. **Verify your changes** appear correctly

---

## ⚠️ Common Mistakes to Avoid

### ❌ DON'T:
- Forget commas between array items
- Use quotes inside strings without escaping: `"He said "hello"` ❌
- Modify the file structure or function names

### ✅ DO:
- Use backticks for multi-line strings: `` `text here` ``
- Escape quotes if needed: `"He said \"hello\"`
- Test your changes after editing
- Keep consistent formatting

---

## 📝 Content Guidelines

### Exercises
- Keep steps simple and actionable
- Use "you" language (e.g., "Notice your breath")
- Typical duration: 2-10 minutes
- Be specific about what to do physically

### Education
- Start with context/overview
- Break into digestible sections
- Use examples where helpful
- End with key takeaways
- Typical length: 5-15 minutes reading time

---

## 🆘 Troubleshooting

### "App won't load after my changes"

**Most likely: Syntax error**
- Check for missing commas or brackets
- Look at the console for error messages
- Compare your code to the examples above

### "My changes aren't showing"

- Make sure you saved the file
- Try restarting the development server
- Clear app cache if needed

### "I broke something and need to revert"

- Use git to revert to the last working version
- Or restore from backup
- Contact developer if stuck

---

## 💡 Ideas for Content to Add

### New Exercise Categories
- Meditation practices
- Movement/yoga sequences
- Journaling prompts
- Creative expression exercises
- Relationship/connection practices

### New Education Topics
- Set and setting preparation
- Different psychedelic substances
- Neuroscience of psychedelics
- Ethics and harm reduction
- Integration timelines
- Working with challenging experiences

---

## 📧 Questions?

If you need help or want to suggest new features for content management, reach out to the development team.

**Happy editing!** 🎉

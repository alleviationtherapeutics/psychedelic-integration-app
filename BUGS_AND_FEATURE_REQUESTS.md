# Bugs, Changes Needed, and Feature Requests

**Last Updated:** October 20, 2025

---

## Critical Bugs

### 1. VM Server Connectivity Issues
**Priority:** High
**Status:** In Progress

**Issue:**
- Dev server on Oracle Cloud VM (129.80.86.121) not accessible from external networks
- Metro bundler binds to localhost instead of public IP
- Tunnel mode doesn't properly expose the connection URL
- Ports 8081, 8082, 8083 all tested with same connectivity issues

**Symptoms:**
- "Failed to download remote update" error when scanning QR code
- Connection works locally on same network
- Doesn't work on work WiFi, VPN, or cellular data
- Browser navigation to http://129.80.86.121:8082 fails/timeouts

**Attempted Solutions:**
- ✗ Using `--host lan` flag
- ✗ Using `--tunnel` mode
- ✗ Setting EXPO_PACKAGER_HOSTNAME environment variable
- ✗ Setting REACT_NATIVE_PACKAGER_HOSTNAME
- ✗ Multiple port configurations (8081, 8082, 8083)
- ✓ **Working:** Running dev server locally on Windows machine (exp://172.16.103.212:8081)

**Next Steps:**
- Investigate Oracle Cloud network configuration
- Check if additional firewall rules needed beyond iptables
- Consider using ngrok or similar tunneling service
- Test with Expo's EAS Update for production deployments

---

### 2. Device Cache Persisting Old UI Version
**Priority:** Medium
**Status:** Resolved

**Issue:**
- After updating code with new Noesis aesthetic, devices showed old UI
- Cache persisted even after multiple reloads
- Required complete app deletion and rescan to see new changes

**Solution:**
- Close Expo Go completely (swipe away)
- Reopen Expo Go fresh
- Delete project from Expo Go's project list
- Rescan QR code

**Root Cause:**
- Expo Go aggressive caching of JavaScript bundles
- Metro bundler cache not invalidating properly on server

**Prevention:**
- Always close and reopen Expo Go after major code updates
- Consider using `--clear` flag when starting Metro after big changes
- Implement cache-busting mechanisms for production

---

## UI/UX Issues

### 3. SessionPreparationScreen Still Shows Old Aesthetic
**Priority:** High
**Status:** To Do

**Issue:**
- SessionPreparationScreen may still have old color scheme
- Need to verify all screens updated to Noesis aesthetic

**Colors to Apply:**
- Background: #1a1a2e (deep indigo)
- Cards: #252542
- Primary accent: #9d84b7 (lavender)
- Text: #f4f1de (warm cream)
- Success: #6b8e6b
- Warning: #d4a574
- Error: #c17b7b

**Affected Screens to Audit:**
- [x] HomeScreen
- [x] JournalEntryScreen
- [ ] SessionPreparationScreen
- [ ] PracticeScreen
- [ ] EducationScreen
- [ ] ProfileScreen
- [ ] All modal dialogs
- [ ] All form inputs

---

### 4. Keyboard Overlap on Android
**Priority:** Medium
**Status:** To Do

**Issue:**
- Android navigation buttons may overlap with content
- SafeAreaProvider added but needs testing on multiple devices

**Test Cases:**
- [ ] Test on phones with physical buttons
- [ ] Test on phones with gesture navigation
- [ ] Test on phones with on-screen navigation bar
- [ ] Test text input fields at bottom of screen
- [ ] Test in landscape mode

---

## Feature Requests

### 5. Easy Sharing for Testers
**Priority:** High
**Status:** To Do

**Request:**
- Simple way to share app with friends/testers
- QR code that works from anywhere
- Instructions for first-time users

**Options to Explore:**
1. **Expo EAS Update**
   - Host builds on Expo servers
   - Simple URL to share
   - Automatic updates

2. **TestFlight (iOS) / Internal Testing (Android)**
   - Proper beta testing infrastructure
   - More professional distribution

3. **ngrok or CloudFlare Tunnel**
   - Tunnel local dev server
   - Public URL for development testing

4. **Build APK/IPA**
   - Standalone app files
   - Can distribute directly
   - No Expo Go required

**Deliverables:**
- [ ] Choose distribution method
- [ ] Write tester onboarding guide
- [ ] Create QR code/link that works reliably
- [ ] Document "How to Share" process

---

### 6. Figma Design System Implementation
**Priority:** Medium
**Status:** In Progress

**Request:**
- Complete Figma design files for UX iteration
- Component library for designers
- Design tokens file

**Deliverables:**
- [x] FIGMA_DESIGN_SYSTEM.md created
- [x] figma-starter-kit.json created
- [x] HOW_TO_USE_FIGMA_STARTER.md created
- [x] COMPONENT_REFERENCE.md created
- [ ] Import design tokens into Figma
- [ ] Create component library in Figma
- [ ] Design all screen flows
- [ ] Get user feedback on designs

**Files Created:**
- `/design/figma-starter-kit.json` - Design tokens
- `/design/HOW_TO_USE_FIGMA_STARTER.md` - Setup guide
- `/design/COMPONENT_REFERENCE.md` - Visual reference
- `FIGMA_DESIGN_SYSTEM.md` - Complete specifications

---

### 7. Onboarding Flow
**Priority:** Medium
**Status:** To Do

**Request:**
- First-time user experience
- Explain app features and purpose
- Set user preferences
- Quick tutorial

**Screens Needed:**
1. Welcome screen with app overview
2. Feature highlights (swipeable cards)
3. Permissions requests (if any)
4. Quick tutorial for key features
5. Optional profile setup

---

### 8. Offline Mode Support
**Priority:** Medium
**Status:** To Do

**Request:**
- App should work without internet
- Journal entries saved locally first
- Sync when connection restored

**Requirements:**
- [ ] Local SQLite or AsyncStorage implementation
- [ ] Background sync service
- [ ] Conflict resolution strategy
- [ ] Offline indicator UI
- [ ] Queue for pending uploads

---

### 9. Data Export Feature
**Priority:** Low
**Status:** To Do

**Request:**
- Export journal entries and data
- Multiple formats: PDF, JSON, CSV
- Share or backup data

**Use Cases:**
- User wants to share entries with therapist
- User wants backup of all data
- User wants to analyze data in other tools
- User switching to different app

---

### 10. Push Notifications for Practice Reminders
**Priority:** Low
**Status:** To Do

**Request:**
- Remind users to do breathwork/meditation
- Customizable reminder schedule
- Gentle, non-intrusive notifications

**Requirements:**
- [ ] Push notification infrastructure
- [ ] User preference settings
- [ ] Notification scheduling logic
- [ ] Opt-in/opt-out flow

---

## Technical Debt

### 11. TypeScript Configuration Updates
**Priority:** Low
**Status:** Done

**Issue:**
- tsconfig.json#include property updated during recent changes
- Need to verify all TypeScript paths working correctly

**Status:**
- PM2 logs show "TypeScript: The tsconfig.json#include property has been updated"
- Need to test that all imports resolve correctly

---

### 12. Git Repository Cleanup
**Priority:** Low
**Status:** To Do

**Issue:**
- Many untracked files in git status
- Documentation files should be committed
- .env file should be in .gitignore (security risk)
- Large binary files (PDFs) should not be in repo

**Files to Review:**
```
Untracked:
- .env (should be in .gitignore!)
- All *.md documentation files (should commit)
- design/ folder (should commit)
- android/ folder (check if needed)
- training-data/ (probably should not commit)
- IFS-resources/ (decide if needed)
- ssh-key-2025-10-17.key.pub (should NOT commit)
- All PDF files (use Git LFS or external storage)
```

**Action Items:**
- [ ] Update .gitignore
- [ ] Remove sensitive files from tracking
- [ ] Commit documentation
- [ ] Set up Git LFS for large files
- [ ] Clean up unnecessary files

---

### 13. PM2 Process Management
**Priority:** Low
**Status:** Needs Review

**Issue:**
- PM2 kept restarting process even after kill commands
- Multiple expo processes running simultaneously
- Port conflicts from orphaned processes

**Observations:**
- Process has restarted 438+ times (very high)
- start-expo.sh being managed by PM2
- Some processes hard to kill

**Recommendations:**
- [ ] Review PM2 configuration
- [ ] Set max restart limit
- [ ] Add exponential backoff for restarts
- [ ] Improve error handling in start script
- [ ] Add health check endpoint

---

## Infrastructure & DevOps

### 14. Oracle Cloud VM Configuration
**Priority:** High
**Status:** Needs Investigation

**Current Setup:**
- Ubuntu VM on Oracle Cloud
- Public IP: 129.80.86.121
- Ports opened: 8081, 8082, 8083
- PM2 managing expo-server
- SSH access configured

**Issues:**
- Metro bundler not accessible from external networks
- iptables rules configured but connections still fail
- May need Oracle Cloud security list updates
- May need VCN (Virtual Cloud Network) configuration

**To Investigate:**
- [ ] Oracle Cloud security lists
- [ ] VCN ingress rules
- [ ] Subnet configuration
- [ ] Network security groups
- [ ] Consider using Oracle Cloud load balancer

---

### 15. Development Environment Setup
**Priority:** Medium
**Status:** Partially Documented

**Needed:**
- Complete setup guide for new developers
- Environment variable documentation
- Database setup instructions
- Supabase configuration guide

**Files Exist:**
- VM_SETUP_GUIDE.md
- ORACLE_CLOUD_SETUP.md
- DEPLOYMENT_GUIDE.md

**Still Needed:**
- [ ] Local development setup guide
- [ ] Environment variables reference
- [ ] Database schema documentation
- [ ] API endpoint documentation

---

## Testing & Quality Assurance

### 16. Testing Strategy
**Priority:** Medium
**Status:** To Do

**Needed:**
- Unit tests for core functionality
- Integration tests for Supabase
- E2E tests for critical flows
- Performance testing

**Current Status:**
- No automated tests identified
- Manual testing only

**Recommendations:**
- [ ] Set up Jest for unit tests
- [ ] Set up Detox for E2E tests
- [ ] Add test scripts to package.json
- [ ] Set up CI/CD for automated testing

---

### 17. Cross-Platform Testing
**Priority:** High
**Status:** To Do

**Needed:**
- Test on iOS devices (currently only Android tested)
- Test on various Android versions
- Test on tablets
- Test on different screen sizes

**Test Matrix:**
- [ ] iOS 15+ (iPhone SE, iPhone 12, iPhone 14 Pro)
- [ ] Android 11+ (various manufacturers)
- [ ] iPad
- [ ] Android tablets
- [ ] Landscape mode on all devices

---

## Performance Optimization

### 18. App Performance Audit
**Priority:** Low
**Status:** To Do

**Areas to Review:**
- Initial load time
- Screen transition animations
- Database query performance
- Image loading/caching
- Memory usage

**Tools to Use:**
- React Native Performance Monitor
- Flipper for debugging
- Xcode Instruments (iOS)
- Android Profiler

---

### 19. Bundle Size Optimization
**Priority:** Low
**Status:** To Do

**Review:**
- Analyze bundle composition
- Remove unused dependencies
- Optimize images
- Implement code splitting if needed

---

## Documentation

### 20. User Documentation
**Priority:** Medium
**Status:** Partial

**Existing Docs:**
- TEST_ACCESS.md
- SHARE_WITH_TESTERS.md
- Multiple implementation guides

**Needed:**
- [ ] User guide for app features
- [ ] FAQ document
- [ ] Troubleshooting guide
- [ ] Privacy policy
- [ ] Terms of service

---

### 21. Developer Documentation
**Priority:** Low
**Status:** Partial

**Needed:**
- [ ] Architecture overview
- [ ] Component documentation
- [ ] API documentation
- [ ] State management guide
- [ ] Database schema docs
- [ ] Contribution guidelines

---

## Security & Privacy

### 22. Security Audit
**Priority:** High
**Status:** To Do

**Items to Review:**
- [ ] .env file not in .gitignore (CRITICAL)
- [ ] SSH key in untracked files (CRITICAL)
- [ ] API keys exposure
- [ ] Authentication implementation
- [ ] Data encryption at rest
- [ ] Secure data transmission
- [ ] Input validation
- [ ] SQL injection prevention

---

### 23. Privacy Compliance
**Priority:** High
**Status:** To Do

**Required:**
- [ ] Privacy policy
- [ ] Terms of service
- [ ] Data collection disclosure
- [ ] GDPR compliance (if applicable)
- [ ] HIPAA considerations (mental health data)
- [ ] User data deletion mechanism

---

## Future Enhancements

### 24. AI Integration for Insights
**Priority:** Low
**Status:** Idea

**Concept:**
- Use Claude API (already have key) to analyze journal entries
- Provide insights and patterns
- Suggest integration practices
- Track emotional progress

**Considerations:**
- User consent for AI analysis
- Privacy concerns
- Cost management
- Accuracy and liability

---

### 25. Community Features
**Priority:** Low
**Status:** Idea

**Concept:**
- Connect users for peer support
- Share anonymous insights
- Integration practice groups
- Moderated forums

**Considerations:**
- Moderation requirements
- Privacy and anonymity
- Legal liability
- Platform maintenance

---

### 26. Integration with Wearables
**Priority:** Low
**Status:** Idea

**Concept:**
- Track HRV (heart rate variability)
- Monitor during breathwork
- Sleep quality tracking
- Activity levels

**Devices:**
- Apple Watch
- Fitbit
- Oura Ring
- Whoop

---

### 27. AI Guidance in Set Your Intention Screen
**Priority:** High
**Status:** To Do

**Request:**
- Add AI-powered guidance to help users formulate meaningful intentions
- Provide examples and prompts based on session type
- Offer philosophical/therapeutic frameworks
- Help users articulate what they're seeking

**Implementation Ideas:**
- Use Claude API to generate personalized prompts
- Suggest intention templates based on user's journal history
- Offer reflection questions to clarify intentions
- Provide gentle guidance without being prescriptive

**Examples:**
- "What are you hoping to learn about yourself?"
- "What relationship or pattern are you exploring?"
- "What question are you bringing to this experience?"

**Considerations:**
- Keep guidance optional (user can skip)
- Maintain user agency and choice
- Balance structure with openness
- Privacy: don't store raw intentions unless user wants to

---

### 28. AI Guidance for Nervous System & Parts Check-In
**Priority:** High
**Status:** To Do

**Request:**
- Similar AI guidance for nervous system state assessment
- Help users identify which parts (IFS) are present
- Guide somatic awareness and body scanning
- Provide psychoeducation about polyvagal states

**Nervous System Check-In Features:**
- Simple visual scale (dorsal vagal → sympathetic → ventral vagal)
- Body sensation mapping
- Emotional state tracking
- AI prompts: "Where do you notice tension?" "What's your energy level?"

**Parts Check-In Features:**
- List common protector/manager/exile archetypes
- Help identify which parts are activated
- Suggest grounding for overwhelmed parts
- Connect to IFS resources in app

**Integration:**
- Use polyvagal mapping AI from other project
- Reference IFS resources folder
- Combine somatic + psychological frameworks

---

### 29. Complete Session Day Checklist
**Priority:** High
**Status:** To Do

**Issue:**
- Session day checklist screen currently has no items
- Need to populate with preparation steps

**Checklist Items to Add:**

**Physical Preparation:**
- [ ] Fasted for 4-6 hours (if recommended)
- [ ] Hydrated well
- [ ] Comfortable clothing prepared
- [ ] Music playlist ready
- [ ] Eye mask/blindfold available
- [ ] Blanket and comfort items set up
- [ ] Phone on airplane mode

**Safety & Support:**
- [ ] Sitter/guide confirmed and briefed
- [ ] Emergency contacts accessible
- [ ] Trip report template ready
- [ ] Integration journal prepared
- [ ] Safe, comfortable space prepared

**Mental/Emotional Preparation:**
- [ ] Intention set and written down
- [ ] Parts check-in completed
- [ ] Nervous system regulation practice
- [ ] Meditation or grounding exercise
- [ ] Surrender practice
- [ ] Let go of expectations

**Practical Logistics:**
- [ ] Cleared schedule for 24-48 hours
- [ ] No obligations or commitments
- [ ] Transportation arranged (if needed)
- [ ] Dose measured and ready
- [ ] Water and light snacks available

**Features:**
- Make items customizable per user
- Allow adding custom checklist items
- Track completion status
- Send gentle reminder notifications
- Save checklist templates for different substances/settings

---

### 30. Contextual Tips & Help System
**Priority:** Medium
**Status:** Idea - Needs Design

**Request:**
- Add contextual tips throughout the app
- Help users understand features and concepts
- Educational moments without overwhelming

**Implementation Options:**

**Option 1: Tooltip Bubbles**
- Small info icons (ℹ️) next to features
- Tap to see explanation
- Dismissible, but can revisit
- Example: Next to "Parts Check-In" → explain IFS basics

**Option 2: Pop-up Tips on First Use**
- Show tip the first time user encounters feature
- "Did you know?" format
- Can mark as "Don't show again"
- Progress indicator (Tip 1 of 5)

**Option 3: Help Center / Guide Section**
- Dedicated section in app
- Searchable help articles
- Video walkthroughs
- FAQ section

**Option 4: Progressive Disclosure**
- Show basic features first
- Unlock advanced features after user is comfortable
- Gentle onboarding over time
- Tips appear naturally as user explores

**Recommended Approach:**
- Combine Options 1 & 4
- Tooltips for quick reference
- Progressive disclosure for complexity
- Optional "Guide Mode" that shows more tips

**Content Needed:**
- Write tip content for each screen
- Create visual indicators
- Design non-intrusive UI
- Test with users for helpfulness vs. annoyance

---

### 31. "Huxley" - AI Guide Character
**Priority:** Medium
**Status:** Concept - Needs Exploration

**Concept:**
- Introduce "Huxley" as a wise, gentle AI guide throughout the app
- Named after Aldous Huxley (author of "The Doors of Perception")
- Provides guidance, education, and companionship

**Character Design Questions:**

**Personality:**
- Wise but not preachy
- Supportive but not parental
- Curious and philosophical
- Respectful of user's autonomy
- Grounded in science and tradition

**Interaction Style:**
- Chat interface or ambient presence?
- Always available or appears at specific moments?
- Text-only or with avatar/voice?
- Formal or casual tone?

**Use Cases:**
- Onboarding: "Welcome! I'm Huxley, your integration companion..."
- Preparation: "Let's check in with your nervous system..."
- Post-session: "How are you feeling? Want to talk about your experience?"
- Daily check-ins: "Morning! How did you sleep?"
- Education: "Want to learn about set and setting?"
- Crisis support: "It sounds like you're having a difficult time..."

**Technical Implementation:**
- Claude API for responses
- Conversation history and context
- Personality prompt engineering
- Cost considerations (API usage)

**Design Considerations:**
- Avatar design (illustration? abstract? none?)
- Chat UI vs. inline guidance
- Persistent vs. summonable
- User preference to enable/disable

**Concerns to Address:**
- Could feel gimmicky or childish
- Privacy: users may not want AI analyzing everything
- Cost of API calls for chat
- Avoid creating dependency on AI companion
- Some users prefer human-only interaction

**Alternative Approach:**
- Instead of character, just call it "AI Guide" or "Integration Assistant"
- Less anthropomorphization
- More tool-like, less companion-like
- User activates when they want guidance

**Recommendation:**
- Start simple: Optional AI guidance, not a persistent character
- Test user response before fully developing "Huxley" persona
- Focus on utility over personality initially
- Can always add more character later if users want it

---

### 32. Improved Artwork & Visual Design
**Priority:** Medium
**Status:** To Do

**Current State:**
- Noesis color scheme implemented
- Basic UI components styled
- Minimal artwork/illustrations

**Needs:**

**Illustrations & Icons:**
- [ ] Custom icon set (replace generic icons)
- [ ] Illustration for each screen's empty state
- [ ] Artwork for practice exercises (breathwork, meditation)
- [ ] Visual guides for body scanning
- [ ] Infographics for polyvagal states
- [ ] IFS parts wheel visualization
- [ ] Session preparation flow diagram

**Photography/Imagery:**
- [ ] Hero images for main screens
- [ ] Nature imagery for calming moments
- [ ] Abstract visuals for meditation/breathwork
- [ ] Consider user-uploadable images for journal entries

**Animations:**
- [ ] Breathing guide animations (expanding/contracting circle)
- [ ] Smooth transitions between screens
- [ ] Loading states with meaningful feedback
- [ ] Celebration animations for milestones
- [ ] Subtle micro-interactions

**Visual Hierarchy:**
- [ ] Improve typography scale and contrast
- [ ] Better use of whitespace
- [ ] Clearer information architecture
- [ ] Visual grouping of related elements

**Resources:**
- Hire illustrator or use tools like Midjourney/DALL-E
- Stock photo services (Unsplash, Pexels)
- Animation libraries (Lottie, React Native Reanimated)
- Work with Figma designs first

---

### 33. Enhanced UX Layouts
**Priority:** Medium
**Status:** To Do

**Current State:**
- Basic layouts functional
- Some screens feel cluttered
- Navigation could be smoother

**Improvements Needed:**

**Screen-by-Screen Review:**
- [ ] Home: Better information hierarchy, featured actions
- [ ] Journal Entry: Multi-step form vs. single long form?
- [ ] Session Prep: Visual checklist, progress indicator
- [ ] Practice: Immersive, distraction-free layout
- [ ] Education: Better content organization, search
- [ ] Profile: Clearer settings organization

**Navigation:**
- [ ] Review bottom tab bar efficiency
- [ ] Consider adding hamburger menu for secondary actions
- [ ] Improve back navigation consistency
- [ ] Add breadcrumbs for deep navigation

**Forms & Input:**
- [ ] Better form field design
- [ ] Clear error states and validation
- [ ] Progress indicators for multi-step processes
- [ ] Smart defaults and suggestions

**Accessibility:**
- [ ] Increase touch target sizes
- [ ] Better color contrast for text
- [ ] Screen reader support
- [ ] Text scaling support
- [ ] Dark mode optimization

**Responsive Design:**
- [ ] Optimize for different screen sizes
- [ ] Tablet layouts
- [ ] Landscape mode
- [ ] Handle keyboard appearance gracefully

**Process:**
1. Complete Figma designs for all screens
2. User testing with mockups
3. Iterate based on feedback
4. Implement systematically

---

### 34. Integrate Polyvagal Mapping AI
**Priority:** High
**Status:** To Do

**Request:**
- Import/adapt polyvagal mapping AI from other project
- Use for nervous system state assessment
- Provide real-time feedback and guidance

**Polyvagal States:**
- **Dorsal Vagal** (shutdown, freeze, dissociation)
- **Sympathetic** (fight-or-flight, activation, anxiety)
- **Ventral Vagal** (safe and social, connected, regulated)

**Features to Implement:**

**State Assessment:**
- Simple questions about current state
- Body sensation mapping
- Emotional indicators
- Behavioral cues
- AI analyzes and identifies likely state

**Visual Representation:**
- Color-coded state indicator
- Polyvagal ladder diagram
- State transition history over time
- Patterns and triggers identification

**Guidance Based on State:**
- **If Dorsal Vagal**: Gentle movement, grounding, presence
- **If Sympathetic**: Breathwork, discharge, expression
- **If Ventral Vagal**: Celebration, connection, gratitude

**Integration Points:**
- Pre-session preparation (check state before journey)
- Post-session integration (track state changes)
- Daily check-ins
- Crisis moments (recognize dysregulation)
- Practice selection (choose appropriate exercises)

**Technical Implementation:**
- Port AI model from other project
- Create assessment questionnaire
- Design visualization components
- Build recommendation engine

**Resources Needed:**
- Access to polyvagal mapping code
- Deb Dana's polyvagal resources
- Psychoeducation content
- Consultation with somatic practitioners

---

### 35. Create Philosophical "Talkthroughs"
**Priority:** Medium
**Status:** Idea

**Concept:**
- Guided audio/text experiences exploring philosophical themes
- Blend wisdom traditions with modern psychedelic insights
- Not just meditation, but contemplative inquiry

**Potential Topics:**

**Existential Themes:**
- "Who Am I?" - Identity and self-inquiry
- "What is Real?" - Questioning consensus reality
- "Meaning and Purpose" - Finding personal significance
- "Death and Impermanence" - Memento mori
- "Freedom and Responsibility" - Existential choice

**Mystical/Spiritual:**
- "The Nature of Consciousness" - Hard problem, subjective experience
- "Unity and Separation" - Exploring non-dual awareness
- "The Sacred in the Ordinary" - Finding meaning in daily life
- "Surrender and Control" - Letting go practices
- "Mystery and Not-Knowing" - Embracing uncertainty

**Psychological Integration:**
- "Shadow Work" - Exploring rejected parts of self
- "The Inner Family" - IFS perspective
- "Healing Trauma" - Integration and wholeness
- "Authenticity" - Living aligned with values
- "Relationship with Self" - Self-compassion and acceptance

**Wisdom Traditions:**
- Buddhist concepts (emptiness, suffering, compassion)
- Stoic philosophy (amor fati, memento mori)
- Taoism (wu wei, flow, paradox)
- Indigenous wisdom (interconnection, reciprocity)
- Perennial philosophy (common threads)

**Format Options:**
1. **Audio Guided Inquiry** (10-20 minutes)
   - Voice guiding through contemplation
   - Pauses for reflection
   - Questions without answers

2. **Interactive Text Journey**
   - Choose-your-own-exploration
   - Questions branch based on responses
   - Blend AI responses with curated wisdom

3. **Hybrid: Text + Audio**
   - Read core concepts
   - Listen to guided reflection
   - Journal prompts afterward

**Sources to Draw From:**
- Alan Watts lectures
- Ram Dass teachings
- Terence McKenna talks
- Aldous Huxley writings
- Carl Jung's work
- Stanislav Grof's cartography

**Implementation:**
- Partner with philosophers/teachers?
- Use AI to synthesize teachings?
- Record original content?
- License existing audio?

---

### 36. Integrate "After the Ceremony" Book Content
**Priority:** High
**Status:** To Do

**Request:**
- Incorporate wisdom and practices from "After the Ceremony" book
- Provide structured integration frameworks
- Offer evidence-based practices

**Content to Extract:**

**Integration Frameworks:**
- Timeline for integration (hours, days, weeks, months)
- Common challenges and how to navigate them
- Red flags and when to seek support
- Integration practices for different timeframes

**Practices:**
- Somatic integration exercises
- Journaling prompts specific to integration
- Breathwork for processing
- Movement practices
- Creative expression methods

**Psychoeducation:**
- What is integration?
- Neuroscience of integration
- Common experiences post-ceremony
- Spiritual emergency vs. psychotic break
- When to seek professional help

**Community Wisdom:**
- Stories from others' integration journeys
- Common pitfalls and how to avoid them
- Building integration into daily life
- Maintaining insights over time

**Implementation:**
- [ ] Get permission to use book content (copyright!)
- [ ] Extract key frameworks and practices
- [ ] Create in-app chapters or sections
- [ ] Add to Education section
- [ ] Reference in post-session guidance
- [ ] Create practice templates based on book

**Legal Considerations:**
- Reach out to author/publisher for permissions
- May need licensing agreement
- Could partner with author for app endorsement
- Alternatively: summarize principles without direct quotes

---

## Notes

### Commands & Troubleshooting Reference

**SSH Connection:**
```bash
ssh -i ssh-key-2025-10-17.key ubuntu@129.80.86.121
```

**PM2 Commands:**
```bash
pm2 list                    # Show all processes
pm2 logs expo-server        # View logs
pm2 restart expo-server     # Restart
pm2 stop expo-server        # Stop
pm2 delete expo-server      # Remove
pm2 save                    # Save configuration
```

**Generate QR Code:**
```bash
npx qrcode-terminal "exp://IP_ADDRESS:PORT"
```

**Git Commands:**
```bash
git status                  # Check status
git add .                   # Stage all changes
git commit -m "message"     # Commit
git push                    # Push to remote
git pull                    # Pull from remote
git stash                   # Temporarily save changes
```

---

## Acronyms & Terms Reference

- **PM2**: Process Manager 2 (keeps processes running)
- **grep**: Global Regular Expression Print (search tool)
- **ps**: Process Status
- **aux**: All, User-oriented, eXtended (ps flags)
- **sudo**: SuperUser DO (run as administrator)
- **ssh**: Secure Shell (remote connection)
- **VPN**: Virtual Private Network
- **VM**: Virtual Machine
- **API**: Application Programming Interface
- **UI/UX**: User Interface / User Experience
- **CI/CD**: Continuous Integration / Continuous Deployment
- **E2E**: End-to-End (testing)
- **LFS**: Large File Storage (Git)
- **HRV**: Heart Rate Variability

---

## Priority Legend

- **High**: Critical for app functionality or user experience
- **Medium**: Important but not blocking
- **Low**: Nice to have, can be deferred

## Status Legend

- **To Do**: Not started
- **In Progress**: Currently working on
- **Done**: Completed
- **Blocked**: Waiting on external factor
- **Idea**: Future consideration, not committed

---

**Last Review:** October 20, 2025
**Next Review:** TBD

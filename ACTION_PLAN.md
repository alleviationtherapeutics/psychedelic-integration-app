# Psychedelic Integration App - Action Plan & Timeline

**Created:** October 20, 2025
**Status:** Planning Phase

---

## Overview

This action plan prioritizes the 36 items from BUGS_AND_FEATURE_REQUESTS.md into a realistic implementation timeline with clear phases.

---

## Phase 1: Critical Foundation (Weeks 1-4)

**Goal:** Fix critical bugs, establish sharing capability, and complete core screens

### Week 1: Infrastructure & Sharing

**1. Fix VM Server Connectivity (Bug #1)**
- Priority: CRITICAL
- Time: 2-3 days
- Tasks:
  - [ ] Investigate Oracle Cloud VCN configuration
  - [ ] Test ngrok or CloudFlare Tunnel
  - [ ] Document working solution
  - [ ] Alternative: Set up Expo EAS for production builds

**2. Enable Easy Sharing for Testers (Feature #5)**
- Priority: CRITICAL
- Time: 2-3 days
- Tasks:
  - [ ] Choose distribution method (EAS recommended)
  - [ ] Set up build configuration
  - [ ] Create shareable link/QR code
  - [ ] Write tester onboarding guide
  - [ ] Test with 2-3 friends first

**3. Security Audit - Critical Items (Bug #22)**
- Priority: CRITICAL
- Time: 1 day
- Tasks:
  - [ ] Add .env to .gitignore immediately
  - [ ] Remove ssh key from repo
  - [ ] Review exposed API keys
  - [ ] Document secure practices

### Week 2: Complete Session Preparation Flow

**4. Complete Session Day Checklist (Feature #29)**
- Priority: HIGH
- Time: 3-4 days
- Tasks:
  - [ ] Design checklist UI in Figma
  - [ ] Implement checklist data model
  - [ ] Add all preparation items
  - [ ] Make items customizable
  - [ ] Add progress tracking
  - [ ] Test user flow

**5. Update All Screens to Noesis Aesthetic (Bug #3)**
- Priority: HIGH
- Time: 2-3 days
- Tasks:
  - [ ] Audit all screens for old colors
  - [ ] Update SessionPreparationScreen
  - [ ] Update PracticeScreen
  - [ ] Update EducationScreen
  - [ ] Update ProfileScreen
  - [ ] Update all modals and dialogs

### Week 3-4: Core AI Features

**6. AI Guidance in Set Your Intention Screen (Feature #27)**
- Priority: HIGH
- Time: 4-5 days
- Tasks:
  - [ ] Design intention setting UI
  - [ ] Implement Claude API integration
  - [ ] Create prompt templates
  - [ ] Add example intentions
  - [ ] Test with users
  - [ ] Add privacy controls

**7. AI Guidance for Nervous System & Parts Check-In (Feature #28)**
- Priority: HIGH
- Time: 4-5 days
- Tasks:
  - [ ] Design assessment UI
  - [ ] Create questionnaire
  - [ ] Implement polyvagal state logic
  - [ ] Add IFS parts identification
  - [ ] Create visual indicators
  - [ ] Test accuracy with practitioners

---

## Phase 2: Enhanced Integration (Weeks 5-8)

**Goal:** Add polyvagal mapping, improve UX, and integrate book content

### Week 5-6: Polyvagal Integration

**8. Integrate Polyvagal Mapping AI (Feature #34)**
- Priority: HIGH
- Time: 5-7 days
- Tasks:
  - [ ] Port code from other project
  - [ ] Create state assessment component
  - [ ] Design polyvagal ladder visualization
  - [ ] Build recommendation engine
  - [ ] Add to multiple screens
  - [ ] Create tracking over time
  - [ ] User testing

**9. Integrate "After the Ceremony" Book Content (Feature #36)**
- Priority: HIGH
- Time: 4-5 days
- Tasks:
  - [ ] Contact author/publisher for permissions
  - [ ] Extract key frameworks (while awaiting permission)
  - [ ] Create in-app content structure
  - [ ] Add to Education section
  - [ ] Create practice templates
  - [ ] Legal review

### Week 7-8: UX & Visual Improvements

**10. Enhanced UX Layouts (Feature #33)**
- Priority: MEDIUM
- Time: 5-7 days
- Tasks:
  - [ ] Complete Figma designs for all screens
  - [ ] User testing with mockups
  - [ ] Iterate based on feedback
  - [ ] Implement Home screen improvements
  - [ ] Improve Journal Entry form flow
  - [ ] Enhance navigation patterns

**11. Improved Artwork & Visual Design (Feature #32)**
- Priority: MEDIUM
- Time: 5-7 days (ongoing)
- Tasks:
  - [ ] Create/source custom icon set
  - [ ] Design empty state illustrations
  - [ ] Add practice exercise artwork
  - [ ] Create polyvagal infographics
  - [ ] Design IFS parts wheel
  - [ ] Implement breathing animations

---

## Phase 3: Content & Education (Weeks 9-12)

**Goal:** Add educational content, talkthroughs, and help system

### Week 9-10: Philosophical Content

**12. Create Philosophical "Talkthroughs" (Feature #35)**
- Priority: MEDIUM
- Time: 7-10 days
- Tasks:
  - [ ] Choose 5 initial topics
  - [ ] Write/source content for each
  - [ ] Decide on format (audio/text/hybrid)
  - [ ] Record or create interactive versions
  - [ ] Add to app navigation
  - [ ] Get user feedback

**13. Contextual Tips & Help System (Feature #30)**
- Priority: MEDIUM
- Time: 3-4 days
- Tasks:
  - [ ] Design tooltip UI components
  - [ ] Write help content for each feature
  - [ ] Implement progressive disclosure
  - [ ] Add to all major screens
  - [ ] Create dismissal logic
  - [ ] Track which tips users find helpful

### Week 11-12: AI Guide & Onboarding

**14. "Huxley" AI Guide Exploration (Feature #31)**
- Priority: MEDIUM
- Time: 5-7 days
- Tasks:
  - [ ] Design simple AI guidance interface
  - [ ] Create personality prompt
  - [ ] Implement chat or ambient guidance
  - [ ] Test with small user group
  - [ ] Gather feedback on character vs. tool
  - [ ] Iterate based on response

**15. Onboarding Flow (Feature #7)**
- Priority: MEDIUM
- Time: 3-4 days
- Tasks:
  - [ ] Design welcome screens
  - [ ] Create feature highlights
  - [ ] Add tutorial for key features
  - [ ] Implement skip option
  - [ ] Track completion rate
  - [ ] Iterate based on user behavior

---

## Phase 4: Platform & Features (Weeks 13-16)

**Goal:** Offline support, notifications, testing infrastructure

### Week 13-14: Offline & Sync

**16. Offline Mode Support (Feature #8)**
- Priority: MEDIUM
- Time: 7-10 days
- Tasks:
  - [ ] Set up local SQLite database
  - [ ] Implement offline-first architecture
  - [ ] Create sync service
  - [ ] Build conflict resolution
  - [ ] Add offline indicator UI
  - [ ] Test thoroughly

**17. Push Notifications for Practice Reminders (Feature #10)**
- Priority: LOW
- Time: 3-4 days
- Tasks:
  - [ ] Set up push notification infrastructure
  - [ ] Design settings interface
  - [ ] Implement scheduling logic
  - [ ] Create gentle notification copy
  - [ ] Add opt-in flow
  - [ ] Test across devices

### Week 15-16: Testing & Quality

**18. Cross-Platform Testing (Bug #17)**
- Priority: HIGH
- Time: 5-7 days
- Tasks:
  - [ ] Test on iOS devices
  - [ ] Test on various Android versions
  - [ ] Test on tablets
  - [ ] Fix keyboard overlap issues
  - [ ] Test different screen sizes
  - [ ] Document device compatibility

**19. Testing Strategy Implementation (Bug #16)**
- Priority: MEDIUM
- Time: 4-5 days
- Tasks:
  - [ ] Set up Jest for unit tests
  - [ ] Write tests for core functions
  - [ ] Set up Detox for E2E tests
  - [ ] Create test scripts
  - [ ] Set up CI/CD pipeline
  - [ ] Document testing procedures

---

## Phase 5: Polish & Advanced Features (Weeks 17-20)

**Goal:** Data export, performance, documentation, advanced features

### Week 17: Data & Performance

**20. Data Export Feature (Feature #9)**
- Priority: LOW
- Time: 3-4 days
- Tasks:
  - [ ] Design export UI
  - [ ] Implement PDF generation
  - [ ] Add JSON export
  - [ ] Add CSV export
  - [ ] Create sharing mechanism
  - [ ] Test all formats

**21. App Performance Audit (Bug #18)**
- Priority: LOW
- Time: 2-3 days
- Tasks:
  - [ ] Profile initial load time
  - [ ] Optimize screen transitions
  - [ ] Review database queries
  - [ ] Optimize image loading
  - [ ] Reduce bundle size
  - [ ] Document findings

### Week 18-19: Documentation & Repository

**22. Git Repository Cleanup (Bug #12)**
- Priority: MEDIUM
- Time: 1-2 days
- Tasks:
  - [ ] Update .gitignore properly
  - [ ] Remove sensitive files
  - [ ] Commit documentation files
  - [ ] Set up Git LFS for large files
  - [ ] Clean up unnecessary files
  - [ ] Organize folder structure

**23. User Documentation (Bug #20)**
- Priority: MEDIUM
- Time: 3-4 days
- Tasks:
  - [ ] Write user guide for features
  - [ ] Create FAQ document
  - [ ] Write troubleshooting guide
  - [ ] Draft privacy policy
  - [ ] Draft terms of service
  - [ ] Create video tutorials

**24. Developer Documentation (Bug #21)**
- Priority: LOW
- Time: 3-4 days
- Tasks:
  - [ ] Write architecture overview
  - [ ] Document components
  - [ ] Create API documentation
  - [ ] Document state management
  - [ ] Create database schema docs
  - [ ] Write contribution guidelines

### Week 20: Advanced Features

**25. Figma Design System Implementation (Feature #6)**
- Priority: MEDIUM
- Time: 3-5 days
- Tasks:
  - [ ] Import tokens into Figma
  - [ ] Create component library
  - [ ] Design all screen flows
  - [ ] Get user feedback
  - [ ] Create design-to-dev handoff docs

---

## Phase 6: Future Enhancements (Weeks 21+)

**Goal:** Community, wearables, advanced AI features

### Later Priorities

**26. AI Integration for Journal Insights (Feature #24)**
- Priority: LOW
- Status: Future consideration
- Dependencies: User consent, cost analysis

**27. Community Features (Feature #25)**
- Priority: LOW
- Status: Future consideration
- Dependencies: Moderation strategy, legal review

**28. Integration with Wearables (Feature #26)**
- Priority: LOW
- Status: Future consideration
- Dependencies: API access, device partnerships

---

## Ongoing Tasks (Throughout All Phases)

### Continuous Activities

**Development Environment Maintenance**
- Keep dependencies updated
- Monitor performance
- Fix bugs as reported
- Respond to user feedback

**PM2 Process Management Review**
- Monitor restart counts
- Optimize configurations
- Improve error handling
- Document operational procedures

**Security Monitoring**
- Regular security audits
- Keep API keys secure
- Monitor for vulnerabilities
- Update dependencies for security patches

**User Feedback Loop**
- Weekly check-ins with testers
- Track feature requests
- Monitor app analytics
- Iterate based on usage patterns

---

## Resource Requirements

### Technical Resources

**Development Time:**
- Estimated 20 weeks for Phases 1-5
- 1 full-time developer
- Or 2 part-time developers (40 hours/week total)

**External Services:**
- Claude API (already have key)
- Expo EAS ($29/month for team)
- Supabase (current plan)
- Optional: CloudFlare Tunnel (free tier)
- Optional: Figma Professional ($12/month)

**Design Resources:**
- Figma for design work (ongoing)
- Illustration/icon creation (budget $500-2000)
- Optional: Hire designer for custom artwork

### Content Resources

**Permissions Needed:**
- "After the Ceremony" book - contact author
- Philosophical texts - check public domain
- Audio content - licensing if needed

**Content Creation:**
- Write talkthroughs and guides
- Record audio if needed
- Create educational content
- Develop practice templates

---

## Success Metrics

### Phase 1 Success Criteria
- [ ] 10+ testers can access app easily
- [ ] All screens use Noesis aesthetic
- [ ] Session preparation flow complete
- [ ] Basic AI guidance working

### Phase 2 Success Criteria
- [ ] Polyvagal mapping integrated
- [ ] UX improvements implemented
- [ ] Book content added (with permission)
- [ ] Visual design significantly improved

### Phase 3 Success Criteria
- [ ] 5+ talkthroughs available
- [ ] Help system implemented
- [ ] Onboarding flow complete
- [ ] User retention >50% after 1 week

### Phase 4 Success Criteria
- [ ] App works offline
- [ ] Tested on 10+ devices
- [ ] Test coverage >50%
- [ ] Notifications working

### Phase 5 Success Criteria
- [ ] Complete documentation
- [ ] Data export working
- [ ] Performance optimized
- [ ] Ready for wider beta

---

## Risk Management

### High Risk Items

**1. VM Connectivity Issues**
- Risk: Can't share with testers
- Mitigation: Move to EAS immediately if VM doesn't work
- Backup: Host on Windows machine temporarily

**2. Book Content Permissions**
- Risk: Can't get permission to use content
- Mitigation: Summarize principles instead of direct quotes
- Backup: Create original content inspired by book

**3. AI API Costs**
- Risk: Usage costs too high
- Mitigation: Implement caching, limit calls
- Backup: Reduce AI features, use pre-written content

**4. Scope Creep**
- Risk: Taking on too many features
- Mitigation: Stick to this plan, defer new ideas
- Backup: Focus on Phase 1-2 only initially

### Medium Risk Items

**1. User Adoption**
- Risk: Friends don't use app consistently
- Mitigation: Gather feedback early, iterate quickly
- Strategy: Start with 3-5 dedicated testers

**2. Technical Complexity**
- Risk: Polyvagal AI integration harder than expected
- Mitigation: Break into smaller pieces, get help if needed
- Backup: Simplify to manual state selection

**3. Design Quality**
- Risk: Visual design not professional enough
- Mitigation: Use Figma designs, get feedback
- Backup: Hire freelance designer for key screens

---

## Decision Points

### Key Decisions Needed

**By End of Week 1:**
- [ ] VM or EAS for distribution?
- [ ] Which sharing method to use?
- [ ] Budget for external design work?

**By End of Week 4:**
- [ ] Keep "Huxley" character concept or simplify?
- [ ] Audio or text for talkthroughs?
- [ ] Which 5 topics for initial talkthroughs?

**By End of Week 8:**
- [ ] Proceed with offline mode or defer?
- [ ] Community features needed now or later?
- [ ] Wearable integration priority?

**By End of Week 12:**
- [ ] Ready for wider beta testing?
- [ ] Need professional therapist consultation?
- [ ] Consider partnerships or funding?

---

## Weekly Rhythm

### Recommended Weekly Schedule

**Monday:**
- Review last week's progress
- Prioritize this week's tasks
- Address any blockers

**Tuesday-Thursday:**
- Deep work on implementation
- Daily standup (if team)
- Code reviews

**Friday:**
- Testing and bug fixes
- Documentation updates
- Plan next week
- User feedback review

**Weekend:**
- Optional: Design work
- Optional: Content creation
- Rest and recharge

---

## Milestone Celebrations

### Celebrate Progress!

**Phase 1 Complete:**
- 🎉 App is shareable! First 10 testers onboarded!

**Phase 2 Complete:**
- 🎉 Polyvagal mapping working! UX significantly improved!

**Phase 3 Complete:**
- 🎉 First talkthrough published! Users finding value!

**Phase 4 Complete:**
- 🎉 App works offline! Tested on many devices!

**Phase 5 Complete:**
- 🎉 Ready for public beta! Documentation complete!

---

## Next Steps (This Week)

### Immediate Actions

**Today:**
1. [ ] Review this action plan
2. [ ] Commit BUGS_AND_FEATURE_REQUESTS.md to git
3. [ ] Commit ACTION_PLAN.md to git
4. [ ] Decide on VM vs. EAS for sharing

**This Week:**
1. [ ] Fix VM connectivity OR set up EAS
2. [ ] Get 3 friends ready to test
3. [ ] Complete security audit (gitignore .env)
4. [ ] Start Week 1 tasks

**By Next Sunday:**
- [ ] App accessible to testers
- [ ] Onboarding guide written
- [ ] Security issues resolved
- [ ] Week 2 tasks planned

---

## Notes & Observations

### Lessons Learned

**What's Working:**
- Noesis aesthetic looks great
- Claude API integration straightforward
- Supabase working well
- PM2 keeps server running

**What Needs Improvement:**
- VM networking complex
- Cache invalidation tricky
- Need better testing strategy
- Documentation should be ongoing

**Keep in Mind:**
- This is a 5-month plan (20 weeks)
- Adjust timeline based on actual progress
- Some features may take longer than estimated
- User feedback will change priorities
- It's okay to defer or cut features

---

**Created:** October 20, 2025
**Next Review:** End of Phase 1 (Week 4)
**Owner:** TBD

# activity-log
Create your activity and log, visualize easily

TODO list:
- [ ] Setup tech:
  - [ ] React
  - [ ] React router - Framework mode
  - [ ] Next.js
  - [ ] Firebase
- [ ] Impl feature: Create new activity types with new customized fields
- [ ] Impl feature: Create new activity logs
- [ ] Impl feature: View logs as table
- [ ] Impl feature: Sort table by fields
- [ ] Impl feature: Separate logs by months, weeks
- [ ] Impl feature: Login form

Fancy TODO list:
- [ ] Impl feature: Apply AI grammar check into text boxes
- [ ] Impl feature: Show analytic chart
  - [ ] Save chart parameter, create dashboard
- [ ] Impl feature: Analyze emotion based on input text, using tensorflow
- [ ] Idea: using AI for personalize experience
- [ ] Idea: build experience for mobile

## Emulator Data Management

**Seed Data (committed to git):**
- Location: `emulator-seed-data/`
- Contains initial data for development
- Loaded when starting the emulator

**Runtime Data (not committed):**
- Location: `emulator-data/`
- Persists between emulator sessions
- Auto-saved when stopping the emulator

**To update seed data:**
1. Run the emulator and add/modify data
2. Run `yarn backend:seed` to export runtime data to seed data
3. Commit the updated `emulator-seed-data/` directory
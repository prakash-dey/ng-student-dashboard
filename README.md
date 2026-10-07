# NavGurukul Student Admission Portal

The app students use to apply to NavGurukul: learn about the programme, register, take the screening test, book
and attend two interviews, and receive their offer. It is built for phones first and works in English, Hindi and
Marathi.

## Run it

```bash
npm install
npm run dev        # open http://localhost:5173
npm run build      # production build in dist/
```

## Architecture

```mermaid
flowchart TD
    Student["Student's phone or computer"] --> Shell

    subgraph App["Student Admission Portal"]
        Shell["App shell<br/><i>src/main.tsx, src/app.tsx</i><br/>picks the phone or PC layout"]
        Logic["Journey logic<br/><i>src/logic/app.ts</i><br/>where the student is, what happens next"]
        Screens["Screen builders<br/><i>src/logic/landing, src/logic/journey</i><br/>what each screen shows"]
        UI["Screens<br/><i>src/ui</i><br/>what the student sees and taps"]
        Copy["Text in 3 languages<br/><i>src/i18n</i>"]
        Data["Lists: states, districts, campuses<br/><i>src/logic/data</i>"]
        Look["Look and feel: colours, fonts, artwork<br/><i>src/styles, public/media</i>"]

        Shell --> Logic
        Logic --> Screens
        Copy --> Screens
        Data --> Screens
        Screens --> UI
        Look --> UI
        UI -- "taps and answers" --> Logic
    end

    Offline["Offline copy of the app<br/>opens without internet after the first visit"] -.-> Shell
    API["NavGurukul Admission API<br/>registration, test, interviews, results"] -. "to be connected" .-> Logic
```

version: 1
services:
  - type: web
    name: PREM-PROJECT-BOT  # आपके bot का नाम (यहां पर बदलाव करें)
    env: node
    plan: starter  # आप चाहें तो इसे बदल सकते हैं
    buildCommand: npm install
    startCommand: npm start
    envVars:
      # यहां अन्य आवश्यक environment variables जोड़ें
    autoDeploy: true
    regions:
      - us  # आपके bot के लिए क्षेत्र सेट करें, इसे अपने आवश्यकता के अनुसार बदलें

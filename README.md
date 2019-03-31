# BonBon
Google extension to help you become more productive and healthy.<br><br>
Youtube: https://www.youtube.com/watch?v=JAGkzgs7_d0 <br><br>
NOTE: The TimeMe API is not included here. You can find the scource code here: https://github.com/jasonzissman/TimeMe.js/<br>
This project was built in 10 hours and thus, there are A LOT of bad practices. It is not efficient and could be written a lot better.

## Inspiration
Everybody procrastinates. The clock never slows down for anyone and by the minute, you lose precious sleep time, study time, etc. I wanted to create a centralized google extension to help people be alert of their deadlines so that their work will always reflect their highest potentials.

## What it does
It can save links with the position you left off it. You can create alarms to alert yourself when deadlines are due. Moreover, there is a checklist feature to visually guide you through your hectic schedule. Lastly, there is an analytics center where you can see your time distribution for each website you have been on.

**Special feature:** You can set alarms to force websites in your saved section to appear-- a great way for you to _ actually _ do your work. **All** of the data in this extension are **saved** when you close google chrome.

## How I built it
This is built using HTML,CSS,JS.
The APIs used is the chrome API and TimeMe API.

## Challenges I ran into
It was difficult to manage all of the timer intervals running in the background. Some threads were out of line with another and this forced me to place delays so that appropriate measures were placed.

## Accomplishments that I'm proud of
The extension is something I would use. Moreover, it hit most of the essential parts that I wanted the extension to have.

## What I learned
I learned how to use chrome APIs and build google extensions.

## What's next for BonBon
Have a reward system for users who are productive. I can use the "time spent on page" data and use it to calculate the percent that the user has been productive to determine his/her productivity.

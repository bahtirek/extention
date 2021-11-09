//token - to share the reports
//id auto-incremented on backend

[
    {
        id: Number,
        project: String,
        token: String,
        xPath: [ String ],
        jiraUrl: safeString,
        jiraTicket: String,
        jiraTitle: String,
        jiraLabel: String,
        description: String,
        actualResults: String,
        expectedResults: String,
        stepsToReproduce: String,
        screenshotUrl: String
    }
]
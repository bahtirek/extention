//token - to share the reports
//id auto-incremented on backend

[
    {
        id: Number,
        project: String,
        token: String,
        name: String,
        xPath: [ String ],
        jira: String,
        jiraLabel: String,
        description: String,
        actualResults: String,
        expectedResults: String,
        stepsToReproduce: String,
        screenshotUrl: String
    }
]
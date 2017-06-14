# Accessing GitHub API using node.js

This repo contains a simple node.js script that performs common GitHub functions by using REST-API calls.

Attached script performs the following,

 - getYourRepos(userId) - Lists the repo under userId
 - listBranches(userId,repoName) - List the branches under the repoName repo which is under the given userId
 - createRepo(repoName) - This method creates a new repo named repoName
 - createIssue(repoName,issueName,issueDesc) - THis will create a new issue under repoName with the given description
 - enableWiki(repoName, value)- This will toggle the value of the enableWiki feature for the given repo.


All function calls will print out the obtained response on to the terminal.

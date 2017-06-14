var request = require('request');
var parse = require('parse-link-header');
var token = "token " + process.env.GITTOKEN; ;
var userId = process.env.USERNAME;
var urlRoot = "https://github.ncsu.edu/api/v3";
var options = {
	url: '',   
	headers: {
		"User-Agent": "GenericAgent",
		"content-type": "application/json",
		"Authorization": token,
		"visibility": "all"
	},
	method: 'GET'
};

function getYourRepos(userName)
{
	options.url = urlRoot + '/user/repos';	
	// Send a http request to url and specify a callback that will be called upon its return.
	request(options, function (error, response, body) 
	{
		var obj = JSON.parse(body);
		console.log("List of REPOs:");
		for( var i = 0; i < obj.length; i++ )
		{
			var name = obj[i].name;
			console.log( name );
		}
	});
}

function listBranches(owner,repo)
{
	options.url = urlRoot + '/repos/'+owner+'/'+repo+'/branches';	
	// Send a http request to url and specify a callback that will be called upon its return.
	request(options, function (error, response, body) 
	{
		var obj = JSON.parse(body);
		console.log( "List of Branches: "  );
		for( var i = 0; i < obj.length; i++ )
		{
			var name = obj[i].name;
			console.log( name );
		}
	});
	
}

function createRepo(repoName){
	var createOptions = {
		url: urlRoot + '/user/repos',   
		method: 'POST',
		headers: {
			"User-Agent": "CreateRepo",
			"content-type": "application/json",
			"Authorization": token,
			"visibility": "all",
		},
		json: {
			"name": repoName,
			"description": "Test repository for test script",
			"private": false
		}		
	};
	request(createOptions, function (error, response, body) 
		{
			console.log("Returned from createRepo call");
			console.log(body);
		});	
}

function createIssue(repoName,issueName,issueDesc){
	var createIssueOptions = {
		url: urlRoot + '/repos/vmani2/' + repoName + '/issues',  ///repos/:owner/:repo/issues 
		method: 'POST',
		headers: {
			"User-Agent": "CreateIssue",
			"content-type": "application/json",
			"Authorization": token,
			"visibility": "all",
		},
		json: {
			"title": issueName,
			"body": issueDesc
		}		
	};
	request(createIssueOptions, function (error, response, body) 
		{
			console.log("Returned from createIssue call");
			console.log(body);
		});	
}

function enableWiki(repoName, configValue){
	var enableWikiOptions = {
		url: urlRoot + '/repos/vmani2/' + repoName ,  
		method: 'PATCH',
		headers: {
			"User-Agent": "EnableWiki",
			"content-type": "application/json",
			"Authorization": token
		},
		json: {
			"name": repoName,
			"has_wiki": configValue
		}		
	};
	request(enableWikiOptions, function (error, response, body) 
		{
			console.log("Returned from enableWiki call");
			console.log(body);

		});	
	
}

//Starting Point
getYourRepos(userId);
listBranches(userId,'HW0');
listBranches(userId,'HW1');
listBranches(userId,'TestRepo');
createRepo("SampleRepo");
createIssue("SampleRepo","TestIssue","Sample issue created for testing");
enableWiki("SampleRepo", false);

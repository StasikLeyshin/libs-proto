const core = require('@actions/core');
const github = require('@actions/github');


try {
    const Rules = {
        "releaseRules":[
            {"tag": "breaking", "release": "major"},
            {"tag": "chore", "release": false},
            {"tag": "ci", "release": false},
            {"tag": "docs", "release": false},
            {"tag": "feat", "release": "minor"},
            {"tag": "fix", "release": "patch"},
            {"tag": "refactor", "release": "patch"},
            {"tag": "security", "release": "patch"},
            {"tag": "style", "release": "patch"},
            {"tag": "test", "release": false}
        ]
    }

    const InitialVersion = "v0.0.0"

    // {required: true} выкинет ошибку, если input не передан
    const TOKEN = core.getInput('github-token', {required: true});

    const OWNER = github.context.repo.owner
    const REPO = github.context.repo.repo


    // client может использовать весть REST api от octokit https://octokit.github.io/rest.js/v18
    const client = new github.getOctokit(TOKEN);

    console.log(`We can even get context data, like the repo: ${github.context.repo.repo}`);

    (async() => {
        let message = await GetLastCommitMessage()
        await MessageProcessing(message)
    })();

    // const octokit = new github.Octokit({
    //     auth: 'YOUR-TOKEN'
    // })

    // (async() => {
    //     const commits = await client.request('GET /repos/{owner}/{repo}/commits', {
    //         owner: OWNER,
    //         repo: REPO,
    //         headers: {
    //             'X-GitHub-Api-Version': '2022-11-28'
    //         }
    //     });
    //     console.log(commits["data"]);
    // })();
    // context содержит всю информацию
    // const {
    //     payload: {
    //         repository,
    //         organization: { login: owner },
    //         pull_request: pullRequest,
    //     },
    // } = context;
    // const isPRMerged = await octokit.pulls.checkIfMerged({
    //     owner,
    //     repo: repository.name,
    //     pull_number: pullRequest.number
    // });
    // console.log(isPRMerged)
    async function GetReleaseRules(firstMessage) {
        let result = ""
        for (let i = 0; i < Rules["releaseRules"].length; i++) {
            console.log(firstMessage, Rules["releaseRules"][i]["tag"])
            if (Rules["releaseRules"][i]["tag"] === firstMessage ||
                Rules["releaseRules"][i]["tag"] === firstMessage.slice(0, -1)) {
                return String(Rules["releaseRules"][i]["release"])
            }

        }
        return result
    }

    async function GetTags(per_page, page) {
        let tags = await client.request('GET /repos/{owner}/{repo}/tags', {
            owner: OWNER,
            repo: REPO,
            per_page: per_page,
            page: page,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        return tags['data']
    }

    async function GetVersionTags(name, Patch) {
        let VersionTags = "0"
        //for (let i = 0; i < tagsList.length; i++) {
        let strReplace = name.match("\\d+.\\d+.\\d+");

        let tagsListNew =  name.replace(strReplace, "")
        if (tagsListNew === Patch) {
            VersionTags = name.match("\\d+.\\d+.\\d+");
            //return VersionTags
        }
        //}
        return VersionTags
    }

    async function GetLastVersionTags(Patch) {
        let per_page = 100
        let page = 1
        let tagsList = await GetTags(per_page, page)
        let getVersionTags = await GetVersionTags(tagsList, 0)

        let result = "0"
        //let index = getVersionTags[1]

        while (result === "0") {
            page++;
            tagsList = GetTags(per_page, page)
            for (let i = 0; i < tagsList.length; i++) {
                result = getVersionTags = await GetVersionTags(tagsList[i]['name'], Patch)
                if (result !== "0") {
                    return result
                }
            }

            //result = getVersionTags[0]
            //index = getVersionTags[1]
        }
        return result
    }

    async function GetPlusVersion(release, patch, version) {
        let ReleasePatchVersion = "0"
        if (release === "patch") {
            let strReplace = version.match("\\d+.\\d+.\\d+");
        } else if (release === "minor") {

        } else {

        }
        return ReleasePatchVersion
    }

    async function MessageProcessing(message) {
        let messageList = String(message).split("\n")
        for (let i = 0; i < messageList.length; i++) {
            console.log("messageList[i]: ", messageList[i])
            let firstMessage = String(messageList[i].split(" ")[0])
            let patch = String(messageList[i].split(" ")[1])

            let release = await GetReleaseRules(firstMessage)
            console.log("release: ", release);
            break

            //let version = await GetLastVersionTags(patch)
            //console.log("version: ", version);

            //let ReleasePatchVersion = await GetPlusVersion(release, patch, version)

            //console.log("ReleasePatchVersion: ", ReleasePatchVersion);
        }
    }

    async function GetLastCommitMessage() {
        const commits = await client.request('GET /repos/{owner}/{repo}/commits', {
            owner: OWNER,
            repo: REPO,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        //console.log(commits["data"][0]["commit"]["message"]);
        return commits["data"][0]["commit"]["message"] + '';
    }

} catch (error) {
    core.setFailed(error.message);
}
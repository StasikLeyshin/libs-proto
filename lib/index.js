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

    const InitialVersion = "0.0.0"

    // {required: true} выкинет ошибку, если input не передан
    const TOKEN = core.getInput('github-token', {required: true});

    const OWNER = github.context.repo.owner
    const REPO = github.context.repo.repo


    // client может использовать весть REST api от octokit https://octokit.github.io/rest.js/v18
    const client = new github.getOctokit(TOKEN);

    console.log(`We can even get context data, like the repo: ${github.context.repo.repo}`);

    (async() => {
        let messageRes = await GetLastCommitMessage()
        let message = messageRes[0]
        let sha = messageRes[1]
        //await MessageProcessing(message, sha)
        await GetFilesCommit(sha)
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
            //console.log(firstMessage, Rules["releaseRules"][i]["tag"])
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
        //console.log(tags)
        return tags['data']
    }

    async function GetVersionTags(name, Patch) {
        let VersionTags = "0"
        //for (let i = 0; i < tagsList.length; i++) {
        let strReplace = String(name).match("v\\d+.\\d+.\\d+");

        //console.log("strReplace: ", strReplace)

        if (!strReplace) {
            return VersionTags
        }

        let tagsListNew =  String(name).replace(strReplace[0], "")

        //console.log("tagsListNew: ", tagsListNew)

        if (tagsListNew === Patch) {
            VersionTags = String(name).match("\\d+.\\d+.\\d+");
            //console.log("VersionTags: ", VersionTags)

            if (!VersionTags) {
                return "0"
            }

            return VersionTags[0]

            //return VersionTags
        }
        //}
        return VersionTags
    }

    async function GetLastVersionTags(Patch) {
        let per_page = 100
        let page = 1
        let tagsList = await GetTags(per_page, page)
        //let getVersionTags = await GetVersionTags(tagsList, 0)

        let result = "0"
        //let index = getVersionTags[1]

        //console.log("tagsList.length: ", tagsList.length)
        //console.log("tagsList: ", tagsList)

        while (tagsList.length > 0) {
            page++;
            for (let i = 0; i < tagsList.length; i++) {
                //console.log("tagsList[i]['name']: ", tagsList[i]['name'])
                //console.log("Patch: ", Patch)
                result = await GetVersionTags(tagsList[i]['name'], Patch)
                if (result !== "0") {
                    return result
                }
            }
            tagsList = GetTags(per_page, page)
            //result = getVersionTags[0]
            //index = getVersionTags[1]
        }
        return result
    }

    async function GetPlusVersion(release, patch, version) {
        let ReleasePatchVersion = "0";
        let versionList = String(version).split(".");
        if (release === "patch") {
            versionList[2] = String(Number(versionList[2]) + Number(1));
        } else if (release === "minor") {
            versionList[1] = String(Number(versionList[1]) + Number(1));
        } else {
            versionList[0] = String(Number(versionList[0]) + Number(1));
        }
        ReleasePatchVersion = versionList.join('.');
        return ReleasePatchVersion
    }

    async function CreateTag(tag, patch, sha){
        let createTag = await client.request('POST /repos/{owner}/{repo}/git/tags', {
            owner: OWNER,
            repo: REPO,
            tag: patch + "v" + tag,
            message: 'initial version',
            object: sha,
            type: 'commit',
            tagger: {
                name: "StasikLeyshin",
                email: "stasikleyshin@users.noreply",
                date: new Date()
            },
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        return createTag.status === 200;

    }

    async function CreateRelease(tag, patch){
        await client.request('POST /repos/{owner}/{repo}/releases', {
            owner: OWNER,
            repo: REPO,
            tag_name: patch + "v" + tag,
            target_commitish: 'master',
            name: patch + "v" + tag,
            body: 'Description of the release',
            draft: false,
            prerelease: false,
            generate_release_notes: true,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
    }

    async function MessageProcessing(message, sha) {
        let messageList = String(message).split("\n")
        for (let i = 0; i < messageList.length; i++) {
            console.log("messageList[i]: ", messageList[i])
            let firstMessage = String(messageList[i].split(" ")[0])
            let patch = String(messageList[i].split(" ")[1])

            let release = await GetReleaseRules(firstMessage)
            console.log("release: ", release);

            let version = await GetLastVersionTags(patch)
            console.log("version: ", version);

            if (version === "0") {
                version = InitialVersion
            } else {

                version = await GetPlusVersion(release, patch, version)
                console.log("ReleasePatchVersion: ", version);
            }

            let res = await CreateTag(version, patch, sha)

            console.log("CreateTag: ", res);

            res = await CreateRelease(version, patch)

            console.log("CreateRelease: ", res);
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
        return [String(commits["data"][0]["commit"]["message"]), String(commits["data"][0]["sha"])];
    }

    async function GetFilesCommit(sha) {
        const commit = await client.request('GET /repos/{owner}/{repo}/git/commits/{commit_sha}', {
            owner: OWNER,
            repo: REPO,
            commit_sha: sha,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        console.log(commit['data'])
    }

} catch (error) {
    core.setFailed(error.message);
}
export interface IRepository {
  name: string
  html_url: string
  id: number
  stargazers_count: number
  updated_at: string
  owner: {
    avatar_url: string
    html_url: string
    id: 1
    login: string
  }
  language: string
  description: string
  contributors_url: string
}

// Example

// archive_url: "https://api.github.com/repos/yiisoft/yii/{archive_format}{/ref}"
// archived: false
// assignees_url: "https://api.github.com/repos/yiisoft/yii/assignees{/user}"
// blobs_url: "https://api.github.com/repos/yiisoft/yii/git/blobs{/sha}"
// branches_url: "https://api.github.com/repos/yiisoft/yii/branches{/branch}"
// clone_url: "https://github.com/yiisoft/yii.git"
// collaborators_url: "https://api.github.com/repos/yiisoft/yii/collaborators{/collaborator}"
// comments_url: "https://api.github.com/repos/yiisoft/yii/comments{/number}"
// commits_url: "https://api.github.com/repos/yiisoft/yii/commits{/sha}"
// compare_url: "https://api.github.com/repos/yiisoft/yii/compare/{base}...{head}"
// contents_url: "https://api.github.com/repos/yiisoft/yii/contents/{+path}"
// contributors_url: "https://api.github.com/repos/yiisoft/yii/contributors"
// created_at: "2012-02-15T16:26:22Z"
// default_branch: "master"
// deployments_url: "https://api.github.com/repos/yiisoft/yii/deployments"
// description: "Yii PHP Framework 1.1.x"
// disabled: false
// downloads_url: "https://api.github.com/repos/yiisoft/yii/downloads"
// events_url: "https://api.github.com/repos/yiisoft/yii/events"
// fork: false
// forks: 2286
// forks_count: 2286
// forks_url: "https://api.github.com/repos/yiisoft/yii/forks"
// full_name: "yiisoft/yii"
// git_commits_url: "https://api.github.com/repos/yiisoft/yii/git/commits{/sha}"
// git_refs_url: "https://api.github.com/repos/yiisoft/yii/git/refs{/sha}"
// git_tags_url: "https://api.github.com/repos/yiisoft/yii/git/tags{/sha}"
// git_url: "git://github.com/yiisoft/yii.git"
// has_downloads: true
// has_issues: true
// has_pages: false
// has_projects: false
// has_wiki: true
// homepage: "http://www.yiiframework.com"
// hooks_url: "https://api.github.com/repos/yiisoft/yii/hooks"
// html_url: "https://github.com/yiisoft/yii"
// id: 3451238
// issue_comment_url: "https://api.github.com/repos/yiisoft/yii/issues/comments{/number}"
// issue_events_url: "https://api.github.com/repos/yiisoft/yii/issues/events{/number}"
// issues_url: "https://api.github.com/repos/yiisoft/yii/issues{/number}"
// keys_url: "https://api.github.com/repos/yiisoft/yii/keys{/key_id}"
// labels_url: "https://api.github.com/repos/yiisoft/yii/labels{/name}"
// language: "PHP"
// languages_url: "https://api.github.com/repos/yiisoft/yii/languages"
// license: {key: "bsd-3-clause", name: "BSD 3-Clause "New" or "Revised" License", spdx_id: "BSD-3-Clause", url: "https://api.github.com/licenses/bsd-3-clause", node_id: "MDc6TGljZW5zZTU="}
// merges_url: "https://api.github.com/repos/yiisoft/yii/merges"
// milestones_url: "https://api.github.com/repos/yiisoft/yii/milestones{/number}"
// mirror_url: null
// name: "yii"
// node_id: "MDEwOlJlcG9zaXRvcnkzNDUxMjM4"
// notifications_url: "https://api.github.com/repos/yiisoft/yii/notifications{?since,all,participating}"
// open_issues: 6
// open_issues_count: 6
// owner: {login: "yiisoft", id: 993323, node_id: "MDEyOk9yZ2FuaXphdGlvbjk5MzMyMw==", avatar_url: "https://avatars3.githubusercontent.com/u/993323?v=4", gravatar_id: "", …}
// private: false
// pulls_url: "https://api.github.com/repos/yiisoft/yii/pulls{/number}"
// pushed_at: "2020-07-03T18:20:38Z"
// releases_url: "https://api.github.com/repos/yiisoft/yii/releases{/id}"
// score: 1
// size: 28766
// ssh_url: "git@github.com:yiisoft/yii.git"
// stargazers_count: 4842
// stargazers_url: "https://api.github.com/repos/yiisoft/yii/stargazers"
// statuses_url: "https://api.github.com/repos/yiisoft/yii/statuses/{sha}"
// subscribers_url: "https://api.github.com/repos/yiisoft/yii/subscribers"
// subscription_url: "https://api.github.com/repos/yiisoft/yii/subscription"
// svn_url: "https://github.com/yiisoft/yii"
// tags_url: "https://api.github.com/repos/yiisoft/yii/tags"
// teams_url: "https://api.github.com/repos/yiisoft/yii/teams"
// trees_url: "https://api.github.com/repos/yiisoft/yii/git/trees{/sha}"
// updated_at: "2020-07-02T14:36:02Z"
// url: "https://api.github.com/repos/yiisoft/yii"
// watchers: 4842
// watchers_count: 4842

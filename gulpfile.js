// 组合任务，series：同步，parallel：异步
const { series, parallel } = require('gulp');
// 命令执行
const exec = require('child_process').exec;
// 请求发送
const axios = require('axios');



// 测试构建
const build_test = done => {
    exec('npm run build-test', function (err, stdout, stderr) {
        if (err) {
            console.log('build fail!');
            done(new Error("build fail!"));
        } else {
            console.log('build success!');
            done();
        }
        console.log("stdout: ", stdout);
        console.log("stderr: ", stderr);
    });
}

// 生产构建
const build_pro = done => {
    exec('npm run build-production', function (err, stdout, stderr) {
        if (err) {
            console.log('build fail!');
            done(new Error("build fail!"));
        } else {
            console.log('build success!');
            done();
        }
        console.log("stdout: ", stdout);
        console.log("stderr: ", stderr);
    });
}

// 暂存修改
const git_add = done => {
    exec('git add .', function (err, stdout, stderr) {
        if (err) {
            console.log('git add . fail!')
            done(new Error('git add . faill!'))
        } else {
            console.log('git add . success!')
            done();
        }
        console.log("stdout: ", stdout);
        console.log("stderr: ", stderr);
    })
}

// 提交修改到仓库
const git_commit = done => {
    exec('git commit -m "build auto"', function (err, stdout, stderr) {
        if (err) {
            console.log('git commit fail!')
            done(new Error('git commit faill!'))
        } else {
            console.log('git commit success!')
            done();
        }
        console.log("stdout: ", stdout);
        console.log("stderr: ", stderr);
    })
}

// 推送到远程服务器
const git_push = done => {
    exec('git push origin', function (err, stdout, stderr) {
        if (err) {
            console.log('git push origin fail!')
            done(new Error('git push origin faill!'))
        } else {
            console.log('git push origin success!')
            done();
        }
        console.log("stdout: ", stdout);
        console.log("stderr: ", stderr);
    })
}

// 触发 Jenkins
// test
const jenkins_test = done => {
    // UserName、UserToken、JobName、JobToken需要替换为自己的项目、Jenkins job 信息
    axios.get('http://UserName:UserToken@8.129.75.199:8808/job/JobName/build?token=JobToken')
        .then(function (response) {
            // handle success
            console.log(response);
            console.log('jenkins build success');
            done();
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            console.log('jenkins build fail');
            done(new Error('jenkins build fail'));
        })
}

// production
const jenkins_pro = done => {
    // UserName、UserToken、JobName、JobToken需要替换为自己的项目、Jenkins job 信息
    axios.get('http://UserName:UserToken@8.129.75.199:8808/job/JobName/build?token=JobToken')
        .then(function (response) {
            // handle success
            console.log(response);
            console.log('jenkins build success');
            setTimeout(() => {
                done();
            }, 5000);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            console.log('jenkins build fail');
            done(new Error('jenkins build fail'));
        })
}

// 测试环境部署
exports.test_sv = series(build_test, git_add, git_commit, git_push, jenkins_test)
// 生产环境部署
exports.pro_sv = series(build_pro, git_add, git_commit, git_push, jenkins_pro)
// git命令整合
exports.gitee = series(git_add, git_commit, git_push)

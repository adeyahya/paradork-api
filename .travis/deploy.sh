#!/bin/bash
# print outputs and exit on first failure
set -xe

if [ $TRAVIS_BRANCH == "master" ] ; then

    # setup ssh agent, git config and remote
    openssl aes-256-cbc -K $encrypted_ff4d4c896f3c_key -iv $encrypted_ff4d4c896f3c_iv -in travis_rsa.enc -out travis_rsa -d
    rm travis_rsa.enc
    chmod 600 travis_rsa
    mv travis_rsa ~/.ssh/id_rsa
    # eval "$(ssh-agent -s)"
    # ssh-add ~/.ssh/travis_rsa
    # git remote add deploy "travis@paradork.com:/var/www/paradork-api"
    # git config user.name "Travis CI"
    # git config user.email "travis@paradork.com"

    # commit compressed files and push it to remote
    rm -f .gitignore
    cp .travis/deployignore .gitignore
    git add .
    git status # debug
    git commit -m "Deploy compressed files"
    git push -f deploy HEAD:master
else
    echo "No deploy script for branch '$TRAVIS_BRANCH'"
fi
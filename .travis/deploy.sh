#!/bin/bash
# print outputs and exit on first failure
set -xe

# setup ssh agent, git config and remote
openssl aes-256-cbc -K $encrypted_ff4d4c896f3c_key -iv $encrypted_ff4d4c896f3c_iv -in travis_rsa.enc -out travis_rsa -d
rm travis_rsa.enc
chmod 600 travis_rsa
mv travis_rsa ~/.ssh/id_rsa

if [ $TRAVIS_BRANCH == "master" ] ; then
    git init
        
    git remote add deploy "travis@paradork.com:/var/www/paradork-api"
    git config user.name "Travis CI"
    git config user.email "adeyahyaprasetyo@gmail.com"
    
    git add .
    git commit -m "Deploy"
    git push --force deploy master
else
    echo "No deploy script for branch '$TRAVIS_BRANCH'"
fi
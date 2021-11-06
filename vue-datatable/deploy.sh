#!/usr/bin/env sh
set -e
npm run build
# navigate into the build output directory
cd dist
# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:Abdulaziz5h/vue-datatable.git main:gh-pages
cd -
ENV=$1
if [ -z "$ENV" ]
then
    echo "No environment specified. Defaulting to 'dev'"
    ENV="dev"
fi
theme deploy --env=$ENV
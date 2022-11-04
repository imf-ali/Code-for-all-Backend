pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  environment {
    HEROKU_API_KEY = credentials('heroku-api-key')
    MONGO_URL = credentials('MONGO_URL')
    YOUR_KEY_ID = credentials('YOUR_KEY_ID')
    YOUR_KEY_SECRET = credentials('YOUR_KEY_SECRET')
    RAZORPAYMERCHANTID = credentials('RAZORPAYMERCHANTID')
    IMAGE_NAME = 'code-for-all/backend'
    IMAGE_TAG = 'latest'
    APP_NAME = 'code-for-all-backend'
  }
  stages {
    stage('Build') {
      steps {
        sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
      }
    }
    stage('Login') {
      steps {
        sh 'echo $HEROKU_API_KEY | docker login --username=_ --password-stdin registry.heroku.com'
      }
    }
    stage('Push to Heroku registry') {
      steps {
        sh '''
          docker tag $IMAGE_NAME:$IMAGE_TAG registry.heroku.com/$APP_NAME/web
          docker push registry.heroku.com/$APP_NAME/web
        '''
      }
    }
    stage('Release the image') {
      steps {
        sh '''
          heroku container:release web --app $APP_NAME
        '''
      }
    }
  }
  post {
    always {
      sh 'docker logout'
    }
  }
}
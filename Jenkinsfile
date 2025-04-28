pipeline {
    agent any

    environment {
        GITHUB_TOKEN = credentials('github-token')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', // Specify the branch name here
                    url: 'https://github.com/thekaran69/Sneaker-Store-WEBSITE',
                    credentialsId: 'github-token'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    bat 'docker build -t sneaker-store-app .'
                }
            }
        }
        stage('Run Docker Image') {
            steps {
                script {
                    bat 'docker run -d -p 8085:8080 sneaker-store-app'
                }
            }
        }
    }
    post {
        success {
            echo 'Build and deployment succeeded!'
        }
        failure {
            echo 'Build or deployment failed!'
        }
    }
}


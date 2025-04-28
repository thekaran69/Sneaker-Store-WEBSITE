// pipeline {
//     agent any

//     environment {
//         DOCKER_CREDENTIALS = credentials('docker-cred')
//         GITHUB_CREDENTIALS = credentials('github-token')
//     }

//     stages {
//         stage('Checkout') {
//             steps {
//                 git url: 'https://github.com/thekaran69/Sneaker-Store-WEBSITE', 
//                     branch: 'main',
//                     credentialsId: 'github-token'
//             }
//         }

//         stage('Build and Push Docker Image') {
//             steps {
//                 script {
//                     // Docker login
//                     sh 'echo %DOCKER_CREDENTIALS_PSW% | docker login -u %DOCKER_CREDENTIALS_USR% --password-stdin'

//                     // Build and push Docker image
//                     sh """
//                         docker build --no-cache=false --pull=true -t %DOCKER_CREDENTIALS_USR%/sneaker-store-app:latest .
//                         docker push %DOCKER_CREDENTIALS_USR%/sneaker-store-app:latest
//                     """
//                 }
//             }
//         }

//         stage('Verify Docker Image') {
//             steps {
//                 script {
//                     sh """
//                         docker images | findstr "sneaker-store-app"
//                         echo "Verifying image is pushed to Docker Hub..."
//                         docker pull %DOCKER_CREDENTIALS_USR%/sneaker-store-app
//                     """
//                 }
//             }
//         }

//         stage('Run Docker Container') {
//             steps {
//                 script {
//                     sh """
//                         docker stop sneaker-store-container || exit 0
//                         docker rm sneaker-store-container || exit 0
//                         docker run -d -p 8085:80 --name sneaker-store-container %DOCKER_CREDENTIALS_USR%/sneaker-store-app
//                     """
//                 }
//             }
//         }
//     }

//     post {
//         always {
//             script {
//                 sh 'docker logout'
//                 cleanWs()
//             }
//         }
//         success {
//             echo 'Pipeline succeeded! Docker image has been built, pushed, and deployed.'
//         }
//         failure {
//             echo 'Pipeline failed! Check the logs for errors.'
//         }
//     }
// }

pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS = credentials('docker-cred')
        GITHUB_CREDENTIALS = credentials('github-token')
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/thekaran69/Sneaker-Store-WEBSITE', 
                    branch: 'main',
                    credentialsId: 'github-token'
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                script {
                    // Docker login
                    sh '''
                        echo "$DOCKER_CREDENTIALS_PSW" | docker login -u "$DOCKER_CREDENTIALS_USR" --password-stdin
                    '''

                    // Build and push Docker image
                    sh '''
                        docker build --pull -t "$DOCKER_CREDENTIALS_USR/sneaker-store-app:latest" .
                        docker push "$DOCKER_CREDENTIALS_USR/sneaker-store-app:latest"
                    '''
                }
            }
        }

        stage('Verify Docker Image') {
            steps {
                script {
                    sh '''
                        docker images | grep "sneaker-store-app:latest"
                        echo "Verifying image is pushed to Docker Hub..."
                        docker pull "$DOCKER_CREDENTIALS_USR/sneaker-store-app:latest"
                    '''
                }
            }
        }

        // stage('Run Docker Container') {
        //     steps {
        //         script {
        //             sh '''
        //                 docker rm -f sneaker-store-container || true
        //                 docker run -d -p 8085:80 --name sneaker-store-container "$DOCKER_CREDENTIALS_USR/sneaker-store-app:latest"
        //             '''
        //         }
        //     }
        // }
    }

    post {
        always {
            script {
                sh '''
                    docker logout
                '''
                cleanWs()
            }
        }
        success {
            echo 'Pipeline succeeded! Docker image has been built, pushed, and deployed.'
        }
        failure {
            echo 'Pipeline failed! Check the logs for errors.'
        }
    }
}

pipeline{

    agent any 

    environment{
        DOCKER_IMAGE = 'varshithyadav/bookstore-api:latest'
        // DOCKER_REGISTRY = 'varshithyadav'
    }

    stages{
        stage("git checkout"){
            steps{
                git branch: 'main' ,  url: 'https://github.com/Varshith-Yadav/DevOps_Project.git'
            }
        }
        stage(" Docker Build"){
            steps{
                script{
                    sh """
                        docker build -t $DOCKER_IMAGE .
                    """
                    echo "builed succefully !"
                }
            }
        }
        stage("Run Unit Test"){
            steps{
                script{
                    sh 'npm test'
                    echo "testing stage !"
                }
            }
        }
        stage("Push to DockerHub"){
            steps{
                script {
                    withDockerRegistry([credentialsId: 'docker-creds', url: '']) {
                        sh "docker push $DOCKER_IMAGE"
                    }
                }
            }
        }
        stage("deploy"){
            steps{
                echo "running stage"
            }
        }
    }
}
pipeline{

    agent any 

    environment{
        IMAGE_NAME = 'bookStore-api'
        DOCKER_REGISTRY = 'varshithyadav'
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
                        docker build -t ${DOCKER_REGISTRY}/{IMAGE_NAME}:latest .
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
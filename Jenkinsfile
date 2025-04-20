pipeline{
    agent any 
    environment{
        DOCKER_IMAGE = 'varshithyadav/bookstore-api:latest'
        PROJECT_ID = "gke-demo-455116"  
        CLUSTER_NAME = "gke-demo"   
        REGION = "us-central1-c"
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
        stage("Deploy To GKE"){
            steps{
                script{
                    withCredentials([file(credentialsId: 'gcloud-creds', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                        sh '''
                        gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS
                        gcloud config set project $PROJECT_ID
                        gcloud container clusters get-credentials $CLUSTER_NAME --region $REGION
                        '''
                    }

                    sh '''
                    kubectl apply -f k8s-Deployment.yml
                    kubectl apply -f k8s-service.yml
                    '''
                }
            }
        }
    }
}
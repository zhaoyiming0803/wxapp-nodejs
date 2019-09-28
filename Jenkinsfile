pipeline {
	agent {
		node {
			label ''
			customWorkspace 'workspace/weapp'
		}
	}

	stages {
		stage('deploy') {
			steps {
				sh 'bash ./publish.sh'
			}
		}
	}
}
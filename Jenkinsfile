pipeline {
	agent {
		node {
			label ''
			customWorkspace 'workspace/wxapp'
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
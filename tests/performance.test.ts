import http from 'k6/http';
import { sleep, check } from 'k6';
import { Options } from 'k6/options';
import { getApiToken, type auth } from '../tools/auth';
import { User, QA_SERVER } from '../tools/endpoints';

//* Preconditions
export function setup() {
	console.log('🧪Starting Performance Tests...');
	const auth = getApiToken();
	return auth;
}

//* Test Config
export const options: Options = {
	vus: 10,
	duration: '10s',
	ext: {
		loadimpact: {
			// Project: UPEX-PERFORMANCE-DEMO
			projectID: 3673972,
			// Test runs with the same name groups test runs together.
			name: 'Test (15/12/2023-00:40:26)',
		},
	},
};

//* Performance Test:
export default function (data: auth) {
	const endpointCall = QA_SERVER + User.currentId;
	const res = http.get(endpointCall, { headers: data });

	check(res, {
		'✅ Status was 200': res => res.status == 200,
		'✅ res has correct Data': res => res.json()?.toString().length !== 0,
	});
	console.log('✅ Response Body Defined:', res.json());
	sleep(1);
}

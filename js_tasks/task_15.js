let sum = 0;

function sumAllValues(obj) {
	sum += obj.valueNode;
	if (obj.next != null) {
		for (let i = 0; i < obj.next.length; i++) {
			sumAllValues(obj.next[i]);
		}
	}
	return sum;
}

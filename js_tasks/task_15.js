function sumAllValues(obj) {
	let result = 0;

	function nextStage(obj) {
		result += obj.valueNode;

		if (obj.next != null) {
			for (let i = 0; i < obj.next.length; i++) {
				nextStage(obj.next[i]);
			}
		}

		return result;
	}

	return nextStage(obj);
}
export default function (context, methods) {
	methods.split(',').forEach((fn) => {
		fn = fn.trim();
		context[fn] = context[fn].bind(context);
	})
}
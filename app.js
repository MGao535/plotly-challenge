function getData(id) {
  d3.json("data/samples.json").then((sample_data) => {
    let data = sample_data.metadata;
    let filter = data.filter(data_sample => data_sample.id == id);
    let filtered = filter[0];

    let data_box = d3.select("#sample-metadata");
    data_box.html("");

    Object.entries(filtered).forEach(([x, y]) => {
    	x_value = String(x).toUpperCase();
    	text = x_value + ": " + String(y);
    	data_box.append("h6").text(text)
    })
}

function charts(id) {
	d3.json("data/samples.json").then((sample_data) => {
		let samples = sample_data.samples;
		let filter = samples.filter(data_sample => data_sample.id == id);
		let filtered = filter[0];

		let sample_values = filtered.sample_values;
		let otu_ids = filtered.otu_ids;
		let otu_labels = filtered.otu_labels;

		let x = sample_values.slice(0,10);
		let orderedx = x.reverse();
		let y = otu_ids.slice(0, 10).map(IDs = `OTU ${IDs}`);
		let orderedy = y.reverse();

		let labels = otu_labels.slice(0, 10);
		let orderedlabels = labels.reverse();

		let bars = [{
			x: orederedx,
			y: orderedy,
			text: orderedlabels,
			type: 'bar',
			orientation: 'h'
		}];

		let barLayout = {
			title: 'Top 10 Human Navel Microbes',
			margin: {t: 50, l: 200}
		};

		Plotly.newPlot('bar', bars, barLayout);

		let bubbles = [
			x: otu_ids,
			y: sample_values,
			text: otu_labels,
			mode: 'markers',
			marker: {
				size: sample_values,
				color: otu_ids,
				colorscale: "Jet"
			}
		];

		let bubbleLayout = {
			title: 'Microbes Per Sample',
			margin: {t: 50}
		};

		Plotly.newPlot('bubble', bubbles, bubbleLayout);
	});
}

function build() {
	let dataset = d3.select('#selDataset');

	d3.json("data/samples.json").then((data) => {
		let names = data.names;

		names.forEach((sample) => {
			selector.append("option").text(sample).property("value", sample);
		});

		getData(names[0]);
		charts(names[0]);
	});
}

function optionChanged(updated) {
	getData(updated);
	charts(updated);
}

build();
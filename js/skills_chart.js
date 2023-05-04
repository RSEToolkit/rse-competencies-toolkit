function getValue(dictionary, key, default_value) {
  if (dictionary.hasOwnProperty(key)) {
    return dictionary[key];
  } else {
    return default_value;
  }
}

function makeLegend(labels, id) {
  const legendContainer = document.getElementById(id);
  let listContainer = legendContainer.querySelector('ul');

  if (!listContainer) {
    listContainer = document.createElement('ul');
    listContainer.style.display = 'flex';
    listContainer.style.flexDirection = 'row';
    listContainer.style.margin = 0;
    listContainer.style.padding = 0;

    legendContainer.appendChild(listContainer);
  }

  while (listContainer.firstChild) {
    listContainer.firstChild.remove();
  }

  // TODO: forEach with index instead of using indexOf.
  labels.forEach(label => {
    const li = document.createElement('li');
    li.style.alignItems = 'center';
    li.style.cursor = 'pointer';
    li.style.display = 'flex';
    li.style.flexDirection = 'row';
    li.style.marginLeft = '10px';

    const colourIndex = labels.indexOf(label);
    const colour = COLOURS[colourIndex];

    const boxSpan = document.createElement('span');
    boxSpan.style.background = colour;
    // boxSpan.style.borderColor = item.strokeStyle;
    // boxSpan.style.borderWidth = item.lineWidth + 'px';
    boxSpan.style.display = 'inline-block';
    boxSpan.style.height = '20px';
    boxSpan.style.marginRight = '10px';
    boxSpan.style.width = '20px';

    const textContainer = document.createElement('p');
    // textContainer.style.color = item.fontColor;
    textContainer.style.margin = 0;
    textContainer.style.padding = 0;

    const text = document.createTextNode(label);
    textContainer.appendChild(text);

    li.appendChild(boxSpan);
    li.appendChild(textContainer);
    listContainer.appendChild(li);
  });
}

function createSkillChart(data, chart_id = 'chart', legend_id = 'legend') {
  const ctx = document.getElementById(chart_id);

  const area_labels = Object.keys(data);
  const skill_labels = Object.entries(data).flatMap(([area, skills]) => Object.keys(skills));

  // const SKILL_TO_AREA_MAP = Object.fromEntries(
  //   Object.entries(DATA).flatMap(
  //     ([area, skills]) => Object.keys(skills).map(
  //       (skill) => [skill, area],
  //     )
  //   )
  // );

  const chart = new Chart(
    ctx,
    {
      type: 'polarArea',
      data: {
        labels: skill_labels,
        datasets: Object.entries(data).map(([area, skills], i) => ({
          label: area,
          data: skill_labels.map(skill => getValue(skills, skill, 0)),
          borderWidth: 1,
          backgroundColor: COLOURS[i],
        })),
      },
      options: {
        plugins: {
          legend: {
            display: false,
          }
        }
      },
    },
  );

  makeLegend(area_labels, legend_id);
}

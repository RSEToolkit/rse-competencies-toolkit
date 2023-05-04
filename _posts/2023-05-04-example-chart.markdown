---
layout: post
title:  "Example Chart!"
date:   2023-05-04 08:53:16 +0100
---

<div>
  <div id="legend"></div>
  <div>
    <canvas id="chart"></canvas>
  </div>
</div>

<script>
  const DATA = {
    "Technical": {
      "Coding": 1,
      "Testing": 3,
      "Documentation": 5,
    },
    "Interpersonal": {
      "Communication": 2,
      "Leadership": 4,
    }
  };

  createSkillChart(DATA);
</script>

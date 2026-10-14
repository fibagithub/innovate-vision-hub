import { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { AIMAGS, AIMAG_BY_VALUE } from "@/lib/aimags";
import { useLanguage } from "@/contexts/LanguageContext";

// Small regions: label placed outside the map with a leader line [lon, lat]
const OUTSIDE_LABELS: Record<string, [number, number]> = {
  "MN-1": [110.8, 51.6],
  "MN-037": [105.2, 52.7],
  "MN-035": [100.8, 52.9],
  "MN-064": [114.5, 42.6],
};

const centroidOf = (geometry: any): [number, number] => {
  const pts: number[][] = [];
  const walk = (c: any) => { if (typeof c[0] === "number") pts.push(c); else c.forEach(walk); };
  walk(geometry.coordinates);
  const xs = pts.map((p) => p[0]); const ys = pts.map((p) => p[1]);
  return [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2];
};

interface MongoliaMapProps {
  /** Counts keyed by aimag.value (slug) */
  aimagStats: Record<string, { count: number }>;
}

export function MongoliaMap({ aimagStats }: MongoliaMapProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<am5.Root | null>(null);
  const { language } = useLanguage();
  const isMn = language === "mn";

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    const root = am5.Root.new(chartRef.current);
    rootRef.current = root;
    root.setThemes([am5themes_Animated.new(root)]);

    // Hide amCharts logo
    if (root._logo) {
      root._logo.dispose();
    }

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "translateX",
        panY: "translateY",
        projection: am5map.geoMercator(),
        wheelY: "none",
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 20,
        paddingRight: 20,
      })
    );

    // Build aimag-level data from real stats
    const aimagData = AIMAGS.map((a) => ({
      id: a.id,
      name: isMn ? a.label_mn : a.label_en,
      value: aimagStats[a.value]?.count || 0,
    }));

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        valueField: "value",
        calculateAggregates: true,
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: isMn ? "[bold]{name}[/]\nХарилцагч: {value}" : "[bold]{name}[/]\nClients: {value}",
      interactive: true,
      stroke: am5.color(0xffffff),
      strokeWidth: 1,
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x193c69),
    });

    polygonSeries.set("heatRules", [
      {
        target: polygonSeries.mapPolygons.template,
        dataField: "value",
        min: am5.color(0xdbeafe),
        max: am5.color(0x193c69),
        key: "fill",
      },
    ]);

    // Bubble (point) series to display the count number on top of each aimag
    const pointSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
        latitudeField: "lat",
        longitudeField: "lon",
      })
    );

    const lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
    lineSeries.mapLines.template.setAll({ stroke: am5.color(0x193c69), strokeWidth: 1.5, strokeOpacity: 0.7, strokeDasharray: [3, 3] });
    const dotSeries = chart.series.push(am5map.MapPointSeries.new(root, { latitudeField: "lat", longitudeField: "lon" }));
    dotSeries.bullets.push(() => am5.Bullet.new(root, { sprite: am5.Circle.new(root, { radius: 3.5, fill: am5.color(0x193c69) }) }));

    pointSeries.bullets.push((_root, _series, dataItem) => {
      const ctx = dataItem.dataContext as any;
      const isUb = ctx?.polygonId === "MN-1";
      const container = am5.Container.new(root, {
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        cursorOverStyle: "pointer",
      });

      // Soft outer glow
      container.children.push(
        am5.Circle.new(root, {
          radius: 22,
          fill: am5.color(0x193c69),
          fillOpacity: 0.12,
          centerX: am5.percent(50),
          centerY: am5.percent(50),
        })
      );

      // Pill background
      const pill = am5.RoundedRectangle.new(root, {
        cornerRadiusTL: 999,
        cornerRadiusTR: 999,
        cornerRadiusBL: 999,
        cornerRadiusBR: 999,
        fill: am5.color(isUb ? 0x193c69 : 0xffffff),
        stroke: am5.color(0x193c69),
        strokeWidth: 2,
        shadowColor: am5.color(0x193c69),
        shadowBlur: 12,
        shadowOffsetX: 0,
        shadowOffsetY: 2,
        shadowOpacity: 0.25,
      });
      container.children.push(pill);

      // Number label
      const label = am5.Label.new(root, {
        text: "{name}: {value}",
        fill: am5.color(isUb ? 0xffffff : 0x193c69),
        fontSize: isUb ? 15 : 11,
        fontWeight: "800",
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        paddingTop: isUb ? 6 : 3,
        paddingBottom: isUb ? 6 : 3,
        paddingLeft: isUb ? 14 : 8,
        paddingRight: isUb ? 14 : 8,
        populateText: true,
      });
      container.children.push(label);

      // Make pill size match label
      label.events.on("boundschanged", () => {
        const b = label.localBounds();
        const w = (b.right - b.left);
        const h = (b.bottom - b.top);
        pill.setAll({ width: w, height: h, centerX: w / 2, centerY: h / 2 });
      });

      if (isUb) container.animate({
        key: "scale",
        from: 1,
        to: 1.08,
        duration: 1600,
        easing: am5.ease.inOut(am5.ease.sine),
        loops: Infinity,
      });

      return am5.Bullet.new(root, { sprite: container, dynamic: true });
    });

    fetch("https://cdn.amcharts.com/lib/5/geodata/json/mongoliaLow.json")
      .then((r) => r.json())
      .then((geodata) => {
        polygonSeries.set("geoJSON", geodata);
        polygonSeries.data.setAll(aimagData);

        // Add point bullets only for aimags that have a count > 0
        const geoById: Record<string, any> = {};
        geodata.features.forEach((f: any) => (geoById[f.id] = f.geometry));
        const active = aimagData.filter((d) => d.value > 0 && geoById[d.id]);
        const lines: any[] = [];
        const dots: any[] = [];
        const pointData = active.map((d) => {
          const [clon, clat] = centroidOf(geoById[d.id]);
          const out = OUTSIDE_LABELS[d.id];
          if (out) {
            lines.push({ geometry: { type: "LineString", coordinates: [[clon, clat], out] } });
            dots.push({ lon: clon, lat: clat });
            return { polygonId: d.id, value: d.value, name: d.name, lon: out[0], lat: out[1] };
          }
          return { polygonId: d.id, value: d.value, name: d.name, lon: clon, lat: clat };
        });
        // Simple collision avoidance for inside labels (nudge vertically)
        const placed: any[] = [];
        pointData.forEach((pt) => {
          let tries = 0;
          while (placed.some((q) => Math.abs(q.lon - pt.lon) < 3.2 && Math.abs(q.lat - pt.lat) < 0.7) && tries < 6) {
            pt.lat -= 0.75;
            tries++;
          }
          placed.push(pt);
        });
        lineSeries.data.setAll(lines);
        dotSeries.data.setAll(dots);
        pointSeries.data.setAll(pointData);
      })
      .catch((err) => console.error("Failed to load Mongolia geodata", err));

    return () => {
      root.dispose();
    };
  }, [aimagStats, isMn]);

  // Reference AIMAG_BY_VALUE so tree-shaking keeps it (used implicitly via AIMAGS keys)
  void AIMAG_BY_VALUE;

  return <div ref={chartRef} className="w-full h-[460px] rounded-2xl overflow-hidden" />;
}

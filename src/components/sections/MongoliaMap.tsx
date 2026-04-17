import { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { AIMAGS, AIMAG_BY_VALUE } from "@/lib/aimags";

interface MongoliaMapProps {
  /** Counts keyed by aimag.value (slug) */
  aimagStats: Record<string, { count: number }>;
}

export function MongoliaMap({ aimagStats }: MongoliaMapProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<am5.Root | null>(null);

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    const root = am5.Root.new(chartRef.current);
    rootRef.current = root;
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "translateX",
        panY: "translateY",
        projection: am5map.geoMercator(),
        wheelY: "none",
      })
    );

    // Build aimag-level data from real stats
    const aimagData = AIMAGS.map((a) => ({
      id: a.id,
      name: a.label_mn,
      value: aimagStats[a.value]?.count || 0,
    }));

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        valueField: "value",
        calculateAggregates: true,
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "[bold]{name}[/]\nХарилцагч: {value}",
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
        polygonIdField: "polygonId",
      })
    );

    pointSeries.bullets.push(() => {
      const container = am5.Container.new(root, {});
      container.children.push(
        am5.Circle.new(root, {
          radius: 14,
          fill: am5.color(0x193c69),
          stroke: am5.color(0xffffff),
          strokeWidth: 2,
          fillOpacity: 0.95,
        })
      );
      container.children.push(
        am5.Label.new(root, {
          text: "{value}",
          fill: am5.color(0xffffff),
          fontSize: 12,
          fontWeight: "700",
          centerX: am5.percent(50),
          centerY: am5.percent(50),
        })
      );
      return am5.Bullet.new(root, { sprite: container });
    });

    fetch("https://cdn.amcharts.com/lib/5/geodata/json/mongoliaLow.json")
      .then((r) => r.json())
      .then((geodata) => {
        polygonSeries.set("geoJSON", geodata);
        polygonSeries.data.setAll(aimagData);

        // Add point bullets only for aimags that have a count > 0
        const pointData = aimagData
          .filter((d) => d.value > 0)
          .map((d) => ({
            polygonId: d.id,
            value: d.value,
            name: d.name,
          }));
        pointSeries.data.setAll(pointData);
      })
      .catch((err) => console.error("Failed to load Mongolia geodata", err));

    const heatLegend = chart.children.push(
      am5.HeatLegend.new(root, {
        orientation: "horizontal",
        startColor: am5.color(0xdbeafe),
        endColor: am5.color(0x193c69),
        startText: "Бага",
        endText: "Их",
        stepCount: 5,
        startOpacity: 1,
        endOpacity: 1,
        x: am5.percent(50),
        centerX: am5.percent(50),
        y: am5.percent(95),
        width: am5.percent(60),
      })
    );

    heatLegend.startLabel.setAll({ fontSize: 12, fill: am5.color(0x64748b) });
    heatLegend.endLabel.setAll({ fontSize: 12, fill: am5.color(0x193c69) });

    polygonSeries.events.on("datavalidated", () => {
      heatLegend.set("startValue", polygonSeries.getPrivate("valueLow") || 0);
      heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh") || 0);
    });

    polygonSeries.mapPolygons.template.events.on("pointerover", (ev) => {
      const value = (ev.target.dataItem as any)?.get("value");
      if (typeof value === "number") heatLegend.showValue(value);
    });

    return () => {
      root.dispose();
    };
  }, [aimagStats]);

  // Reference AIMAG_BY_VALUE so tree-shaking keeps it (used implicitly via AIMAGS keys)
  void AIMAG_BY_VALUE;

  return <div ref={chartRef} className="w-full h-[500px] rounded-2xl overflow-hidden" />;
}

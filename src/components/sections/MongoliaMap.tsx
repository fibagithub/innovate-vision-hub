import { useEffect, useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

// Map our internal region keys to Mongolian aimag IDs (ISO 3166-2:MN codes used by amCharts geodata)
// Each aimag belongs to one of our regional buckets.
const REGION_TO_AIMAGS: Record<string, string[]> = {
  ulaanbaatar: ["MN-1"], // Ulaanbaatar
  central: ["MN-67", "MN-61", "MN-39", "MN-69", "MN-57"], // Töv, Dornogovi, Hentii, Selenge, Darhan-Uul (central area)
  khangai: ["MN-55", "MN-65", "MN-37", "MN-35", "MN-73"], // Övörhangai, Arhangai, Bulgan, Orhon, Hövsgöl-ish (Khangai mountain region)
  west: ["MN-71", "MN-84", "MN-89", "MN-43", "MN-46"], // Bayan-Ölgii, Hovd, Govi-Altai, Uvs, Zavhan
  east: ["MN-51", "MN-63", "MN-47"], // Sühbaatar, Dornod, Dornogovi-east
  gobi: ["MN-59", "MN-41", "MN-53", "MN-64"], // Ömnögovi, Dundgovi, Govisümber, Bayanhongor
  north: ["MN-49"], // Hövsgöl
};

interface MongoliaMapProps {
  regionStats: Record<string, { count: number }>;
  totalCount: number;
}

export function MongoliaMap({ regionStats }: MongoliaMapProps) {
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

    // Build aimag-level data from region stats
    const aimagData: { id: string; value: number; regionKey: string }[] = [];
    Object.entries(REGION_TO_AIMAGS).forEach(([regionKey, aimagIds]) => {
      const totalForRegion = regionStats[regionKey]?.count || 0;
      // Distribute count evenly across aimags in that region (or show same count for highlight)
      const perAimag = aimagIds.length > 0 ? Math.max(1, Math.round(totalForRegion / aimagIds.length)) : 0;
      aimagIds.forEach((id) => {
        aimagData.push({
          id,
          value: totalForRegion > 0 ? perAimag : 0,
          regionKey,
        });
      });
    });

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSONpath: "https://cdn.amcharts.com/lib/5/geodata/json/mongoliaLow.json" as any,
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
        min: am5.color(0xdbeafe), // light blue
        max: am5.color(0x193c69), // FIBA primary
        key: "fill",
      },
    ]);

    // Load geodata via fetch to support TS typings
    fetch("https://cdn.amcharts.com/lib/5/geodata/json/mongoliaLow.json")
      .then((r) => r.json())
      .then((geodata) => {
        polygonSeries.set("geoJSON", geodata);
        polygonSeries.data.setAll(aimagData);
      })
      .catch((err) => console.error("Failed to load Mongolia geodata", err));

    // Heat legend
    const heatLegend = chart.children.push(
      am5.HeatLegend.new(root, {
        orientation: "horizontal",
        startColor: am5.color(0xdbeafe),
        endColor: am5.color(0x193c69),
        startText: "Бага",
        endText: "Их",
        stepCount: 5,
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
  }, [regionStats]);

  return <div ref={chartRef} className="w-full h-[500px] rounded-2xl overflow-hidden" />;
}

// JS for your graphic
import pym from "pym.js";
import { interval, selectAll, select, format } from "d3";
import { DateTime } from "luxon";

const draw = () => {
  const last = DateTime.fromISO("2004-10-29T20:00");
  const intervals = ["years", "months", "days", "hours", "minutes", "seconds"];
  interval(() => {
    const now = DateTime.fromJSDate(new Date());
    const d = now.diff(last, [...intervals, "milliseconds"]).toObject();

    d.seconds = format(".2f")(d.seconds + (Math.floor(d.milliseconds / 10) / 100));

    selectAll(".interval")
      .each(function() {
        if (d[this.id] === 0 && this.id === "months") {
          select(this).style("display", "none");
        }
        select(this).select(".number").text(d[this.id])
      });
  }, 25);
}

window.onload = () => {
  const pymChild = new pym.Child({ polling: 500 });
  pymChild.sendHeight();
  draw();
};

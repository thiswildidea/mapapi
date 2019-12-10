import mapconfig from '@/config/mapconfigshare.js'

const mapsenceViewPopup = {
  createContentpopup(fields, data) {
    let htmlstring = '';
    htmlstring += "<table>"
    for (let key in fields) {
      htmlstring += "<tr>";
      htmlstring += '<td class="tdlabel">';
      htmlstring += "<span>";
      htmlstring += fields[key];
      htmlstring += " :";
      htmlstring += "</span>";
      htmlstring += "</td>";
      htmlstring += '<td class="tdvalue">';
      htmlstring += "<span>";
      htmlstring += data[key] != null ? data[key] : "";
      htmlstring += "</span>";
      htmlstring += "</td>";
      htmlstring += "</tr>";
    }
    htmlstring += "</table>"
    return htmlstring;
  },
}

export default mapsenceViewPopup

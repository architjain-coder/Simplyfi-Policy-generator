// var element = document.getElementById('content')
// function stripHtml(html)
// {
//    let tmp = document.createElement("DIV");
//    tmp.innerHTML = html;
//    return tmp.textContent || tmp.innerText || "";
// }
// text = stripHtml(element.textContent.trim()).replace(/<[^>]*>?/gm, '');

// console.log(text)

chrome.storage.local.get("variable", function (data) {
      let getdata = data.variable;
      // sendToServer(getdata);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "text/plain");

     // var raw = "{\"url\": \"https://policies.google.com/privacy?hl=en-US\"}";
      var raw = JSON.stringify({"url":getdata});
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:5000/classify", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      console.log(getdata)
    });
  

// let n;
// let k = document.getElementsByClassName("t-18 t-black t-normal")[0].innerText;
// k = k.replace(",", "");
// k = k.split(" ");

// let total = parseInt(k[0]);
// let count = 0;

// let arr = new Set();
// let arr2 = new Set();
// let c = 1;

// function scrolldown(c) {
//   const timer = setTimeout(
//       function () {
//         window.scrollTo(0, document.body.scrollHeight);

//         ++count;
//         n = document.getElementsByClassName("presence-entity__image   EntityPhoto-circle-5 lazy-image ember-view").length;

//         const last = Array.from([...arr])[Array.from([...arr]).length - 1] || 0;
//         arr.add(n - last);
//         let data2 = parseInt(String((n / total) * 100));
//         if (!arr2.has(data2)) {
//           arr2.add(data2);
//           if (data2 > 0 && data2 % 10 >= 0 && data2 % 10 < 5) {
//             ++c;
//             scrap(n - last);
//             chrome.storage.local.set({variable1: data2});
//           }

//           if (total - 8 < n) {
//             scrap(n - last);
//           }
//         }

//         if (n <= total) {
//           scrolldown(c);
//         } else {
//           clearTimeout(timer);
//         }

//       }, 500
//   )
// }

// scrolldown(c)

// function download(content, fileName, contentType) {
//   let a = document.createElement("a");
//   let file = new Blob([content], {type: contentType});
//   a.href = URL.createObjectURL(file);
//   a.download = fileName;
//   a.click();
// }

// let oldCopy = 0, oldIndex = 0;

// function scrap(newIndex) {
//   let i;
//   let img = [];
//   let name1 = [];
//   let title = [];
//   let link1 = [];
//   for (let i = oldIndex; i < newIndex; i++) {
//     img.push(document.getElementsByClassName("presence-entity__image   EntityPhoto-circle-5 lazy-image ember-view")[i].src);
//     name1.push(document.getElementsByClassName("mn-connection-card__name t-16 t-black t-bold")[i].innerText);
//     title.push(document.getElementsByClassName("mn-connection-card__occupation t-14 t-black--light t-normal")[i].innerText);
//     link1.push(document.getElementsByClassName("ember-view mn-connection-card__link")[i].href);
//   }
//   oldCopy = oldIndex;
//   oldIndex = newIndex;

//   chrome.storage.local.get("variable", function (data) {
//     let getdata = data.variable;
//     sendToServer(getdata);
//   });

//   function sendToServer(getdata) {
//     let id = getdata["id"];
//     let name = id + '.csv';

//     const rows = [];
//     let fields = [" ", "name", "position_api", "company-api", "link", "description", "city", "state", "position_api_1", "company_api_1", "location", "skills", "connected on", "image link", "title"]
//     rows.push(fields)
//     for (i = 0; i < name1.length; i++) {
//       let row = []
//       row.push("")
//       row.push(name1[i]);
//       row.push("")
//       row.push("")
//       row.push(link1[i]);
//       row.push("")
//       row.push("")
//       row.push("")
//       row.push("")
//       row.push("")
//       row.push("")
//       row.push("")
//       row.push("");
//       row.push(img[i]);
//       row.push(title[i]);
//       rows.push(row)
//     }

//     let csvContent = "";
//     rows.forEach(function (rowArray) {
//       let row = rowArray.join(",");
//       csvContent += row + "\r\n";
//     });

//     // download(csvContent, oldCopy + '_' + newIndex + '_' + name, 'text/csv');
//     send(csvContent, name, 'text/csv', getdata)
//   }

//   function send(content, fileName, contentType, getdata) {
//     let file = new Blob([content], {type: contentType});
//     let myHeaders = new Headers();
//     myHeaders.append("Authorization", "Bearer " + getdata["token"]);

//     let formdata = new FormData();
//     formdata.append("file", file, fileName);

//     let requestOptions = {
//       method: 'PUT',
//       headers: myHeaders,
//       body: formdata,
//       redirect: 'follow'
//     };

//     fetch("https://api.suitable.ai/potential-applicant/connections", requestOptions)
//         .then(response => response.text())
//         .then(result => console.log(result))
//         .catch(error => console.log('error', error));

//   }
// }


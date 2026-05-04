function start(){
const name=username.value;
localStorage.setItem("username",name);
loginBox.style.display="none";
app.style.display="block";
welcome.innerText="Welcome "+name;
load();
}

function saveEntry(){
const data={
title:title.value,
entry:entry.value,
prayer:prayer.value,
date:new Date().toLocaleString()
};

let entries=JSON.parse(localStorage.getItem("entries")||"[]");
entries.unshift(data);
localStorage.setItem("entries",JSON.stringify(entries));
load();
alert("Saved!");
}

function load(){
let entries=JSON.parse(localStorage.getItem("entries")||"[]");
entriesDiv.innerHTML="";
entries.forEach(d=>{
entriesDiv.innerHTML+=`
<div class="entry">
<h3>${d.title}</h3>
<p>${d.entry}</p>
<p>${d.prayer}</p>
<small>${d.date}</small>
</div>`;
});
}

function downloadPDF(){
const {jsPDF}=window.jspdf;
const doc=new jsPDF();

let entries=JSON.parse(localStorage.getItem("entries")||"[]");
let y=10;

entries.forEach(d=>{
doc.text(d.title,10,y); y+=10;
doc.text(d.entry,10,y); y+=10;
doc.text(d.prayer,10,y); y+=10;
});

doc.save("Diary.pdf");
}

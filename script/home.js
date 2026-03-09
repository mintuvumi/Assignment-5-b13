const API="https://phi-lab-server.vercel.app/api/v1/lab/issues"

const container=document.getElementById("issuesContainer")
const loader=document.getElementById("loader")

const allBtn=document.getElementById("allBtn")
const openBtn=document.getElementById("openBtn")
const closedBtn=document.getElementById("closedBtn")

const search=document.getElementById("searchInput")

let issues=[]

function setActive(btn){

document.querySelectorAll(".tabBtn").forEach(b=>{
b.classList.remove("bg-purple-600","text-white")
b.classList.add("bg-white")
})

btn.classList.add("bg-purple-600","text-white")

}

async function loadIssues(){

loader.classList.remove("hidden")

const res=await fetch(API)
const data=await res.json()

issues=data.data

displayIssues(issues)

loader.classList.add("hidden")

}

function displayIssues(data){

container.innerHTML=""

data.forEach(issue=>{

const border=issue.status==="open"
?"border-t-green-500"
:"border-t-purple-600"

const icon = issue.status==="open"
? "./assets/open-status.png"
: "./B13-A5-Github-Issue-Tracker/assets/Closed-Status.png"

const card=document.createElement("div")

card.className = `bg-white border border-4 rounded-xl ${border} p-5 hover:shadow-md transition cursor-pointer`

card.innerHTML=`

<div class="flex justify-between items-center gap-3">

<img src="${icon}" class="w-8 h-8">

<span class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
${issue.priority}
</span>

</div>

<h3 class="font-semibold mt-3 text-sm">
${issue.title}
</h3>

<p class="text-xs text-gray-500 mt-2">
${issue.description.slice(0,80)}...
</p>

<div class="mt-3 flex gap-2">

${issue.labels.map(label =>
`<span class="text-xs bg-red-50 text-red-500 px-2 py-1 rounded-full">${label}</span>`
).join("")}

</div>

<br>

<hr class="border border-gray-300">

<div class="flex justify-between">

<h2 class="text-xs text-gray-400 mt-4">
#${issue.id} by ${issue.author}
</h2>

<p class="text-xs text-gray-400 mt-4">
• ${new Date(issue.createdAt).toLocaleDateString()}
</p>

</div>

`

card.onclick=()=>loadDetails(issue.id)

container.appendChild(card)

})

}

allBtn.onclick=()=>{
setActive(allBtn)
displayIssues(issues)
}

openBtn.onclick=()=>{

setActive(openBtn)

const open=issues.filter(i=>i.status==="open")

displayIssues(open)

}

closedBtn.onclick=()=>{

setActive(closedBtn)

const closed=issues.filter(i=>i.status==="closed")

displayIssues(closed)

}

search.addEventListener("keyup",async()=>{

const text=search.value

if(text===""){
displayIssues(issues)
return
}

const res=await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)

const data=await res.json()

displayIssues(data.data)

})

async function loadDetails(id){

const res=await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)

const data=await res.json()

const issue=data.data

document.getElementById("modalTitle").innerText=issue.title
document.getElementById("modalDesc").innerText=issue.description
document.getElementById("modalUser").innerText=issue.author
document.getElementById("modalPriority").innerText=issue.priority

document.getElementById("modalMeta").innerHTML=`
<span class="bg-green-500 text-white px-3 py-1 rounded-full text-xs">${issue.status}</span>
<span>Opened by ${issue.author}</span>
`

document.getElementById("modalLabels").innerHTML=
issue.labels.map(l =>
`<span class="border border-red-400 text-red-500 px-3 py-1 rounded-full text-xs">${l}</span>`
).join("")

document.getElementById("issueModal").classList.remove("hidden")

}

function closeModal(){

document.getElementById("issueModal").classList.add("hidden")

}

loadIssues()
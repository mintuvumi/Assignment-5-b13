const API="https://phi-lab-server.vercel.app/api/v1/lab/issues"



const container=document.getElementById("issuesContainer")
const loader=document.getElementById("loader")

const allBtn=document.getElementById("allBtn")
const openBtn=document.getElementById("openBtn")
const closedBtn=document.getElementById("closedBtn")

const search=document.getElementById("search")

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

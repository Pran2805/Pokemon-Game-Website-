const innerDiv = document.getElementById('inner-div')
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576


const mapPosWidth = -790
const mapPosHeight = -650
const speed = 3
const widthMap = 48;
const heightMap = 48;

const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
}

const collisionsMap = []
const boundaries = []
const battleZonesMap = []

const battleZones = []

const battle = {
    initiated: false
}
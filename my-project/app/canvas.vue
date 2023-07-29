<template>
    <!-- <div class="h-full w-full flex items-center justify-center">
        <div
            class="flex items-center justify-center canvas-container w-full h-full bg-canvas"
            ref="parentCanvas"
        >
            <canvas id="canvas" ref="canvas" class="absolute w-full h-full"></canvas>
        </div>
    </div> -->

    <div
        class="flex items-center justify-center canvas-container w-full h-full bg-canvas"
        ref="parentCanvas"
    >
        <canvas id="canvas" class="absolute"></canvas>
    </div>
</template>

<script>
import { fabric } from 'fabric'
const SEGMENTATION = 'segmentation'
const RECTANGLE = 'rectangle'
const AUTOSEGMENT = 'auto-segment'
const AUTORECTANGLE = 'auto-rectangle'

class CheckButton extends fabric.Circle {
    constructor(options) {
        super(options)
        this.set({
            type: 'check-button',
            radius: 10,
            fill: 'green',
            stroke: 'white',
            strokeWidth: 2,
            selectable: true,
            label: '✓',
            fontSize: 16,
            fontWeight: 'bold',
            fontFamily: 'Arial',
            textAlign: 'center',
            textBackgroundColor: 'transparent',
        })
    }

    _render(ctx) {
        super._render(ctx)

        // Draw the background circle
        ctx.beginPath()
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, false)
        ctx.fillStyle = this.fill // Set fill color for the circle background
        ctx.fill()
        ctx.closePath()

        // Draw the checkmark symbol
        ctx.font = `${this.fontSize}px ${this.fontFamily}`
        ctx.fillStyle = this.stroke
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(this.label, 0, 0)

        // Make the background circle selectable
        this.selectable = true
    }

    getBoundingRect() {
        const padding = this.strokeWidth / 2
        const minX = this.left - this.radius - padding
        const minY = this.top - this.radius - padding
        const maxX = this.left + this.radius + padding
        const maxY = this.top + this.radius + padding
        return new fabric.Rect({
            left: minX,
            top: minY,
            width: maxX - minX,
            height: maxY - minY,
        })
    }
}

// Custom CrossButton class
class CrossButton extends fabric.Circle {
    constructor(options) {
        super(options)
        this.set({
            type: 'cross-button',
            radius: 10,
            fill: 'red',
            stroke: 'white',
            strokeWidth: 2,
            // originX: 'center',
            // originY: 'center',
            selectable: true,
            label: '✗',
            fontSize: 16,
            fontWeight: 'bold',
            fontFamily: 'Arial',
            textAlign: 'center',
            textBackgroundColor: 'transparent',
        })
        //this.on('added', this.attachListeners.bind(this))
    }

    _render(ctx) {
        //this.callSuper('_render', ctx)
        super._render(ctx)

        // Draw the background circle
        ctx.beginPath()
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, false)
        ctx.fillStyle = this.fill // Set fill color for the circle background
        ctx.fill()
        ctx.closePath()

        // Draw the cross symbol
        ctx.font = `${this.fontSize}px ${this.fontFamily}`
        ctx.fillStyle = this.stroke
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(this.label, 0, 0)
        // Make the background circle selectable
        this.selectable = true
    }
}

export default {
    data() {
        return {
            canvas: null,
            imageSize: null,
            image: null,
            imageUrl: null,
            scaleFactor: null,
            zoomScale: 1,
            lastClickedRectangle: null,
            selectedObject: false,
            canvasGrid: 50,
            textArray: [], // the array of annotated text
            textCenter: [], //the array of center plus
            imageSize: { imageWidth: 0, imageHeight: 0 },
            annotationLoad: false,
            annotationList: [],
            storedColorCategory: null,
            isDrawing: false,
            startPosition: null,
            initPosition: null,
            updateAnnotationTimeout: null,
            imagePath: null,
            storeObject: [],
            lastX: null,
            lastY: null,
            mouseMove: null,
            movingStatus: false,
            removedObjects: null,
            removedObjectsPositions: null,
            isSelecting: false,
            drawingRect: null,
            isDown: false,
            removeAllAnnotations: [],
            unlockCanvas: true,
            showGridStatus: 'normal',
            gridData: {
                annotations: [],
            },
            savedCanvas: null,
            savedViewportTransform: [1, 0, 0, 1, 0, 0],
            nearestObject: null,
            segmentation: [],
            points: [],
            min: 99,
            max: 999999,
            polygonMode: RECTANGLE,
            pointArray: [], //pointArray of adding point
            circleArray: [], //array of drawing point
            checkArray: [], //array of check button
            crossArray: [], //array of cross button/
            activeLine: null,
            activeShape: null,
            activeCircle: null,
            drawingPolygon: false,
            updatedInfo: null,
            selectedPolygonModeObject: null,
            objectSelectedPolygon: null,
            previousTarget: null,
            saveDrawSegmentation: false,
            selectedPolygonAddingPoint: null,
            movingCircle: false,
            movingPolygonStatus: false, //moving polygon or circle
            selectedCircle: null,
            selectedObjectAddingSegment: null,
            temporaryCircle: [],
            removeTempCircle: null,
            loadingSegmentationMode: false, //Using for receving data from the database
        }
    },
    setup() {
        let canvas = null
        return {
            canvas,
        }
    },
    mounted() {
        //render new canvas
        this.canvas = new fabric.Canvas('canvas', { selection: true })
        fabric.Object.prototype.transparentCorners = false
        this.canvas.uniformScaling = false

        this.canvas.hoverCursor = 'default'

        const { clientWidth, clientHeight } = this.$refs.parentCanvas

        // Initialize the size of the canvas
        this.canvas.setDimensions({
            width: clientWidth - 12,
            height: clientHeight,
        })

        // Initialize the size of the image
        this.imageSize = {
            imageWidth: this.canvas.width,
            imageHeight: this.canvas.height,
        }

        //Zoom function with using the mouse
        this.canvas.on('mouse:wheel', this.handleMouseWheel)

        // Add event listener to document for contextmenu events
        document.addEventListener('contextmenu', this.disableContextMenu, false)

        // Wait for the canvas to be initialized before adding the event listener
        this.$nextTick(() => {
            window.addEventListener('keydown', this.handleKeyDown)
        })

        //Panning the image on the canvas
        this.canvas.on('mouse:move', this.handleMouseMove)

        //Mouse over the canvas to show the selected object
        this.canvas.on('mouse:over', (event) => {
            this.handleMouseOver(event)
        })

        // mouse out to revert the border color
        //this.canvas.on('mouse:out', this.handleMouseOut)

        //Using mouse down for drawing a new annotation
        this.canvas.on('mouse:down', (event) => {
            this.handleMouseDown(event)
        })

        //Using mouse up for drawing a new annotation
        this.canvas.on('mouse:up', (event) => {
            this.handleMouseUp(event)
        })

        //Scaling the object on canvas
        this.canvas.on('object:scaling', this.handleObjectScaling)

        //Moving the object on canvas
        this.canvas.on('object:moving', this.handleObjectMoving)

        //Responsive the canvas
        window.addEventListener('resize', this.logParentClientWidth.bind(this))
    },
    created() {},

    methods: {
        handleMouseWheel(opt) {
            const delta = -opt.e.deltaY
            const minZoom = 0.5
            const maxZoom = 200
            const zoomChangeRate = 600

            let zoom = this.canvas.getZoom() + delta / zoomChangeRate
            zoom = Math.max(minZoom, Math.min(maxZoom, zoom))

            //Zoom at the cursor point
            this.canvas.zoomToPoint(
                { x: opt.e.offsetX, y: opt.e.offsetY },
                zoom
            )

            this.imageSize.imageWidth = this.canvas.width * zoom
            this.imageSize.imageHeight = this.canvas.height * zoom
            //console.log('check zoom: ', zoom)
            this.zoomScale = zoom
            this.savedViewportTransform = this.canvas.viewportTransform

            this.canvas.getObjects().forEach(function (obj) {
                if (obj.type === 'rect') {
                    //console.log('this line work')
                    obj.set({
                        strokeWidth: 2 / zoom,
                    })
                    obj.centerPlus.set({
                        fontSize: 40 / zoom,
                    })
                }
            })

            opt.e.preventDefault()
            opt.e.stopPropagation()
        },

        handleMouseMove(event) {
            const pointer = this.canvas.getPointer(event.e)
            const target = event.target
            //this.canvas.discardActiveObject()
            const previousTarget = this.previousTarget
            if (target && target.type === 'circle') {
                // console.log('show circle: ', target)
                return
            }
            // if (target && target.type === 'circle') {
            //     target.setCoords() // Update the coordinates of the circle object

            //     if (!target.selectable) {
            //         target.set({
            //             selectable: true,
            //         })

            //         this.canvas.renderAll()
            //     }

            //     // Handle interactions with the circle point here

            //     //console.log('Circle point position:', target.left, target.top)
            // }

            if (
                target &&
                (target.type === 'check-button' ||
                    target.type === 'cross-button')
            ) {
                if (target.type === 'check-button') {
                    target.set('fill', 'lightgreen')
                    this.previousTarget = target
                }
                if (target.type === 'cross-button') {
                    target.set('fill', 'lightcoral')
                    this.previousTarget = target
                }
                // Render the canvas to apply the changes
                this.canvas.renderAll()
            }
            //console.log('check previous target init: ', previousTarget)
            if (previousTarget) {
                //console.log('check previous target: ', previousTarget)
                if (previousTarget.type === 'check-button') {
                    previousTarget.set('fill', 'green')
                }
                if (previousTarget.type === 'cross-button') {
                    previousTarget.set('fill', 'red')
                }
            }

            const objects = this.canvas
                .getObjects()
                .filter(
                    (object) =>
                        object.type === 'rect' || object.type === 'polygon'
                )

            // const objectCircle = this.canvas
            //     .getObjects()
            //     .filter((object) => object.type === 'circle')

            const tolerance = 10 // Adjust this value as needed
            // let nearestObject = null
            // let previousStroke = null
            // let previousFill = null
            if (this.polygonMode === RECTANGLE) {
                for (let i = 0; i < objects.length; i++) {
                    const object = objects[i]
                    const rectCenterX =
                        object.left + (object.width * object.scaleX) / 2
                    const rectCenterY =
                        object.top + (object.height * object.scaleY) / 2
                    const rectLeft = object.left
                    const rectTop = object.top
                    const rectRight = rectLeft + object.width * object.scaleX
                    const rectBottom = rectTop + object.height * object.scaleY
                    const strokeWidth = object.strokeWidth || 0
                    const toleranceEdge = 5 // Adjust this value as needed

                    if (
                        (pointer.x >= rectCenterX - tolerance &&
                            pointer.x <= rectCenterX + tolerance &&
                            pointer.y >= rectCenterY - tolerance &&
                            pointer.y <= rectCenterY + tolerance) ||
                        (pointer.x >= rectLeft - strokeWidth - toleranceEdge &&
                            pointer.x <=
                                rectLeft + strokeWidth + toleranceEdge &&
                            rectTop <= pointer.y &&
                            pointer.y <= rectBottom) ||
                        (pointer.x >= rectRight - strokeWidth - toleranceEdge &&
                            pointer.x <=
                                rectRight + strokeWidth + toleranceEdge &&
                            rectTop <= pointer.y &&
                            pointer.y <= rectBottom) ||
                        (pointer.y >= rectTop - strokeWidth - toleranceEdge &&
                            pointer.y <=
                                rectTop + strokeWidth + toleranceEdge &&
                            rectLeft <= pointer.x &&
                            pointer.x <= rectRight) ||
                        (pointer.y >=
                            rectBottom - strokeWidth - toleranceEdge &&
                            pointer.y <=
                                rectBottom + strokeWidth + toleranceEdge &&
                            rectLeft <= pointer.x &&
                            pointer.x <= rectRight)
                    ) {
                        // Mouse is near the bottom edge of the object
                        // Add your logic here for handling the object event
                        //console.log('Mouse is near the object:', object)
                        this.canvas.setActiveObject(object)
                        this.nearestObject = object
                        break
                    } else {
                        this.nearestObject = null
                        this.$store.dispatch(
                            'editor/selectAnnotationFromCanvas',
                            null
                        )
                    }
                }

                if (this.nearestObject) {
                    // Mouse is near the nearest object

                    if (!this.isDrawing) {
                        //show the annotation on the right hand side
                        this.$store.dispatch(
                            'editor/selectAnnotationFromCanvas',
                            this.nearestObject.id
                        )

                        // Set stroke and fill to yellow
                        this.nearestObject.set('stroke', 'yellow')
                        if (this.nearestObject.centerPlus) {
                            this.nearestObject.centerPlus.set('fill', 'yellow')
                        }

                        // Render the canvas to apply the changes
                        this.canvas.renderAll()
                    } else {
                        this.nearestObject = null
                    }
                } else {
                    // Mouse is not near any object

                    // else {
                    //     this.canvas.discardActiveObject().renderAll()
                    // }

                    this.canvas.discardActiveObject()
                }
            } else {
                this.nearestObject = null
            }

            //     this.canvas.renderAll()
            // }
            //this.canvas.discardActiveObject()

            //Using the pointer and zoom with key c,v
            this.initPosition = pointer

            //Drawing the temporarily selection box
            if (
                this.isDrawing &&
                this.drawingRect &&
                Math.abs(pointer.x - this.startPosition.x) >= 2 &&
                Math.abs(pointer.y - this.startPosition.y) >= 2 &&
                this.polygonMode === RECTANGLE
            ) {
                if (this.startPosition.x > pointer.x) {
                    this.drawingRect.set({ left: Math.abs(pointer.x) })
                }
                if (this.startPosition.y > pointer.y) {
                    this.drawingRect.set({ top: Math.abs(pointer.y) })
                }
                this.drawingRect.set({
                    width: Math.abs(this.startPosition.x - pointer.x),
                })
                this.drawingRect.set({
                    height: Math.abs(this.startPosition.y - pointer.y),
                })
                this.canvas.renderAll()
            }

            //pan the image
            if (this.lastX !== null && this.lastY !== null) {
                const parentElement = this.$refs.parentCanvas
                const parentBounds = parentElement.getBoundingClientRect()

                const isMoving =
                    (event.e.buttons === 1 &&
                        (event.e.altKey || event.e.metaKey)) ||
                    event.e.buttons === 2

                if (isMoving && this.checkWithinBounds(event, parentBounds)) {
                    const deltaX = event.e.offsetX - this.lastX
                    const deltaY = event.e.offsetY - this.lastY
                    this.canvas.relativePan({ x: deltaX, y: deltaY })
                    this.savedViewportTransform = this.canvas.viewportTransform
                }
            }

            this.lastX = event.e.offsetX
            this.lastY = event.e.offsetY
        },
        handleMouseOver(event) {
            const target = event.target
            const pointer = this.canvas.getPointer(event.e)
            //console.log('checkOver target: ', target)
            // if (target && (target.type === 'check-button' || target.type === 'cross-button')) {
            //     console.log('mouse over object: ', target)
            //     if (target.type === 'check-button') {
            //         target.set('fill', 'lightgreen')
            //     }
            //     if (target.type === 'cross-button') {
            //         target.set('fill', 'lightcoral')
            //     }
            //     this.canvas.renderAll()
            // }
        },

        handleMouseOut(event) {
            const target = event.target
            //console.log('mouse out target: ', target)

            // Revert stroke and fill to previous values
            if (this.nearestObject) {
                if (this.nearestObject.info) {
                    this.nearestObject.set(
                        'stroke',
                        this.generateColorFromWord(
                            this.nearestObject.info.category
                        )
                    )

                    if (this.nearestObject.centerPlus) {
                        this.nearestObject.centerPlus.set(
                            'fill',
                            this.generateColorFromWord(
                                this.nearestObject.info.category
                            )
                        )
                    }
                }
                if (this.nearestObject.category) {
                    this.nearestObject.set(
                        'stroke',
                        this.generateColorFromWord(this.nearestObject.category)
                    )

                    if (this.nearestObject.centerPlus) {
                        this.nearestObject.centerPlus.set(
                            'fill',
                            this.generateColorFromWord(
                                this.nearestObject.category
                            )
                        )
                    }
                }
            }

            if (target && target.type === 'rect') {
                //console.log('check it works')
                target.set(
                    'stroke',
                    this.generateColorFromWord(target.info.category)
                ) // Set the default stroke color here
                target.centerPlus.set(
                    'fill',
                    this.generateColorFromWord(target.info.category)
                )
                // this.canvas.getObjects().forEach((obj) => {
                //     if (obj.id !== target.id) {
                //         obj.set('opacity', 1)
                //     }
                // })
            }
            if (target && target.type === 'polygon') {
                //console.log('check it works polygon')
                target.set(
                    'stroke',
                    this.generateColorFromWord(target.category)
                ) // Set the default stroke color here
                target.centerPlus.set(
                    'fill',
                    this.generateColorFromWord(target.category)
                )
                // this.canvas.getObjects().forEach((obj) => {
                //     if (obj.id !== target.id) {
                //         obj.set('opacity', 1)
                //     }
                // })
            }
            // if (target) {
            //     console.log('mouse out object: ', target)
            //     if (target.type === 'check-button') {
            //         target.set('fill', 'green')
            //     }
            //     if (target.type === 'cross-button') {
            //         target.set('fill', 'red')
            //     }
            // }
            this.canvas.discardActiveObject()
            this.$store.dispatch('editor/selectAnnotationFromCanvas', null)
            this.canvas.renderAll()
        },

        computeRectDimensions(pointer) {
            // select the position of the mouse to draw the object inside the image
            let width, height, left, top

            // compute the width and height of the image, taking into account the zoom level
            const imageWidth = this.image.width * this.scaleFactor
            const imageHeight = this.image.height * this.scaleFactor

            //Set up the position of the annotation
            if (
                pointer.x > this.startPosition.x &&
                pointer.y > this.startPosition.y
            ) {
                left = this.startPosition.x
                top = this.startPosition.y
                if (pointer.x > imageWidth && pointer.y > imageHeight) {
                    width = imageWidth - this.startPosition.x
                    height = imageHeight - this.startPosition.y
                } else if (pointer.x > imageWidth) {
                    width = imageWidth - this.startPosition.x
                    height = pointer.y - this.startPosition.y
                } else if (pointer.y > imageHeight) {
                    width = pointer.x - this.startPosition.x
                    height = imageHeight - this.startPosition.y
                } else {
                    width = pointer.x - this.startPosition.x
                    height = pointer.y - this.startPosition.y
                }
            } else if (
                pointer.x > this.startPosition.x &&
                pointer.y < this.startPosition.y
            ) {
                left = this.startPosition.x

                if (pointer.x > imageWidth && pointer.y < 0) {
                    width = imageWidth - this.startPosition.x
                    height = 0 - this.startPosition.y
                    top = 0
                } else if (pointer.x > imageWidth) {
                    width = imageWidth - this.startPosition.x
                    height = pointer.y - this.startPosition.y
                    top = pointer.y
                } else if (pointer.y < 0) {
                    width = pointer.x - this.startPosition.x
                    height = 0 - this.startPosition.y
                    top = 0
                } else {
                    width = pointer.x - this.startPosition.x
                    height = pointer.y - this.startPosition.y
                    top = pointer.y
                }
            } else if (
                pointer.x < this.startPosition.x &&
                pointer.y > this.startPosition.y
            ) {
                top = this.startPosition.y
                if (pointer.x < 0 && pointer.y > imageHeight) {
                    width = 0 - this.startPosition.x
                    height = imageHeight - this.startPosition.y
                    left = 0
                } else if (pointer.x < 0) {
                    width = 0 - this.startPosition.x
                    height = pointer.y - this.startPosition.y
                    left = 0
                } else if (pointer.y > imageHeight) {
                    width = pointer.x - this.startPosition.x
                    height = imageHeight - this.startPosition.y
                    left = pointer.x
                } else {
                    width = pointer.x - this.startPosition.x
                    height = pointer.y - this.startPosition.y
                    left = pointer.x
                }
            } else {
                if (pointer.x < 0 && pointer.y < 0) {
                    width = 0 - this.startPosition.x
                    height = 0 - this.startPosition.y
                    left = 0
                    top = 0
                } else if (pointer.x < 0) {
                    width = 0 - this.startPosition.x
                    height = pointer.y - this.startPosition.y
                    left = 0
                    top = pointer.y
                } else if (pointer.y < 0) {
                    width = pointer.x - this.startPosition.x
                    height = 0 - this.startPosition.y
                    top = 0
                    left = pointer.x
                } else {
                    width = pointer.x - this.startPosition.x
                    height = pointer.y - this.startPosition.y
                    left = pointer.x
                    top = pointer.y
                }
            }
            return { width, height, left, top }
        },

        isPointerInsideImageZoom1(pointer) {
            if (!pointer) return
            // set the pointer inside the image
            let imageWidth = 0,
                imageHeight = 0
            if (this.image) {
                imageWidth = this.image.width * this.scaleFactor
                imageHeight = this.image.height * this.scaleFactor
            }

            return (
                pointer.x < 0 ||
                pointer.y < 0 ||
                pointer.x > imageWidth ||
                pointer.y > imageHeight
            )
        },
        addPoint(options) {
            if (this.polygonMode === SEGMENTATION) {
                this.$store.dispatch(
                    'editor/setEditorActionMessage',
                    'Adding a new point to create a new polygon. Enter to finish. Esc to abort'
                )
            }
            if (this.polygonMode === AUTOSEGMENT) {
                this.$store.dispatch(
                    'editor/setEditorActionMessage',
                    'Adding a new point to create a new polygon to ask for a segmented polygon. Enter to finish. Esc to abort'
                )
            }

            const pointer = this.canvas.getPointer(options.e)
            const random =
                Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
            const id = new Date().getTime() + random
            const circle = new fabric.Circle({
                radius: 5,
                fill: '#ffffff',
                stroke: '#333333',
                strokeWidth: 0.5,
                left: pointer.x,
                top: pointer.y,
                selectable: true,
                hasBorders: false,
                hasControls: false,
                originX: 'center',
                originY: 'center',
                id: id,
            })
            // Check if there is an existing circle at the mouse position
            const existingCircle = this.pointArray.find((circle) => {
                const { left, top } = circle
                const distance = Math.sqrt(
                    Math.pow(pointer.x - left, 2) + Math.pow(pointer.y - top, 2)
                )
                return distance <= circle.radius
            })

            // If an existing circle is found, exit the function
            if (existingCircle) {
                this.activeCircle = existingCircle
                return
            }
            let cat =
                this.$store.getters['editor/selectedCategory'] ||
                this.$store.getters['project/getData'].categoriesjson
                    .categories[0]

            circle.on('moving', (event) => {
                if (circle.isMoving) {
                    const circleIndex = this.pointArray.findIndex(
                        (point) => point.id === circle.id
                    )
                    if (circleIndex !== -1) {
                        this.pointArray[circleIndex].left = circle.left
                        this.pointArray[circleIndex].top = circle.top
                        this.updatePolygon()
                        //console.log('check polygon pointArray: ', this.pointArray)
                    }
                    if (this.objectSelectedPolygon) {
                        this.objectSelectedPolygon.set({
                            selectable: true,
                            evented: true,

                            lockMovementX: false,
                            lockMovementY: false,
                        })
                        this.objectSelectedPolygon = null
                    }
                }
            })

            if (this.activeShape) {
                const pos = this.canvas.getPointer(options.e)
                const points = this.activeShape.get('points')
                points.push({
                    x: pos.x,
                    y: pos.y,
                })
                //this.canvas.remove(this.activeShape)
                const polygonIdToRemove = this.activeShape.id
                this.canvas.forEachObject((object) => {
                    if (
                        object.id === polygonIdToRemove &&
                        object.type === 'polygon'
                    ) {
                        this.canvas.remove(object) // Remove the existing polygon by ID
                    }
                })

                const polygon = new fabric.Polygon(points, {
                    stroke: '#cccccc',
                    strokeWidth: 2,
                    fill: '#ffffff',
                    opacity: 0.3,
                    selectable: false,
                    hasBorders: false,
                    hasControls: false,
                    evented: false,
                })

                polygon.category = cat

                this.canvas.add(polygon)
                polygon.id = id
                this.activeShape = polygon
                this.canvas.renderAll()
            } else {
                const pos = this.canvas.getPointer(options.e)
                const polyPoint = [
                    {
                        x: pos.x,
                        y: pos.y,
                    },
                ]

                const polygon = new fabric.Polygon(polyPoint, {
                    stroke: '#cccccc',
                    strokeWidth: 2,
                    fill: '#ffffff',
                    opacity: 0.3,
                    selectable: false,
                    hasBorders: false,
                    hasControls: false,
                    evented: false,
                })
                polygon.category = cat
                polygon.id = id
                this.canvas.add(polygon)
                this.activeShape = polygon
            }

            //this.activeLine = line
            this.pointArray.push(circle)
            //this.lineArray.push(line)
            //this.canvas.add(line)
            this.canvas.add(circle)
            this.canvas.selection = false
        },
        updatePolygon() {
            const points = this.pointArray.map((circle) => ({
                x: circle.left,
                y: circle.top,
            }))

            if (this.activeShape) {
                //console.log('check active shape: ', this.activeShape)
                const polygonIdToRemove = this.activeShape.id
                this.canvas.forEachObject((object) => {
                    if (
                        object.id === polygonIdToRemove &&
                        object.type === 'polygon'
                    ) {
                        this.canvas.remove(object) // Remove the existing polygon by ID
                    }
                })
            }

            const polygon = new fabric.Polygon(points, {
                stroke: '#cccccc',
                strokeWidth: 2,
                fill: '#ffffff',
                opacity: 0.3,
                selectable: false,
                hasBorders: false,
                hasControls: false,
                evented: false,
            })

            this.canvas.add(polygon)
            this.activeShape = polygon
            this.canvas.renderAll()
        },
        generatePolygon(pointArray) {
            const points = []
            // console.log('point array: ', pointArray)
            pointArray.forEach((point) => {
                points.push({
                    x: point.left,
                    y: point.top,
                })
                //this.canvas.remove(point)
            })

            this.activeLine = null
            this.activeShape = null
            this.removeTempCircle = null
            this.selectedCircle = null
            this.pointArray = []
            //this.polygonMode = false
            //this.canvas.selection = true
        },
        revertColorPreviousObject() {
            //Revert color of selected object
            if (this.selectedPolygonModeObject) {
                //this.canvas.bringToFront(this.selectedPolygonModeObject)
                if (this.selectedPolygonModeObject.type === 'rect') {
                    this.selectedPolygonModeObject.set(
                        'stroke',
                        this.generateColorFromWord(
                            this.selectedPolygonModeObject.info.category
                        )
                    )
                    if (this.selectedPolygonModeObject.centerPlus) {
                        this.selectedPolygonModeObject.centerPlus.set(
                            'fill',
                            this.generateColorFromWord(
                                this.selectedPolygonModeObject.info.category
                            )
                        )
                    }
                } else if (this.selectedPolygonModeObject.type === 'polygon') {
                    console.log(
                        'check category of polygon: ',
                        this.selectedPolygonModeObject
                    )
                    this.selectedPolygonModeObject.set(
                        'stroke',
                        this.generateColorFromWord(
                            this.selectedPolygonModeObject.category
                        )
                    )
                    this.selectedPolygonModeObject.centerPlus.set(
                        'fill',
                        this.generateColorFromWord(
                            this.selectedPolygonModeObject.category
                        )
                    )
                }

                this.selectedPolygonModeObject = null
            }
        },
        resetActiveObject() {
            // Revert the stroke color of the previously selected object
            const activeObject = this.canvas.getActiveObject()
            console.log('check active Object: ', activeObject)
            if (activeObject) {
                if (activeObject.type === 'rect') {
                    activeObject.set(
                        'stroke',
                        this.generateColorFromWord(activeObject.info.category)
                    )
                    if (activeObject.centerPlus) {
                        activeObject.centerPlus.set(
                            'fill',
                            this.generateColorFromWord(
                                activeObject.info.category
                            )
                        )
                    }
                } else if (activeObject.type === 'polygon') {
                    activeObject.set(
                        'stroke',
                        this.generateColorFromWord(activeObject.category)
                    )
                    activeObject.centerPlus.set(
                        'fill',
                        this.generateColorFromWord(activeObject.category)
                    )
                }
                activeObject.set({
                    selectable: true,
                    evented: true,

                    lockMovementX: false,
                    lockMovementY: false,
                })
            }
        },
        addingPointToPolygon(pointer) {
            //console.log('this function adding works')

            if (this.selectedPolygonAddingPoint.type === 'polygon') {
                this.$store.dispatch(
                    'editor/setEditorActionMessage',
                    'Adding a new point to the existed polygon. Enter to finish'
                )

                //console.log('watch active object init: ', this.selectedPolygonAddingPoint)
                const points = this.selectedPolygonAddingPoint.get('points')
                // Modify the points array by adding new points
                points.push({ x: pointer.x, y: pointer.y })
                const circleArray = this.circleArray.find(
                    (circle) => circle.id === this.selectedPolygonAddingPoint.id
                )
                const subId = new Date().getTime()
                const circle = new fabric.Circle({
                    radius: 5,
                    fill: '#ffffff',
                    stroke: '#333333',
                    strokeWidth: 0.5,
                    left: pointer.x,
                    top: pointer.y,
                    selectable: true,
                    hasBorders: false,
                    hasControls: false,
                    originX: 'center',
                    originY: 'center',
                    id: this.selectedPolygonAddingPoint.id,
                    subId: subId,
                    category: this.selectedPolygonAddingPoint.category,
                })
                // circle.polygon = this.selectedPolygonAddingPoint
                // this.canvas.add(circle)
                // this.canvas.bringToFront(circle)

                const text = this.textArray.find(
                    (text) => text.id === this.selectedPolygonAddingPoint.id
                )

                const textCenter = this.textCenter.find(
                    (txt) => txt.id === this.selectedPolygonAddingPoint.id
                )
                this.canvas.forEachObject((obj) => {
                    if (
                        obj.id === this.selectedPolygonAddingPoint.id &&
                        obj.type === 'polygon'
                    ) {
                        this.canvas.remove(obj) // Remove the existing polygon by ID
                    }
                })
                if (circleArray) {
                    this.canvas.remove(this.selectedPolygonAddingPoint)
                    //circleArray.push(circle)
                    //const circleValueArray = circleArray.slice(0, -1)
                    //console.log('check the circle Array: ', circleArray)
                    // Calculate the distances between the new point and existing points
                    const distances = circleArray.map((cir) => {
                        const dx = cir.left - circle.left
                        const dy = cir.top - circle.top
                        return Math.sqrt(dx * dx + dy * dy)
                    })

                    //console.log('check distances: ', distances)
                    // Find the index of the nearest existing point
                    //console.log('check distances: ', distances)
                    // Find the index of the nearest existing point
                    const nearestIndex = distances.indexOf(
                        Math.min(...distances)
                    )
                    //adding new point near two closest point
                    let leftCircle,
                        rightCircle,
                        distanceLeftCircle,
                        distanceRightCircle
                    if (nearestIndex === 0) {
                        leftCircle = circleArray[circleArray.length - 1]
                        rightCircle = circleArray[1]
                        distanceLeftCircle = leftCircle
                            ? Math.sqrt(
                                  (leftCircle.left - circle.left) ** 2 +
                                      (leftCircle.top - circle.top) ** 2
                              )
                            : Infinity
                        distanceRightCircle = rightCircle
                            ? Math.sqrt(
                                  (rightCircle.left - circle.left) ** 2 +
                                      (rightCircle.top - circle.top) ** 2
                              )
                            : Infinity

                        // Insert the new point at the position of the nearest existing point

                        if (distanceLeftCircle > distanceRightCircle) {
                            circleArray.splice(1, 0, circle)
                        } else {
                            circleArray.splice(0, 0, circle)
                        }
                    } else if (nearestIndex === circleArray.length - 1) {
                        leftCircle = circleArray[0]
                        rightCircle = circleArray[circleArray.length - 2]
                        distanceLeftCircle = leftCircle
                            ? Math.sqrt(
                                  (leftCircle.left - circle.left) ** 2 +
                                      (leftCircle.top - circle.top) ** 2
                              )
                            : Infinity
                        distanceRightCircle = rightCircle
                            ? Math.sqrt(
                                  (rightCircle.left - circle.left) ** 2 +
                                      (rightCircle.top - circle.top) ** 2
                              )
                            : Infinity

                        // Insert the new point at the position of the nearest existing point

                        if (distanceLeftCircle > distanceRightCircle) {
                            circleArray.splice(
                                circleArray.length - 1,
                                0,
                                circle
                            )
                        } else {
                            circleArray.splice(0, 0, circle)
                        }
                    } else {
                        leftCircle = circleArray[nearestIndex - 1]

                        rightCircle = circleArray[nearestIndex + 1]
                        distanceLeftCircle = leftCircle
                            ? Math.sqrt(
                                  (leftCircle.left - circle.left) ** 2 +
                                      (leftCircle.top - circle.top) ** 2
                              )
                            : Infinity
                        distanceRightCircle = rightCircle
                            ? Math.sqrt(
                                  (rightCircle.left - circle.left) ** 2 +
                                      (rightCircle.top - circle.top) ** 2
                              )
                            : Infinity

                        // Insert the new point at the position of the nearest existing point

                        if (distanceLeftCircle > distanceRightCircle) {
                            circleArray.splice(nearestIndex + 1, 0, circle)
                        } else {
                            circleArray.splice(nearestIndex, 0, circle)
                        }
                    }

                    let points = []
                    let databasePoint = []

                    circleArray.forEach((pos) => {
                        this.canvas.remove(pos)
                        points.push({
                            x: pos.left,
                            y: pos.top,
                        })
                        databasePoint.push({
                            x: pos.left / this.scaleFactor,
                            y: pos.top / this.scaleFactor,
                        })
                        this.canvas.add(pos)
                    })

                    //console.log('points length adding: ', points.length, databasePoint)

                    const polygon = new fabric.Polygon(points, {
                        stroke: this.generateColorFromWord(
                            this.selectedPolygonAddingPoint.category
                        ),
                        strokeWidth: 2,
                        fill: '#ffffff',
                        opacity: 0.5,
                        hasBorders: true,
                        hasControls: true,
                        strokeUniform: true,
                        selectable: true,
                        lockScalingX: false,
                        lockScalingY: false,
                    })

                    polygon.setControlsVisibility({
                        mtr: false,
                    })
                    polygon.id = this.selectedPolygonAddingPoint.id
                    // Create a copy of the points array
                    const sortedPoints = points.slice()
                    sortedPoints.sort((a, b) => {
                        if (a.x !== b.x) {
                            return a.x - b.x // Sort by smallest left value first
                        } else {
                            return a.y - b.y // If left values are the same, sort by smallest top value
                        }
                    })
                    //console.log('seg drawn: ', seg)
                    //console.log('points drawn: ', points)
                    // Get the point with the smallest top and left values
                    const smallestPoint = sortedPoints[0]
                    if (text) {
                        text.set({
                            left: smallestPoint.x,
                            top: smallestPoint.y,
                        })

                        //text.set('stroke', 'white')
                    }
                    if (textCenter) {
                        textCenter.set({
                            left: polygon.left + polygon.width / 2,
                            top: polygon.top + polygon.height / 2,
                        })
                    }
                    polygon.textPolygon = text
                    polygon.centerPlus = textCenter
                    polygon.smallestPoint = smallestPoint
                    polygon.category = this.selectedPolygonAddingPoint.category
                    // Update the object with the new array of points
                    polygon.set('updatePoints', points)
                    polygon.set('updateCirclePoints', databasePoint)

                    this.canvas.add(polygon)
                    this.canvas.sendToBack(polygon)
                    this.selectedPolygonAddingPoint = polygon
                    this.updateAnnotations(polygon, false)
                    this.movingPolygonStatus = false
                    this.updateCheckCrossButtons(polygon)
                    //update data to database
                    this.drawingPolygon = true
                }

                // Update the points array of the polygon object

                // Re-render the canvas to reflect the changes
                this.canvas.renderAll()
            }
            this.loadingSegmentationMode = false
            //this.selectedPolygonAddingPoint = null
        },
        deleteExistedObjectFromCanvas(id) {
            //console.log('delete existed object id: ', id)
            const existedAnno = this.annotationList.find(
                (anno) => anno.annotationid === id
            )
            if (existedAnno) {
                this.annotationList = this.annotationList.filter(
                    (anno) => anno.annotationid !== id
                )
                this.$store.dispatch(
                    'editor/updatedAnnotationList',
                    this.annotationList
                )
                this.$store.dispatch('editor/deleteAnnotation', id)
                this.selectedPolygonAddingPoint = null
            } else {
                this.canvas.getObjects().forEach((obj) => {
                    if (obj.id === id) {
                        this.canvas.remove(obj)
                    }
                })
                this.selectedPolygonAddingPoint = null
            }

            this.$store.dispatch('editor/updatedAnnotationStatus', 'delete')
        },
        checkButtonSegmentation(object, pointer) {
            const points = []
            let pointArray
            let cat =
                this.$store.getters['editor/selectedCategory'] ||
                this.$store.getters['project/getData'].categoriesjson
                    .categories[0]
            if (object.polygon) {
                pointArray = object.polygon.updatePoints

                console.log('pointArray first updating points: ', pointArray)
                const polygonIdToRemove = object.id
                this.canvas.forEachObject((obj) => {
                    if (
                        obj.id === polygonIdToRemove &&
                        (obj.type === 'polygon' ||
                            obj.type === 'check-button' ||
                            obj.type === 'cross-button' ||
                            obj.type === 'circle' ||
                            obj.type === 'text')
                    ) {
                        this.canvas.remove(obj) // Remove the existing polygon by ID
                    }
                })
                pointArray.forEach((point) => {
                    //console.log('check point circle: ', point.id)
                    points.push({
                        x: point.x / this.scaleFactor,
                        y: point.y / this.scaleFactor,
                    })
                })
            }

            const id = Date.now().toString()
            const typ = 'default'
            const annotation = {
                annotationid: id,
                category: cat,
                height: object.polygon.height / this.scaleFactor,
                segmentation: points,
                typ: typ,
                width: object.polygon.width / this.scaleFactor,
                x: object.polygon.left / this.scaleFactor,
                y: object.polygon.top / this.scaleFactor,
            }

            this.annotationList.push(annotation)

            // Update the annotation list to show on the right side of the browser
            this.$store.dispatch(
                'editor/updatedAnnotationList',
                this.annotationList
            )
            //this.$store.dispatch('editor/updatedAnnotationStatus', 'drawing')
            this.drawRectangleWithText(
                object.polygon.left,
                object.polygon.top,
                object.polygon.width,
                object.polygon.height,
                this.scaleFactor,
                id,
                cat,
                points,
                typ,
                false
            )
            this.$store.dispatch('editor/updateAnnotation', {
                projectId: this.$store.getters['project/getProjectId'],
                image: this.image,
                image_path: this.$store.getters['project/getImage'].image_path,
                annotations: this.annotationList,
            })
        },
        checkButtonRectangle(object, pointer) {
            const rectIdToRemove = object.id
            this.canvas.forEachObject((obj) => {
                if (
                    obj.id === rectIdToRemove &&
                    (obj.type === 'rect' ||
                        obj.type === 'check-button' ||
                        obj.type === 'cross-button' ||
                        obj.type === 'text')
                ) {
                    this.canvas.remove(obj) // Remove the existing polygon by ID
                }
            })
            let cat =
                this.$store.getters['editor/selectedCategory'] ||
                this.$store.getters['project/getData'].categoriesjson
                    .categories[0]

            //console.log('watch points: ', points)
            const id = Date.now().toString()

            const seg = []
            const typ = 'default'
            const annotation = {
                annotationid: id,
                category: cat,
                height:
                    (object.rect.height * object.rect.scaleY) /
                    this.scaleFactor,
                segmentation: seg,
                typ: typ,
                width:
                    (object.rect.width * object.rect.scaleX) / this.scaleFactor,
                x: object.rect.left / this.scaleFactor,
                y: object.rect.top / this.scaleFactor,
            }

            console.log('show annotation: ', annotation)

            this.annotationList.push(annotation)
            //console.log('this annotationList keyDown: ', this.annotationList)
            // Update the annotation list to show on the right side of the browser
            this.$store.dispatch(
                'editor/updatedAnnotationList',
                this.annotationList
            )
            //this.$store.dispatch('editor/updatedAnnotationStatus', 'drawing')
            this.drawRectangleWithText(
                object.rect.left,
                object.rect.top,
                object.rect.width * object.rect.scaleX,
                object.rect.height * object.rect.scaleY,
                this.scaleFactor,
                id,
                cat,
                seg,
                typ,
                false
            )
            this.$store.dispatch('editor/updateAnnotation', {
                projectId: this.$store.getters['project/getProjectId'],
                image: this.image,
                image_path: this.$store.getters['project/getImage'].image_path,
                annotations: this.annotationList,
            })
        },
        handleMouseDownSegmentation(object, pointer) {
            if (object) {
                if (object.type === 'circle') {
                    this.selectedCircle = object
                    this.$store.dispatch(
                        'editor/setEditorActionMessage',
                        'A circle is selected.'
                    )

                    // Clicked on an existing circle when drawing
                    const existingCircle = this.pointArray.find(
                        (circle) => circle.id === object.id
                    )
                    if (existingCircle) {
                        this.activeCircle = existingCircle
                        return
                    }
                    // Clicked on an existing circle when drawing
                    const circleArray = this.circleArray.find(
                        (circle) => circle.id === object.id
                    )

                    if (circleArray) {
                        const circleIndex = circleArray.findIndex(
                            (circle) => circle.subId === object.subId
                        )

                        if (circleIndex !== -1) {
                            return
                        }
                    }
                }
                if (
                    object.type === 'check-button' ||
                    object.type === 'cross-button'
                ) {
                    return
                }
                if (
                    (object && object.type === 'rect') ||
                    (object && object.type === 'polygon')
                ) {
                    const rectCenterX =
                        object.left + (object.width * object.scaleX) / 2
                    const rectCenterY =
                        object.top + (object.height * object.scaleY) / 2
                    const tolerance = 10 // Adjust this value as needed
                    // check the pointer is in the center point of the object
                    if (
                        pointer.x >= rectCenterX - tolerance &&
                        pointer.x <= rectCenterX + tolerance &&
                        pointer.y >= rectCenterY - tolerance &&
                        pointer.y <= rectCenterY + tolerance
                    ) {
                        this.canvas.setActiveObject(object)

                        object.set('stroke', 'yellow')
                        if (object.centerPlus) {
                            object.centerPlus.set('fill', 'yellow')
                        }
                        object.set({
                            selectable: true,
                            evented: true,
                            lockMovementX: false,
                            lockMovementY: false,
                        })
                        //this.revertColorPreviousObject()
                        // Find the target polygon object
                        //const targetPolygon = this.canvas.getObjects().find(obj => obj.type === 'polygon' && obj === target);
                        this.selectedPolygonModeObject = object
                        this.selectedPolygonAddingPoint = object

                        //Adding point to get segment
                        if (this.polygonMode === AUTOSEGMENT) {
                            this.selectedObjectAddingSegment = object
                            this.loadingSegmentationMode = false
                        }
                        // Disallow the default selection box
                        this.canvas.selection = false
                        if (object.type === 'polygon') {
                            this.$store.dispatch(
                                'editor/setEditorActionMessage',
                                'Selecting a polygon. You can add or delete a point or move, rescale this polygon.'
                            )
                        }
                        if (object.type === 'rect') {
                            this.$store.dispatch(
                                'editor/setEditorActionMessage',
                                'Selecting a rectangle'
                            )
                        }
                    } else {
                        // Revert the stroke color of the previously selected object
                        //const activeObject = this.canvas.getActiveObject()

                        if (this.selectedPolygonAddingPoint) {
                            this.canvas.forEachObject((obj) => {
                                if (
                                    obj.id ===
                                        this.selectedPolygonAddingPoint.id &&
                                    obj.type === 'polygon'
                                ) {
                                    this.canvas.remove(obj) // Remove the existing polygon by ID
                                }
                            })
                            this.addingPointToPolygon(pointer)
                            this.loadingSegmentationMode = false
                        } else {
                            // Check if the clicked object is a control point
                            const isControlPoint = object.__corner
                            console.log(
                                'check positon of mouse control points: ',
                                isControlPoint
                            )
                            if (!isControlPoint) {
                                object.set({
                                    selectable: false,
                                    lockMovementX: true,
                                    lockMovementY: true,
                                })

                                //this.addPoint(event)
                                //Adding new point
                                if (this.polygonMode === SEGMENTATION) {
                                    this.addPoint(event)
                                }

                                this.drawingPolygon = false
                                //this.canvas.sendToBack(object)
                                this.objectSelectedPolygon = object
                                // Discard any active objects
                                this.canvas.discardActiveObject().renderAll()

                                //Adding point to get segment
                                if (this.polygonMode === AUTOSEGMENT) {
                                    this.selectedObjectAddingSegment = object
                                    this.loadingSegmentationMode = false
                                }
                                //Remove all objects on canvas
                                const removedObjects = this.canvas
                                    .getObjects()
                                    .filter((obj) => obj !== this.activeShape)
                                this.canvas.remove(...removedObjects)
                                this.storeObject.push(...removedObjects)
                                // this.revertColorPreviousObject()
                            } else {
                                object.set({
                                    selectable: true,
                                    evented: true,
                                    lockMovementX: false,
                                    lockMovementY: false,
                                })
                                // const removedObjects = this.canvas
                                //     .getObjects()
                                //     .filter((obj) => obj.id !== object.id)
                                // this.canvas.remove(...removedObjects)
                                // this.storeObject.push(...removedObjects)
                                //console.log('794 mouse down works inside')
                                this.canvas.setActiveObject(object)
                                object.set('stroke', 'yellow')
                                if (object.centerPlus) {
                                    object.centerPlus.set('fill', 'yellow')
                                }
                                this.selectedPolygonModeObject = object

                                //Adding point to get segment
                                if (this.polygonMode === AUTOSEGMENT) {
                                    this.selectedObjectAddingSegment = null
                                    this.loadingSegmentationMode = true
                                }
                                // Disallow the default selection box
                                this.canvas.selection = false
                                this.drawingPolygon = true
                            }
                        }
                    }
                } else {
                    //const activeObject = this.canvas.getActiveObject()
                    console.log(
                        'check active object: ',
                        this.selectedPolygonAddingPoint
                    )

                    if (this.selectedPolygonAddingPoint) {
                        this.canvas.forEachObject((obj) => {
                            if (
                                obj.id === this.selectedPolygonAddingPoint.id &&
                                obj.type === 'polygon'
                            ) {
                                this.canvas.remove(obj) // Remove the existing polygon by ID
                            }
                        })
                        this.addingPointToPolygon(pointer)
                        this.loadingSegmentationMode = false
                    } else {
                        //this.addPoint(event)

                        //Adding new point
                        if (this.polygonMode === SEGMENTATION) {
                            this.addPoint(event)
                        }

                        //Adding point to get segment
                        if (this.polygonMode === AUTOSEGMENT) {
                            this.selectedObjectAddingSegment = null
                            this.loadingSegmentationMode = true
                        }
                        this.drawingPolygon = false
                        const removedObjects = this.canvas
                            .getObjects()
                            .filter((obj) => obj !== this.activeShape)
                        this.canvas.remove(...removedObjects)
                        this.storeObject.push(...removedObjects)
                        this.objectSelectedPolygon = object
                    }

                    //this.revertColorPreviousObject()
                }
                this.drawingPolygon = false
            } else {
                if (this.selectedPolygonAddingPoint) {
                    this.canvas.forEachObject((obj) => {
                        if (
                            obj.id === this.selectedPolygonAddingPoint.id &&
                            obj.type === 'polygon'
                        ) {
                            this.canvas.remove(obj) // Remove the existing polygon by ID
                        }
                    })
                    this.addingPointToPolygon(pointer)
                    this.loadingSegmentationMode = false
                } else {
                    //Adding new point
                    if (this.polygonMode === SEGMENTATION) {
                        console.log('check it works addPoint: ')
                        this.addPoint(event)
                    }

                    //Adding point to get segment
                    if (this.polygonMode === AUTOSEGMENT) {
                        this.selectedObjectAddingSegment = null
                        this.loadingSegmentationMode = true
                    }
                    this.drawingPolygon = false
                }
                const removedObjects = this.canvas
                    .getObjects()
                    .filter((obj) => obj !== this.activeShape)
                this.canvas.remove(...removedObjects)
                this.storeObject.push(...removedObjects)
            }
        },
        handleMouseDownRectangle(object, pointer) {
            if (
                (object && object.type === 'rect') ||
                (object && object.type === 'polygon')
            ) {
                const rectCenterX =
                    object.left + (object.width * object.scaleX) / 2
                const rectCenterY =
                    object.top + (object.height * object.scaleY) / 2
                const tolerance = 10 // Adjust this value as needed

                // check the pointer is in the center point of the object
                if (
                    pointer.x >= rectCenterX - tolerance &&
                    pointer.x <= rectCenterX + tolerance &&
                    pointer.y >= rectCenterY - tolerance &&
                    pointer.y <= rectCenterY + tolerance
                ) {
                    //console.log('429 mouse down works inside')
                    this.canvas.setActiveObject(object)
                    //object.set('stroke', 'yellow')
                    if (object.centerPlus) {
                        object.centerPlus.set('fill', 'yellow')
                    }

                    object.set({
                        selectable: true,
                        evented: true,
                        stroke: 'yellow',
                        lockMovementX: false,
                        lockMovementY: false,
                    })

                    // Disallow the default selection box
                    this.canvas.selection = false

                    const removedObjects = this.canvas
                        .getObjects()
                        .filter((obj) => obj.id !== object.id)

                    this.selectedPolygonModeObject = object

                    this.canvas.remove(...removedObjects)
                    this.storeObject.push(...removedObjects)
                    //this.revertColorPreviousObject()
                    this.isDrawing = false
                    if (object.type === 'polygon') {
                        this.$store.dispatch(
                            'editor/setEditorActionMessage',
                            'A polygon is selected.'
                        )
                    }
                    if (object.type === 'rect') {
                        this.$store.dispatch(
                            'editor/setEditorActionMessage',
                            'A rectangle is selected'
                        )
                    }
                    //Adding point to get segment
                    if (this.polygonMode === AUTORECTANGLE) {
                        this.selectedObjectAddingSegment = object
                        this.loadingSegmentationMode = false
                    }
                    console.log(
                        'check status this.selectedObjectAddingSegment handlemouseDown',
                        this.selectedObjectAddingSegment
                    )
                    // if (this.polygon === AUTORECTANGLE || this.polygon === AUTOSEGMENT) {
                    //     this.selectedObjectAddingSegment = object
                    // }
                } else {
                    // // Revert the stroke color of the previously selected object
                    this.resetActiveObject()

                    object.set({
                        selectable: true,
                        evented: true,
                        lockMovementX: true,
                        lockMovementY: true,
                    })
                    if (object.type === 'rect') {
                        object.set(
                            'stroke',
                            this.generateColorFromWord(object.info.category)
                        )
                        object.centerPlus.set(
                            'fill',
                            this.generateColorFromWord(object.info.category)
                        )
                    } else {
                        object.set(
                            'stroke',
                            this.generateColorFromWord(object.category)
                        )
                        object.centerPlus.set(
                            'fill',
                            this.generateColorFromWord(object.category)
                        )
                    }

                    // Check if the clicked object is a control point
                    const isControlPoint = object.__corner

                    if (!isControlPoint) {
                        object.set({
                            selectable: false,

                            lockMovementX: true,
                            lockMovementY: true,
                        })

                        // Allow the default selection box
                        //this.canvas.selection = true
                        //Remove all objects on canvas
                        const removedObjects = this.canvas
                            .getObjects()
                            .map((obj) => obj)
                        this.canvas.remove(...removedObjects)
                        this.storeObject.push(...removedObjects)

                        if (this.polygonMode === AUTORECTANGLE) {
                            this.selectedObjectAddingSegment = object
                            this.loadingSegmentationMode = false
                        }

                        // Discard any active objects
                        this.canvas.discardActiveObject().renderAll()
                        if (this.polygonMode === RECTANGLE) {
                            // Drawing the selection box
                            this.drawingRect = new fabric.Rect({
                                left: this.startPosition.x,
                                top: this.startPosition.y,
                                originX: 'left',
                                originY: 'top',
                                width: pointer.x - this.startPosition.x,
                                height: pointer.y - this.startPosition.y,
                                angle: 0,
                                fill: 'rgba(100, 100, 255, 0.3)',
                                stroke: 'rgba(255, 255, 255, 0.5)',
                                strokeWidth: this.canvas.selectionLineWidth,
                                transparentCorners: false,
                                evented: false,
                                hasControls: false,
                            })
                            this.canvas.add(this.drawingRect)
                            this.isDrawing = true
                        }
                    } else {
                        const removedObjects = this.canvas
                            .getObjects()
                            .filter((obj) => obj.id !== object.id)

                        this.canvas.remove(...removedObjects)
                        this.storeObject.push(...removedObjects)
                        this.selectedPolygonModeObject = object
                        this.isDrawing = false
                        //Adding point to get segment
                        if (this.polygonMode === AUTORECTANGLE) {
                            this.selectedObjectAddingSegment = null
                            this.loadingSegmentationMode = true
                        }
                    }
                }
            } else {
                const removedObjects = this.canvas
                    .getObjects()
                    .map((obj) => obj)
                this.canvas.remove(...removedObjects)
                this.storeObject.push(...removedObjects)
                if (this.polygonMode === RECTANGLE) {
                    // Drawing the selection box
                    this.drawingRect = new fabric.Rect({
                        left: this.startPosition.x,
                        top: this.startPosition.y,
                        originX: 'left',
                        originY: 'top',
                        width: pointer.x - this.startPosition.x,
                        height: pointer.y - this.startPosition.y,
                        angle: 0,
                        fill: 'rgba(100, 100, 255, 0.3)',
                        stroke: 'rgba(255, 255, 255, 0.5)',
                        strokeWidth: this.canvas.selectionLineWidth,
                        transparentCorners: false,
                        evented: false,
                        hasControls: false,
                    })
                    this.canvas.add(this.drawingRect)
                    this.isDrawing = true
                }
                if (this.polygonMode === AUTORECTANGLE) {
                    if (
                        (object && object.type === 'check-button') ||
                        (object && object.type === 'cross-button')
                    ) {
                        this.selectedObjectAddingSegment = object
                        this.loadingSegmentationMode = false
                    } else {
                        this.selectedObjectAddingSegment = null
                        this.loadingSegmentationMode = true
                    }
                }
                if (object && object.type === 'circle') {
                    this.$store.dispatch(
                        'editor/setEditorActionMessage',
                        'A circle is selected'
                    )

                    return
                }

                // Disallow the default selection box
                //this.canvas.selection = true

                //Revert color of selected object
                //this.revertColorPreviousObject()
            }
        },
        handleMouseDown(event) {
            const pointer = this.canvas.getPointer(event.e)
            const object = event.target
            //console.log('mouse down target: ', object)

            this.startPosition = pointer
            this.revertColorPreviousObject()
            //Set up the drawing inside the image
            if (this.isPointerInsideImageZoom1(pointer)) {
                return
            }
            if (
                object &&
                (object.type === 'check-button' ||
                    object.type === 'cross-button')
            ) {
                //console.log('mouse over object: ', object)
                // if (this.polygonMode === AUTORECTANGLE || this.polygonMode === AUTOSEGMENT) {
                //     this.selectedObjectAddingSegment = object
                //     this.loadingSegmentationMode = false
                // }

                if (object.type === 'check-button') {
                    console.log('check button works')
                    //object.set('fill', 'lightgreen')

                    // let cat =
                    //     this.$store.getters['editor/selectedCategory'] ||
                    //     this.$store.getters['project/getData'].categoriesjson.categories[0]
                    // console.log(' activeShape: ', this.activeShape, this.activeShape.left)

                    //this.canvas.add(text)
                    if (this.polygonMode === AUTOSEGMENT) {
                        this.checkButtonSegmentation(object)
                    }
                    if (this.polygonMode === AUTORECTANGLE) {
                        this.checkButtonRectangle(object)
                    }
                    // if (this.polygonMode === AUTOSEGMENT) {
                    //     const points = []
                    //     let pointArray
                    //     if (object.polygon) {
                    //         pointArray = object.polygon.updatePoints

                    //         console.log('pointArray first updating points: ', pointArray)
                    //         const polygonIdToRemove = object.id
                    //         this.canvas.forEachObject((obj) => {
                    //             if (
                    //                 obj.id === polygonIdToRemove &&
                    //                 (obj.type === 'polygon' ||
                    //                     obj.type === 'check-button' ||
                    //                     obj.type === 'cross-button' ||
                    //                     obj.type === 'circle' ||
                    //                     obj.type === 'text')
                    //             ) {
                    //                 this.canvas.remove(obj) // Remove the existing polygon by ID
                    //             }
                    //         })
                    //         pointArray.forEach((point) => {
                    //             //console.log('check point circle: ', point.id)
                    //             points.push({
                    //                 x: point.x / this.scaleFactor,
                    //                 y: point.y / this.scaleFactor,
                    //             })
                    //         })
                    //     }

                    //     //console.log('point Array before generating: ', points)

                    //     //console.log('watch points: ', points)
                    //     const id = Date.now().toString()

                    //     //const seg = this.segmentation
                    //     const typ = 'default'
                    //     const annotation = {
                    //         annotationid: id,
                    //         category: cat,
                    //         height: object.polygon.height / this.scaleFactor,
                    //         segmentation: points,
                    //         typ: typ,
                    //         width: object.polygon.width / this.scaleFactor,
                    //         x: object.polygon.left / this.scaleFactor,
                    //         y: object.polygon.top / this.scaleFactor,
                    //     }

                    //     this.annotationList.push(annotation)

                    //     // Update the annotation list to show on the right side of the browser
                    //     this.$store.dispatch('editor/updatedAnnotationList', this.annotationList)
                    //     //this.$store.dispatch('editor/updatedAnnotationStatus', 'drawing')
                    //     this.drawRectangleWithText(
                    //         object.polygon.left,
                    //         object.polygon.top,
                    //         object.polygon.width,
                    //         object.polygon.height,
                    //         this.scaleFactor,
                    //         id,
                    //         cat,
                    //         points,
                    //         typ,
                    //         false,
                    //     )
                    // }
                    // if (this.polygonMode === AUTORECTANGLE) {
                    //     console.log('check object rect handle down: ', object.rect)
                    //     if (object.rect) {
                    //         const rectIdToRemove = object.id
                    //         this.canvas.forEachObject((obj) => {
                    //             if (
                    //                 obj.id === rectIdToRemove &&
                    //                 (obj.type === 'rect' ||
                    //                     obj.type === 'check-button' ||
                    //                     obj.type === 'cross-button' ||
                    //                     obj.type === 'text')
                    //             ) {
                    //                 this.canvas.remove(obj) // Remove the existing polygon by ID
                    //             }
                    //         })
                    //     }

                    //     //console.log('watch points: ', points)
                    //     const id = Date.now().toString()

                    //     const seg = []
                    //     const typ = 'default'
                    //     const annotation = {
                    //         annotationid: id,
                    //         category: cat,
                    //         height: (object.rect.height * object.rect.scaleY) / this.scaleFactor,
                    //         segmentation: seg,
                    //         typ: typ,
                    //         width: (object.rect.width * object.rect.scaleX) / this.scaleFactor,
                    //         x: object.rect.left / this.scaleFactor,
                    //         y: object.rect.top / this.scaleFactor,
                    //     }

                    //     console.log('show annotation: ', annotation)

                    //     this.annotationList.push(annotation)
                    //     //console.log('this annotationList keyDown: ', this.annotationList)
                    //     // Update the annotation list to show on the right side of the browser
                    //     this.$store.dispatch('editor/updatedAnnotationList', this.annotationList)
                    //     //this.$store.dispatch('editor/updatedAnnotationStatus', 'drawing')
                    //     this.drawRectangleWithText(
                    //         object.rect.left,
                    //         object.rect.top,
                    //         object.rect.width * object.rect.scaleX,
                    //         object.rect.height * object.rect.scaleY,
                    //         this.scaleFactor,
                    //         id,
                    //         cat,
                    //         seg,
                    //         typ,
                    //         false,
                    //     )
                    // }

                    // this.$store.dispatch('editor/updateAnnotation', {
                    //     projectId: this.$store.getters['project/getProjectId'],
                    //     image: this.image,
                    //     image_path: this.$store.getters['project/getImage'].image_path,
                    //     annotations: this.annotationList,
                    // })
                }
                if (object.type === 'cross-button') {
                    // this.$store.dispatch('notification/loadedConfirmMessage', confirmMessage)
                    this.deleteExistedObjectFromCanvas(object.id)
                }
            }
            if (
                this.polygonMode === SEGMENTATION ||
                this.polygonMode === AUTOSEGMENT
            ) {
                //this.resetActiveObject()
                //this.segmentation.push({ x: pointer.x, y: pointer.y })
                console.log('check mouse down object: ', object)
                this.handleMouseDownSegmentation(object, pointer)
                // if (object) {

                //     if (object.type === 'circle') {
                //         this.selectedCircle = object
                //         this.$store.dispatch(
                //             'editor/setEditorActionMessage',
                //             'A circle is selected.',
                //         )
                //         //console.log('circle object handled down: ', object)
                //         //console.log('check the pointArray: ', this.pointArray)
                //         // Clicked on an existing circle when drawing
                //         const existingCircle = this.pointArray.find(
                //             (circle) => circle.id === object.id,
                //         )
                //         if (existingCircle) {
                //             this.activeCircle = existingCircle
                //             return
                //         }
                //         // Clicked on an existing circle when drawing
                //         const circleArray = this.circleArray.find(
                //             (circle) => circle.id === object.id,
                //         )

                //         if (circleArray) {
                //             const circleIndex = circleArray.findIndex(
                //                 (circle) => circle.subId === object.subId,
                //             )
                //             // this.selectedCircle = circleArray.find(
                //             //     (circle) => circle.subId === object.subId,
                //             // )
                //             console.log('find the circle object: ', circleIndex)
                //             if (circleIndex !== -1) {
                //                 return
                //             }
                //         }
                //     }
                //     if (object.type === 'check-button' || object.type === 'cross-button') {
                //         return
                //     }
                //     if (
                //         (object && object.type === 'rect') ||
                //         (object && object.type === 'polygon')
                //     ) {
                //         const rectCenterX = object.left + (object.width * object.scaleX) / 2
                //         const rectCenterY = object.top + (object.height * object.scaleY) / 2
                //         const tolerance = 10 // Adjust this value as needed
                //         // check the pointer is in the center point of the object
                //         if (
                //             pointer.x >= rectCenterX - tolerance &&
                //             pointer.x <= rectCenterX + tolerance &&
                //             pointer.y >= rectCenterY - tolerance &&
                //             pointer.y <= rectCenterY + tolerance
                //         ) {
                //             //console.log('794 mouse down works inside')
                //             this.canvas.setActiveObject(object)
                //             //this.canvas.bringToFront(object)
                //             object.set('stroke', 'yellow')
                //             if (object.centerPlus) {
                //                 object.centerPlus.set('fill', 'yellow')
                //             }
                //             object.set({
                //                 selectable: true,
                //                 evented: true,
                //                 lockMovementX: false,
                //                 lockMovementY: false,
                //             })
                //             //this.revertColorPreviousObject()
                //             // Find the target polygon object
                //             //const targetPolygon = this.canvas.getObjects().find(obj => obj.type === 'polygon' && obj === target);
                //             this.selectedPolygonModeObject = object
                //             this.selectedPolygonAddingPoint = object

                //             //Adding point to get segment
                //             if (this.polygonMode === AUTOSEGMENT) {
                //                 this.selectedObjectAddingSegment = object
                //                 this.loadingSegmentationMode = false
                //             }
                //             // Disallow the default selection box
                //             this.canvas.selection = false
                //             if (object.type === 'polygon') {
                //                 this.$store.dispatch(
                //                     'editor/setEditorActionMessage',
                //                     'Selecting a polygon. You can add or delete a point or move, rescale this polygon.',
                //                 )
                //             }
                //             if (object.type === 'rect') {
                //                 this.$store.dispatch(
                //                     'editor/setEditorActionMessage',
                //                     'Selecting a rectangle',
                //                 )
                //             }
                //         } else {
                //             // Revert the stroke color of the previously selected object
                //             //const activeObject = this.canvas.getActiveObject()

                //             if (this.selectedPolygonAddingPoint) {
                //                 this.canvas.forEachObject((obj) => {
                //                     if (
                //                         obj.id === this.selectedPolygonAddingPoint.id &&
                //                         obj.type === 'polygon'
                //                     ) {
                //                         this.canvas.remove(obj) // Remove the existing polygon by ID
                //                     }
                //                 })
                //                 this.addingPointToPolygon(pointer)
                //                 this.loadingSegmentationMode = false
                //             } else {
                //                 // Check if the clicked object is a control point
                //                 const isControlPoint = object.__corner
                //                 console.log(
                //                     'check positon of mouse control points: ',
                //                     isControlPoint,
                //                 )
                //                 if (!isControlPoint) {
                //                     object.set({
                //                         selectable: false,
                //                         lockMovementX: true,
                //                         lockMovementY: true,
                //                     })

                //                     //this.addPoint(event)
                //                     //Adding new point
                //                     if (this.polygonMode === SEGMENTATION) {
                //                         this.addPoint(event)
                //                     }

                //                     this.drawingPolygon = false
                //                     //this.canvas.sendToBack(object)
                //                     this.objectSelectedPolygon = object
                //                     // Discard any active objects
                //                     this.canvas.discardActiveObject().renderAll()

                //                     //Adding point to get segment
                //                     if (this.polygonMode === AUTOSEGMENT) {
                //                         this.selectedObjectAddingSegment = object
                //                         this.loadingSegmentationMode = false
                //                     }
                //                     //Remove all objects on canvas
                //                     const removedObjects = this.canvas
                //                         .getObjects()
                //                         .filter((obj) => obj !== this.activeShape)
                //                     this.canvas.remove(...removedObjects)
                //                     this.storeObject.push(...removedObjects)
                //                     // this.revertColorPreviousObject()
                //                 } else {
                //                     object.set({
                //                         selectable: true,
                //                         evented: true,
                //                         lockMovementX: false,
                //                         lockMovementY: false,
                //                     })
                //                     // const removedObjects = this.canvas
                //                     //     .getObjects()
                //                     //     .filter((obj) => obj.id !== object.id)
                //                     // this.canvas.remove(...removedObjects)
                //                     // this.storeObject.push(...removedObjects)
                //                     //console.log('794 mouse down works inside')
                //                     this.canvas.setActiveObject(object)
                //                     object.set('stroke', 'yellow')
                //                     if (object.centerPlus) {
                //                         object.centerPlus.set('fill', 'yellow')
                //                     }
                //                     this.selectedPolygonModeObject = object

                //                     //Adding point to get segment
                //                     if (this.polygonMode === AUTOSEGMENT) {
                //                         this.selectedObjectAddingSegment = null
                //                         this.loadingSegmentationMode = true
                //                     }
                //                     // Disallow the default selection box
                //                     this.canvas.selection = false
                //                     this.drawingPolygon = true
                //                 }
                //             }
                //         }
                //     } else {
                //         //const activeObject = this.canvas.getActiveObject()
                //         console.log('check active object: ', this.selectedPolygonAddingPoint)

                //         if (this.selectedPolygonAddingPoint) {
                //             this.canvas.forEachObject((obj) => {
                //                 if (
                //                     obj.id === this.selectedPolygonAddingPoint.id &&
                //                     obj.type === 'polygon'
                //                 ) {
                //                     this.canvas.remove(obj) // Remove the existing polygon by ID
                //                 }
                //             })
                //             this.addingPointToPolygon(pointer)
                //             this.loadingSegmentationMode = false
                //         } else {
                //             //this.addPoint(event)

                //             //Adding new point
                //             if (this.polygonMode === SEGMENTATION) {
                //                 this.addPoint(event)
                //             }

                //             //Adding point to get segment
                //             if (this.polygonMode === AUTOSEGMENT) {
                //                 this.selectedObjectAddingSegment = null
                //                 this.loadingSegmentationMode = true
                //             }
                //             this.drawingPolygon = false
                //             const removedObjects = this.canvas
                //                 .getObjects()
                //                 .filter((obj) => obj !== this.activeShape)
                //             this.canvas.remove(...removedObjects)
                //             this.storeObject.push(...removedObjects)
                //             this.objectSelectedPolygon = object
                //         }

                //         //this.revertColorPreviousObject()
                //     }
                //     this.drawingPolygon = false
                // } else {
                //     if (this.selectedPolygonAddingPoint) {
                //         this.canvas.forEachObject((obj) => {
                //             if (
                //                 obj.id === this.selectedPolygonAddingPoint.id &&
                //                 obj.type === 'polygon'
                //             ) {
                //                 this.canvas.remove(obj) // Remove the existing polygon by ID
                //             }
                //         })
                //         this.addingPointToPolygon(pointer)
                //         this.loadingSegmentationMode = false
                //     } else {
                //         //Adding new point
                //         if (this.polygonMode === SEGMENTATION) {
                //             console.log('check it works addPoint: ')
                //             this.addPoint(event)
                //         }

                //         //Adding point to get segment
                //         if (this.polygonMode === AUTOSEGMENT) {
                //             this.selectedObjectAddingSegment = null
                //             this.loadingSegmentationMode = true
                //         }
                //         this.drawingPolygon = false
                //     }
                //     const removedObjects = this.canvas
                //         .getObjects()
                //         .filter((obj) => obj !== this.activeShape)
                //     this.canvas.remove(...removedObjects)
                //     this.storeObject.push(...removedObjects)
                // }
            } else if (
                this.polygonMode === RECTANGLE ||
                this.polygonMode === AUTORECTANGLE
            ) {
                console.log('check mouse down object auto rect: ', object)
                this.handleMouseDownRectangle(object, pointer)
                // if ((object && object.type === 'rect') || (object && object.type === 'polygon')) {
                //     const rectCenterX = object.left + (object.width * object.scaleX) / 2
                //     const rectCenterY = object.top + (object.height * object.scaleY) / 2
                //     const tolerance = 10 // Adjust this value as needed

                //     // check the pointer is in the center point of the object
                //     if (
                //         pointer.x >= rectCenterX - tolerance &&
                //         pointer.x <= rectCenterX + tolerance &&
                //         pointer.y >= rectCenterY - tolerance &&
                //         pointer.y <= rectCenterY + tolerance
                //     ) {
                //         //console.log('429 mouse down works inside')
                //         this.canvas.setActiveObject(object)
                //         //object.set('stroke', 'yellow')
                //         if (object.centerPlus) {
                //             object.centerPlus.set('fill', 'yellow')
                //         }

                //         object.set({
                //             selectable: true,
                //             evented: true,
                //             stroke: 'yellow',
                //             lockMovementX: false,
                //             lockMovementY: false,
                //         })

                //         // Disallow the default selection box
                //         this.canvas.selection = false

                //         const removedObjects = this.canvas
                //             .getObjects()
                //             .filter((obj) => obj.id !== object.id)

                //         this.selectedPolygonModeObject = object

                //         this.canvas.remove(...removedObjects)
                //         this.storeObject.push(...removedObjects)
                //         //this.revertColorPreviousObject()
                //         this.isDrawing = false
                //         if (object.type === 'polygon') {
                //             this.$store.dispatch(
                //                 'editor/setEditorActionMessage',
                //                 'A polygon is selected.',
                //             )
                //         }
                //         if (object.type === 'rect') {
                //             this.$store.dispatch(
                //                 'editor/setEditorActionMessage',
                //                 'A rectangle is selected',
                //             )
                //         }
                //         //Adding point to get segment
                //         if (this.polygonMode === AUTORECTANGLE) {
                //             this.selectedObjectAddingSegment = object
                //             this.loadingSegmentationMode = false
                //         }
                //         console.log(
                //             'check status this.selectedObjectAddingSegment handlemouseDown',
                //             this.selectedObjectAddingSegment,
                //         )
                //         // if (this.polygon === AUTORECTANGLE || this.polygon === AUTOSEGMENT) {
                //         //     this.selectedObjectAddingSegment = object
                //         // }
                //     } else {
                //         // // Revert the stroke color of the previously selected object
                //         this.resetActiveObject()

                //         object.set({
                //             selectable: true,
                //             evented: true,
                //             lockMovementX: true,
                //             lockMovementY: true,
                //         })
                //         if (object.type === 'rect') {
                //             object.set('stroke', this.generateColorFromWord(object.info.category))
                //             object.centerPlus.set(
                //                 'fill',
                //                 this.generateColorFromWord(object.info.category),
                //             )
                //         } else {
                //             object.set('stroke', this.generateColorFromWord(object.category))
                //             object.centerPlus.set(
                //                 'fill',
                //                 this.generateColorFromWord(object.category),
                //             )
                //         }

                //         // Check if the clicked object is a control point
                //         const isControlPoint = object.__corner

                //         if (!isControlPoint) {
                //             object.set({
                //                 selectable: false,

                //                 lockMovementX: true,
                //                 lockMovementY: true,
                //             })

                //             // Allow the default selection box
                //             //this.canvas.selection = true
                //             //Remove all objects on canvas
                //             const removedObjects = this.canvas.getObjects().map((obj) => obj)
                //             this.canvas.remove(...removedObjects)
                //             this.storeObject.push(...removedObjects)

                //             if (this.polygonMode === AUTORECTANGLE) {
                //                 this.selectedObjectAddingSegment = object
                //                 this.loadingSegmentationMode = false
                //             }

                //             // Discard any active objects
                //             this.canvas.discardActiveObject().renderAll()
                //             if (this.polygonMode === RECTANGLE) {
                //                 // Drawing the selection box
                //                 this.drawingRect = new fabric.Rect({
                //                     left: this.startPosition.x,
                //                     top: this.startPosition.y,
                //                     originX: 'left',
                //                     originY: 'top',
                //                     width: pointer.x - this.startPosition.x,
                //                     height: pointer.y - this.startPosition.y,
                //                     angle: 0,
                //                     fill: 'rgba(100, 100, 255, 0.3)',
                //                     stroke: 'rgba(255, 255, 255, 0.5)',
                //                     strokeWidth: this.canvas.selectionLineWidth,
                //                     transparentCorners: false,
                //                     evented: false,
                //                     hasControls: false,
                //                 })
                //                 this.canvas.add(this.drawingRect)
                //                 this.isDrawing = true
                //             }
                //         } else {
                //             const removedObjects = this.canvas
                //                 .getObjects()
                //                 .filter((obj) => obj.id !== object.id)

                //             this.canvas.remove(...removedObjects)
                //             this.storeObject.push(...removedObjects)
                //             this.selectedPolygonModeObject = object
                //             this.isDrawing = false
                //             //Adding point to get segment
                //             if (this.polygonMode === AUTORECTANGLE) {
                //                 this.selectedObjectAddingSegment = null
                //                 this.loadingSegmentationMode = true
                //             }
                //         }
                //     }
                // } else {
                //     const removedObjects = this.canvas.getObjects().map((obj) => obj)
                //     this.canvas.remove(...removedObjects)
                //     this.storeObject.push(...removedObjects)
                //     if (this.polygonMode === RECTANGLE) {
                //         // Drawing the selection box
                //         this.drawingRect = new fabric.Rect({
                //             left: this.startPosition.x,
                //             top: this.startPosition.y,
                //             originX: 'left',
                //             originY: 'top',
                //             width: pointer.x - this.startPosition.x,
                //             height: pointer.y - this.startPosition.y,
                //             angle: 0,
                //             fill: 'rgba(100, 100, 255, 0.3)',
                //             stroke: 'rgba(255, 255, 255, 0.5)',
                //             strokeWidth: this.canvas.selectionLineWidth,
                //             transparentCorners: false,
                //             evented: false,
                //             hasControls: false,
                //         })
                //         this.canvas.add(this.drawingRect)
                //         this.isDrawing = true
                //     }
                //     if (this.polygonMode === AUTORECTANGLE) {
                //         if (
                //             (object && object.type === 'check-button') ||
                //             (object && object.type === 'cross-button')
                //         ) {
                //             this.selectedObjectAddingSegment = object
                //             this.loadingSegmentationMode = false
                //         } else {
                //             this.selectedObjectAddingSegment = null
                //             this.loadingSegmentationMode = true
                //         }
                //     }
                //     if (object && object.type === 'circle') {
                //         this.$store.dispatch(
                //             'editor/setEditorActionMessage',
                //             'A circle is selected',
                //         )

                //         return
                //     }

                //     // Disallow the default selection box
                //     //this.canvas.selection = true

                //     //Revert color of selected object
                //     //this.revertColorPreviousObject()
                // }
            }

            this.canvas.renderAll()
        },
        handleAutoSegmentMouseUp(pointer, id) {
            if (this.loadingSegmentationMode) {
                if (this.selectedObjectAddingSegment) {
                    // Check if the type of the selected object is not 'cross-button' or 'check-button'
                    if (
                        this.selectedObjectAddingSegment.type !==
                            'cross-button' &&
                        this.selectedObjectAddingSegment.type !==
                            'check-button' &&
                        this.selectedObjectAddingSegment.type !== 'polygon' &&
                        this.selectedObjectAddingSegment.type !== 'rect' &&
                        this.selectedObjectAddingSegment.type !== 'circle'
                    ) {
                        // Perform the action  when the type is not 'cross-button' or 'check-button'
                        this.drawPointAutoRectangleSegment(pointer)
                    }

                    // Reset the selectedObjectAddingSegment to null
                    this.selectedObjectAddingSegment = null
                } else {
                    this.drawPointAutoRectangleSegment(pointer)
                }
                this.loadingSegmentationMode = false
            }
        },
        drawingNewRectSelection(pointer, id) {
            if (this.isDrawing) {
                //this.canvas.discardActiveObject()

                // Remove the selection box

                this.canvas.remove(this.drawingRect)

                if (
                    Math.abs(pointer.x - this.startPosition.x) >= 2 &&
                    Math.abs(pointer.y - this.startPosition.y) >= 2
                ) {
                    const { width, height, left, top } =
                        this.computeRectDimensions(pointer)

                    let cat =
                        this.$store.getters['editor/selectedCategory'] ||
                        this.$store.getters['project/getData'].categoriesjson
                            .categories[0]
                    const seg = []
                    const typ = 'default'
                    const annotation = {
                        annotationid: id,
                        category: cat,
                        height: Math.abs(height) / this.scaleFactor,
                        segmentation: seg,
                        typ: typ,
                        width: Math.abs(width) / this.scaleFactor,
                        x: left / this.scaleFactor,
                        y: top / this.scaleFactor,
                    }

                    // if (this.polygonMode === AUTORECTANGLE) {
                    //     //console.log('calc segmentation work')

                    //     const x = parseInt(left / this.scaleFactor)
                    //     const y = parseInt(top / this.scaleFactor)
                    //     const widthValue = parseInt(Math.abs(width) / this.scaleFactor)
                    //     const heightValue = parseInt(Math.abs(height) / this.scaleFactor)
                    //     const bbox = [x, y, widthValue, heightValue]
                    //     this.$store.dispatch('editor/calcSegmentation', {
                    //         image_path: this.$store.getters['project/getImage'].image_path,
                    //         bbox,
                    //     })
                    // }

                    if (this.polygonMode === RECTANGLE) {
                        this.annotationList.push(annotation)
                        // Update the annotation list to show on the right side of the browser
                        this.$store.dispatch(
                            'editor/updatedAnnotationList',
                            this.annotationList
                        )
                        this.$store.dispatch(
                            'editor/updatedAnnotationStatus',
                            'drawing'
                        )
                        this.drawRectangleWithText(
                            left,
                            top,
                            Math.abs(width),
                            Math.abs(height),
                            this.scaleFactor,
                            id,
                            cat,
                            seg,
                            typ,
                            false
                        )
                    }
                }
            }
        },
        updateAnnotationList(pointerGreaterThan2px, pointer) {
            // Update the annotation list to show on the right side of the browser
            this.$store.dispatch(
                'editor/updatedAnnotationList',
                this.annotationList
            )
            if (pointerGreaterThan2px) {
                // Finish the mouse up event and send updated data to the database when moving object
                if (
                    Math.abs(pointer.x - this.startPosition.x) >= 2 &&
                    Math.abs(pointer.y - this.startPosition.y) >= 2
                ) {
                    this.$store.dispatch('editor/updateAnnotation', {
                        projectId: this.$store.getters['project/getProjectId'],
                        image: this.image,
                        image_path:
                            this.$store.getters['project/getImage'].image_path,
                        annotations: this.annotationList,
                    })
                }
            } else {
                // Finish the mouse up event and send updated data to the database
                this.$store.dispatch('editor/updateAnnotation', {
                    projectId: this.$store.getters['project/getProjectId'],
                    image: this.image,
                    image_path:
                        this.$store.getters['project/getImage'].image_path,
                    annotations: this.annotationList,
                })
            }
        },
        async sendAnnotationData() {
            // Send updated data to the database
            try {
                const projectId = this.$store.getters['project/getProjectId']
                const image = this.image
                const image_path =
                    this.$store.getters['project/getImage'].image_path
                const annotations = this.annotationList

                await this.$store.dispatch('editor/updateAnnotation', {
                    projectId,
                    image,
                    image_path,
                    annotations,
                })
                this.$store.dispatch(
                    'notification/loadMessageNotification',
                    {
                        state: 1,
                        message: 'Data sent successfully!',
                        notiId: Date.now(),
                    },
                    { root: true }
                )
            } catch (error) {
                this.$store.dispatch(
                    'notification/loadMessageNotification',
                    {
                        state: 2,
                        message: 'Error sending data!',
                        notiId: Date.now(),
                    },
                    { root: true }
                )
                console.error(error)
            }
        },
        showAllObjectAfterMouseUp() {
            while (this.storeObject.length > 0) {
                const obj = this.storeObject.shift() // Removes the first element from storeObject and returns it
                this.canvas.add(obj)
            }
            this.storeObject = []
        },
        handleMouseUp(event) {
            const pointer = this.canvas.getPointer(event.e)
            const object = event.target
            const id = Date.now().toString()
            this.currentPath = null
            if (this.isPointerInsideImageZoom1(this.startPosition)) {
                return
            }
            if (
                this.polygonMode === AUTOSEGMENT ||
                this.polygonMode === AUTORECTANGLE
            ) {
                this.handleAutoSegmentMouseUp(pointer, id)
                //adding point to get auto rectangle segmentation
                // if (this.loadingSegmentationMode) {
                //     if (this.selectedObjectAddingSegment) {
                //         // Check if the type of the selected object is not 'cross-button' or 'check-button'
                //         if (
                //             this.selectedObjectAddingSegment.type !== 'cross-button' &&
                //             this.selectedObjectAddingSegment.type !== 'check-button' &&
                //             this.selectedObjectAddingSegment.type !== 'polygon' &&
                //             this.selectedObjectAddingSegment.type !== 'rect' &&
                //             this.selectedObjectAddingSegment.type !== 'circle'
                //         ) {
                //             // Perform the action  when the type is not 'cross-button' or 'check-button'
                //             this.drawPointAutoRectangleSegment(pointer)
                //         }
                //         // Reset the selectedObjectAddingSegment to null
                //         this.selectedObjectAddingSegment = null
                //     } else {
                //         this.drawPointAutoRectangleSegment(pointer)
                //     }
                //     this.loadingSegmentationMode = false
                // }
            }
            if (
                this.polygonMode === RECTANGLE ||
                this.polygonMode === AUTORECTANGLE
            ) {
                //drawing new rectangle on canvas
                this.drawingNewRectSelection(pointer, id)
                // if (this.isDrawing) {
                //     //this.canvas.discardActiveObject()

                //     // Remove the selection box

                //     this.canvas.remove(this.drawingRect)

                //     if (
                //         Math.abs(pointer.x - this.startPosition.x) >= 2 &&
                //         Math.abs(pointer.y - this.startPosition.y) >= 2
                //     ) {
                //         const { width, height, left, top } = this.computeRectDimensions(pointer)

                //         let cat =
                //             this.$store.getters['editor/selectedCategory'] ||
                //             this.$store.getters['project/getData'].categoriesjson.categories[0]
                //         const seg = []
                //         const typ = 'default'
                //         const annotation = {
                //             annotationid: id,
                //             category: cat,
                //             height: Math.abs(height) / this.scaleFactor,
                //             segmentation: seg,
                //             typ: typ,
                //             width: Math.abs(width) / this.scaleFactor,
                //             x: left / this.scaleFactor,
                //             y: top / this.scaleFactor,
                //         }

                //         // if (this.polygonMode === AUTORECTANGLE) {
                //         //     //console.log('calc segmentation work')

                //         //     const x = parseInt(left / this.scaleFactor)
                //         //     const y = parseInt(top / this.scaleFactor)
                //         //     const widthValue = parseInt(Math.abs(width) / this.scaleFactor)
                //         //     const heightValue = parseInt(Math.abs(height) / this.scaleFactor)
                //         //     const bbox = [x, y, widthValue, heightValue]
                //         //     this.$store.dispatch('editor/calcSegmentation', {
                //         //         image_path: this.$store.getters['project/getImage'].image_path,
                //         //         bbox,
                //         //     })
                //         // }

                //         if (this.polygonMode === RECTANGLE) {
                //             this.annotationList.push(annotation)
                //             // Update the annotation list to show on the right side of the browser
                //             this.$store.dispatch(
                //                 'editor/updatedAnnotationList',
                //                 this.annotationList,
                //             )
                //             this.$store.dispatch('editor/updatedAnnotationStatus', 'drawing')
                //             this.drawRectangleWithText(
                //                 left,
                //                 top,
                //                 Math.abs(width),
                //                 Math.abs(height),
                //                 this.scaleFactor,
                //                 id,
                //                 cat,
                //                 seg,
                //                 typ,
                //                 false,
                //             )
                //         }
                //     }
                // }

                // Finish the mouse up event and send updated data to the database
                if (
                    Math.abs(pointer.x - this.startPosition.x) >= 2 &&
                    Math.abs(pointer.y - this.startPosition.y) >= 2 &&
                    (this.polygonMode === RECTANGLE ||
                        this.polygonMode === AUTORECTANGLE)
                ) {
                    this.$store.dispatch(
                        'editor/setEditorActionMessage',
                        'Updating the data'
                    )
                    this.$store.dispatch('editor/updateAnnotation', {
                        projectId: this.$store.getters['project/getProjectId'],
                        image: this.image,
                        image_path:
                            this.$store.getters['project/getImage'].image_path,
                        annotations: this.annotationList,
                    })
                }

                this.isDrawing = false

                //show all object again
                this.showAllObjectAfterMouseUp()
            } else if (
                this.polygonMode === SEGMENTATION ||
                this.polygonMode === AUTOSEGMENT
            ) {
                this.canvas.discardActiveObject()
                if (
                    (this.polygonMode === SEGMENTATION ||
                        this.polygonMode === AUTOSEGMENT) &&
                    this.drawingPolygon &&
                    !this.movingCircle
                ) {
                    this.updateAnnotationList(false, pointer)

                    this.drawingPolygon = false
                }
                if (this.drawingPolygon && !this.movingCircle) {
                    this.updateAnnotationList(true, pointer)
                    this.drawingPolygon = false
                } else {
                    this.showAllObjectAfterMouseUp()
                }
                if (this.objectSelectedPolygon) {
                    this.objectSelectedPolygon.set({
                        selectable: true,
                        evented: true,

                        lockMovementX: false,
                        lockMovementY: false,
                    })
                    this.objectSelectedPolygon = null
                }
            }

            this.canvas.renderAll()
        },
        drawPointAutoRectangleSegment(pointer) {
            //clicking on canvas then sending the point to the database
            const id = Date.now().toString()
            const bbox = []
            const point = [
                pointer.x / this.scaleFactor,
                pointer.y / this.scaleFactor,
            ]
            this.$store.dispatch('editor/calcSegmentation', {
                image_path: this.$store.getters['project/getImage'].image_path,
                bbox,
                point,
            })
            this.$store.dispatch(
                'editor/setEditorActionMessage',
                'Sending request to the database'
            )
            const circle = new fabric.Circle({
                radius: 5,
                fill: '#ffffff',
                stroke: '#333333',
                strokeWidth: 0.5,
                left: pointer.x,
                top: pointer.y,
                selectable: false,
                hasBorders: false,
                hasControls: false,
                originX: 'center',
                originY: 'center',
                id: id,
            })
            this.canvas.add(circle)
            this.temporaryCircle.push(circle)
            this.removeTempCircle = circle

            // // Remove the circle after 3 seconds
            // setTimeout(() => {
            //     this.canvas.remove(circle)
            //     //this.temporaryCircle = this.temporaryCircle.filter((c) => c !== circle)
            // }, 3000)
        },
        removeAllCircles() {
            //console.log('check removed circle: ', this.temporaryCircle)
            //this.canvas.getObjects().find((obj) => obj.type === 'polygon' && obj === target)
            this.canvas.forEachObject((obj) => {
                if (
                    obj.id === this.removeTempCircle.id &&
                    obj.type === 'circle'
                ) {
                    this.canvas.remove(obj) // Remove the existing polygon by ID
                }
            })

            this.temporaryCircle.forEach((circle) => {
                //console.log('removed circle function ', circle)
                this.canvas.remove(circle)
            })
        },
        updateAnnotations(object, moving) {
            //const annotations = [...this.annotationList]
            const index = this.annotationList.findIndex(
                (anno) => anno.annotationid === object.id
            )
            //console.log('check index 2029: ', index)
            let textAnnotation = ''
            if (index !== -1) {
                let newX, newY, newHeight, newWidth
                if (object.type === 'rect' || object.type === 'polygon') {
                    newX = object.left
                    newY = object.top
                    newWidth = object.width * object.scaleX
                    newHeight = object.height * object.scaleY

                    // Update the annotation values
                    this.annotationList[index].x = newX / this.scaleFactor
                    this.annotationList[index].y = newY / this.scaleFactor
                    this.annotationList[index].width =
                        newWidth / this.scaleFactor
                    this.annotationList[index].height =
                        newHeight / this.scaleFactor
                }

                //console.log('object points: ', object.points)
                //console.log('object update points: ', object.updatePoints)
                let points = []
                //console.log('show this annotation List: ', this.annotationList)
                //console.log('check folder: ', this.annotationList[index])
                if (object.updatePoints && this.movingPolygonStatus) {
                    object.updatePoints.forEach((point) => {
                        //console.log('check point circle: ', point.id)
                        points.push({
                            x: point.x / this.scaleFactor,
                            y: point.y / this.scaleFactor,
                        })
                    })
                    //console.log('update points to database: ', points)

                    this.annotationList[index].segmentation = points
                }
                if (object.updateCirclePoints && !this.movingPolygonStatus) {
                    object.updateCirclePoints.forEach((point) => {
                        //console.log('check point circle: ', point)
                        points.push({
                            x: point.x,
                            y: point.y,
                        })
                    })
                    //console.log('update points to database: ', points)
                    //console.log('check folder: ', this.annotationList[index])
                    const polygon = new fabric.Polygon(points, {
                        strokeWidth: 2,
                        fill: '#ffffff',
                        opacity: 0.5,
                        hasBorders: true,
                        hasControls: true,
                        strokeUniform: true,
                        selectable: true,
                        lockScalingX: false,
                        lockScalingY: false,
                    })
                    // Update the annotation values
                    this.annotationList[index].x = polygon.left
                    this.annotationList[index].y = polygon.top
                    this.annotationList[index].width = polygon.width
                    this.annotationList[index].height = polygon.height

                    this.annotationList[index].segmentation = points
                }

                this.movingCircle = false
            } else {
                this.movingCircle = true
            }
        },
        hideOtherObjects(target) {
            this.canvas.getObjects().forEach((obj) => {
                if (obj !== target) {
                    obj.set('opacity', 0)
                }
            })
        },
        setLastProperties(object) {
            //Update the new values of the object
            object.set({
                lastLeft: object.left,
                lastTop: object.top,
                lastScaleX: object.scaleX,
                lastScaleY: object.scaleY,
            })
        },
        resetToLastProperties(object) {
            //Update the new values of the object
            object.set({
                left: object.lastLeft,
                top: object.lastTop,
                scaleX: object.lastScaleX,
                scaleY: object.lastScaleY,
            })
        },
        //Check the boundaries of the image
        isInBoundaries(object, minLeft, maxLeft, minTop, maxTop) {
            object.setCoords()
            const b = object.getBoundingRect()
            const tolerance = 2
            return (
                b.left >= minLeft &&
                maxLeft + tolerance >= b.left + b.width &&
                maxTop + tolerance >= b.top + b.height &&
                b.top >= minTop
            )
        },

        calculateImageBounds() {
            const zoom = this.canvas.getZoom()
            const viewportTransform = this.canvas.viewportTransform

            // compute the width and height of the image, taking into account the zoom level
            const imageWidth = this.image.width * this.scaleFactor * zoom
            const imageHeight = this.image.height * this.scaleFactor * zoom

            // get the top-left coordinates of the image in the canvas,
            // taking into account any pan transformations
            const imageLeft = viewportTransform[4]
            const imageTop = viewportTransform[5]
            //console.log('show image left top: ', imageLeft, imageTop)

            // compute the boundaries of the image
            const minLeft = Math.max(0, imageLeft)
            const maxLeft =
                imageLeft < 0 ? imageLeft + imageWidth : minLeft + imageWidth
            const minTop = Math.max(0, imageTop)
            const maxTop =
                imageTop < 0 ? imageTop + imageHeight : minTop + imageHeight
            //console.log('check value of bounds: ', minLeft, maxLeft, minTop, maxTop)

            return { minLeft, maxLeft, minTop, maxTop }
        },

        updateCheckCrossButtons(object) {
            const checkButton = this.checkArray.find(
                (check) => check.id === object.id
            )
            //console.log('check Button: ', checkButton)
            if (checkButton) {
                this.canvas.remove(checkButton)
                if (object.type === 'rect') {
                    if (object.top === 0) {
                        checkButton.set({
                            left:
                                object.left + object.width * object.scaleX - 35,
                            top: object.top,
                            selectable: false,
                            hasBorders: false,
                            hasControls: false,
                            lockMovementX: true,
                            lockMovementY: true,
                        })
                    } else {
                        checkButton.set({
                            left:
                                object.left + object.width * object.scaleX - 35,
                            top: object.top - 25,
                            selectable: false,
                            hasBorders: false,
                            hasControls: false,
                            lockMovementX: true,
                            lockMovementY: true,
                        })
                    }
                    checkButton.rect = object
                }
                if (object.type === 'polygon') {
                    if (object.top < 10) {
                        checkButton.set({
                            left:
                                object.left + object.width * object.scaleX - 35,
                            top: object.top,
                            selectable: false,
                            hasBorders: false,
                            hasControls: false,
                            lockMovementX: true,
                            lockMovementY: true,
                        })
                    } else {
                        checkButton.set({
                            left:
                                object.left + object.width * object.scaleX - 35,
                            top: object.top - 25,
                            selectable: false,
                            hasBorders: false,
                            hasControls: false,
                            lockMovementX: true,
                            lockMovementY: true,
                        })
                    }
                    checkButton.polygon = object
                }
                if (object.type === 'circle') {
                    checkButton.polygon = object.polygon
                }
                this.canvas.add(checkButton)
                this.canvas.bringToFront(checkButton)
            }
            const crossButton = this.crossArray.find(
                (cross) => cross.id === object.id
            )

            if (crossButton) {
                this.canvas.remove(crossButton)
                if (object.type === 'rect') {
                    if (object.top === 0) {
                        crossButton.set({
                            left:
                                object.left + object.width * object.scaleX - 20,
                            top: object.top,
                            selectable: false,
                            hasBorders: false,
                            hasControls: false,
                            lockMovementX: true,
                            lockMovementY: true,
                        })
                    } else {
                        crossButton.set({
                            left:
                                object.left + object.width * object.scaleX - 20,
                            top: object.top - 25,
                            selectable: false,
                            hasBorders: false,
                            hasControls: false,
                            lockMovementX: true,
                            lockMovementY: true,
                        })
                    }
                    crossButton.rect = object
                }
                if (object.type === 'polygon') {
                    if (object.top < 10) {
                        crossButton.set({
                            left:
                                object.left + object.width * object.scaleX - 20,
                            top: object.top,
                            selectable: false,
                            hasBorders: false,
                            hasControls: false,
                            lockMovementX: true,
                            lockMovementY: true,
                        })
                    } else {
                        crossButton.set({
                            left:
                                object.left + object.width * object.scaleX - 20,
                            top: object.top - 25,
                            selectable: false,
                            hasBorders: false,
                            hasControls: false,
                            lockMovementX: true,
                            lockMovementY: true,
                        })
                    }
                    crossButton.polygon = object
                }
                if (object.type === 'circle') {
                    checkButton.polygon = object.polygon
                }
                this.canvas.add(crossButton)
                this.canvas.bringToFront(crossButton)
            }
        },
        handleRectMoving(object, text, textCenter, textAnnotation) {
            if (text) {
                text.set({
                    left: object.left,
                    top: object.top - 20,
                })

                // Update the text content
                text.text = textAnnotation
            }
            if (textCenter) {
                textCenter.set({
                    left: object.left + (object.width * object.scaleX) / 2,
                    top: object.top + (object.height * object.scaleY) / 2,
                })
            }
        },
        handlePolygonMoving(object, text, textCenter) {
            const points = object.get('points')

            //get the new points after moving
            const transformedPoints = points.map((p) => {
                const transformedPoint = new fabric.Point(
                    p.x - object.pathOffset.x,
                    p.y - object.pathOffset.y
                )
                return fabric.util.transformPoint(
                    transformedPoint,
                    object.calcTransformMatrix()
                )
            })
            // Create a copy of the transformedPoints array
            const sortedPoints = transformedPoints.slice()
            sortedPoints.sort((a, b) => {
                if (a.x !== b.x) {
                    return a.x - b.x // Sort by smallest left value first
                } else {
                    return a.y - b.y // If left values are the same, sort by smallest top value
                }
            })

            // Get the point with the smallest top and left values
            const smallestPoint = sortedPoints[0]

            // Update the object with the sorted transformedPoints array
            // Create a new array of fabric.Points
            const updatedPoints = transformedPoints.map((p) => {
                return {
                    x: p.x,
                    y: p.y,
                }
            })

            // Update the object with the new array of points
            object.set('updatePoints', updatedPoints)
            //set movingPolygonStatus to update to the database
            this.movingPolygonStatus = true

            const circleArray = this.circleArray.find(
                (circle) => circle.id === object.id
            )
            if (circleArray) {
                this.canvas.forEachObject((obj) => {
                    if (obj.id === object.id && obj.type === 'circle') {
                        this.canvas.remove(obj) // Remove the existing polygon by ID
                    }
                })
                //update points to the circleArray
                circleArray.forEach((circle, index) => {
                    this.canvas.remove(circle)
                    // Retrieve the corresponding updated point
                    const updatedPoint = updatedPoints[index]

                    // Update the left and top coordinates of the circle
                    circle.left = updatedPoint.x
                    circle.top = updatedPoint.y
                    this.canvas.add(circle)
                })
            }
            //console.log('checked text moving: ', text)
            if (text) {
                text.set({
                    left: smallestPoint.x,
                    top: smallestPoint.y,
                })

                //text.set('stroke', 'white')
            }

            if (textCenter) {
                textCenter.set({
                    left: object.left + (object.width * object.scaleX) / 2,
                    top: object.top + (object.height * object.scaleY) / 2,
                })
            }
            if (
                this.polygonMode === SEGMENTATION ||
                this.polygonMode === AUTOSEGMENT
            ) {
                this.drawingPolygon = true
            }
        },
        handleCircleMoving(object, text, textCenter) {
            const circleArray = this.circleArray.find(
                (circle) => circle.id === object.id
            )

            if (circleArray) {
                let points = []
                let databasePoint = []
                const circleIndex = circleArray.findIndex(
                    (circle) => circle.subId === object.subId
                )
                if (circleIndex !== -1) {
                    circleArray[circleIndex].left = object.left
                    circleArray[circleIndex].top = object.top

                    //console.log('check polygon pointArray: ', this.pointArray)
                }
                this.canvas.forEachObject((obj) => {
                    if (obj.id === object.id && obj.type === 'polygon') {
                        this.canvas.remove(obj) // Remove the existing polygon by ID
                    }
                })
                circleArray.forEach((pos) => {
                    points.push({
                        x: pos.left,
                        y: pos.top,
                    })
                    databasePoint.push({
                        x: pos.left / this.scaleFactor,
                        y: pos.top / this.scaleFactor,
                    })
                })

                const polygon = new fabric.Polygon(points, {
                    stroke: this.generateColorFromWord(object.category),
                    strokeWidth: 2,
                    fill: '#ffffff',
                    opacity: 0.5,
                    hasBorders: true,
                    hasControls: true,
                    strokeUniform: true,
                    selectable: true,
                    lockScalingX: false,
                    lockScalingY: false,
                })

                polygon.setControlsVisibility({
                    mtr: false,
                })

                polygon.id = object.id

                // Create a copy of the points array
                const sortedPoints = points.slice()
                sortedPoints.sort((a, b) => {
                    if (a.x !== b.x) {
                        return a.x - b.x // Sort by smallest left value first
                    } else {
                        return a.y - b.y // If left values are the same, sort by smallest top value
                    }
                })

                // Get the point with the smallest top and left values
                const smallestPoint = sortedPoints[0]
                if (text) {
                    text.set({
                        left: smallestPoint.x,
                        top: smallestPoint.y,
                    })
                }
                if (textCenter) {
                    textCenter.set({
                        left: polygon.left + polygon.width / 2,
                        top: polygon.top + polygon.height / 2,
                    })
                }

                polygon.textPolygon = text
                polygon.centerPlus = textCenter
                polygon.smallestPoint = smallestPoint
                polygon.category = object.category
                //In case of the polygon is from the api call
                polygon.set('updatePoints', points)
                object.polygon = polygon
                // Update the object with the new array of points
                object.set('updateCirclePoints', databasePoint)
                // Update the object with the new array of points

                this.canvas.add(polygon)
                this.canvas.sendToBack(polygon)
                this.updateCheckCrossButtons(object)
                if (this.polygonMode) {
                    //update data to database
                    this.drawingPolygon = true
                }
            }
        },
        handleObjectMoving(options) {
            const object = options.target
            //this.hideOtherObjects(object)
            //console.log('target moving obj: ', object, object.id)
            this.selectedObjectAddingSegment = object

            this.isDrawing = false
            this.$store.dispatch('editor/updatedAnnotationStatus', 'moving')
            this.$store.dispatch(
                'editor/setEditorActionMessage',
                'Moving an object'
            )
            const { minLeft, maxLeft, minTop, maxTop } =
                this.calculateImageBounds()

            // Initialize lastLeft and lastTop if they are not defined
            if (object.lastLeft === undefined) {
                object.lastLeft = object.left
            }
            if (object.lastTop === undefined) {
                object.lastTop = object.top
            }

            object.setCoords()
            const b = object.getBoundingRect()
            // if (object.type === 'check-button' || object.type === 'cross-button') {
            //     return
            // }

            // Condition checks...
            if (
                !(
                    b.left > minLeft &&
                    b.top > minTop &&
                    b.left + b.width < maxLeft + 2 &&
                    b.top + b.height < maxTop + 2
                )
            ) {
                // If lastLeft and lastTop are undefined, set them to the current left and top
                object.left =
                    object.lastLeft !== undefined
                        ? object.lastLeft
                        : object.left
                object.top =
                    object.lastTop !== undefined ? object.lastTop : object.top
            }

            // Update lastLeft and lastTop regardless of whether the move was valid
            object.lastLeft = object.left
            object.lastTop = object.top

            //Update information of the rectangle
            //update text
            let textAnnotation
            if (object.info) {
                textAnnotation = `${object.info.category} w: ${Math.round(
                    (object.width * object.scaleX) / this.scaleFactor
                )} h: ${Math.round(
                    (object.height * object.scaleY) / this.scaleFactor
                )}`
            }

            //Find the text and the cross to move simultaneously
            const text = this.textArray.find((text) => text.id === object.id)
            const textCenter = this.textCenter.find(
                (txt) => txt.id === object.id
            )

            //Don't move the check-button and cross-button object
            if (
                object.type === 'check-button' ||
                object.type === 'cross-button'
            ) {
                return
            }

            // Move the text along with the rectangle by applying the same deltas
            if (object.type === 'rect') {
                this.handleRectMoving(object, text, textCenter, textAnnotation)
                this.movingPolygonStatus = false
                this.updateCheckCrossButtons(object)
            } else if (object.type === 'polygon') {
                this.handlePolygonMoving(object, text, textCenter)
                this.updateCheckCrossButtons(object)
            } else if (object.type === 'circle') {
                //console.log('circle object: ', object)
                this.movingPolygonStatus = false
                this.handleCircleMoving(object, text, textCenter)

                this.canvas.renderAll()
            }
            this.canvas.renderAll()
            this.updateAnnotations(object, true)
            this.selectedPolygonAddingPoint = null
        },
        handleRectScaling(object, text, textAnnotation) {
            if (text) {
                text.set({
                    left: object.left,
                    top: object.top - 20,
                })

                // Update the text content
                text.text = textAnnotation
            }
            this.movingPolygonStatus = false
        },
        handlePolygonScaling(object, text) {
            const points = object.get('points')

            const transformedPoints = points.map((p) => {
                const transformedPoint = new fabric.Point(
                    p.x - object.pathOffset.x,
                    p.y - object.pathOffset.y
                )
                return fabric.util.transformPoint(
                    transformedPoint,
                    object.calcTransformMatrix()
                )
            })
            // Create a copy of the transformedPoints array
            const sortedPoints = transformedPoints.slice()
            sortedPoints.sort((a, b) => {
                if (a.x !== b.x) {
                    return a.x - b.x // Sort by smallest left value first
                } else {
                    return a.y - b.y // If left values are the same, sort by smallest top value
                }
            })

            // Get the point with the smallest top and left values
            const smallestPoint = sortedPoints[0]

            // Update the object with the sorted transformedPoints array
            const updatedPoints = transformedPoints.map((p) => {
                return {
                    x: p.x,
                    y: p.y,
                }
            })

            // Update the object with the new array of points
            object.set('updatePoints', updatedPoints)

            const circleArray = this.circleArray.find(
                (circle) => circle.id === object.id
            )
            //console.log('circle arrays: ', circleArray)
            circleArray.forEach((circle, index) => {
                this.canvas.remove(circle)
                // Retrieve the corresponding updated point
                const updatedPoint = updatedPoints[index]

                // Update the left and top coordinates of the circle
                circle.left = updatedPoint.x
                circle.top = updatedPoint.y
                this.canvas.add(circle)
            })

            if (text) {
                text.set({
                    left: smallestPoint.x,
                    top: smallestPoint.y,
                })

                //text.set('stroke', 'white')
            }
            if (
                this.polygonMode === SEGMENTATION ||
                this.polygonMode === AUTOSEGMENT
            ) {
                this.drawingPolygon = true
            }
            this.movingPolygonStatus = true
        },

        handleObjectScaling(options) {
            const object = options.target
            //this.hideOtherObjects(object)
            this.selectedObjectAddingSegment = object

            this.isDrawing = false
            this.$store.dispatch('editor/updatedAnnotationStatus', 'scaling')
            this.$store.dispatch(
                'editor/setEditorActionMessage',
                'Rescaling an object'
            )
            const { minLeft, maxLeft, minTop, maxTop } =
                this.calculateImageBounds()

            // this.canvas.setActiveObject(object)

            // Initialize properties if they are not defined or are NaN
            if (isNaN(object.left) || object.left === undefined)
                object.left = object.lastLeft || 0
            if (isNaN(object.top) || object.top === undefined)
                object.top = object.lastTop || 0
            if (isNaN(object.scaleX) || object.scaleX === undefined)
                object.scaleX = object.lastScaleX || 1
            if (isNaN(object.scaleY) || object.scaleY === undefined)
                object.scaleY = object.lastScaleY || 1

            if (this.isInBoundaries(object, minLeft, maxLeft, minTop, maxTop)) {
                this.setLastProperties(object)
            } else {
                this.resetToLastProperties(object)
            }

            //Update information of the rectangle
            // //update text
            let textAnnotation
            if (object.info) {
                textAnnotation = `${object.info.category} w: ${Math.round(
                    (object.width * object.scaleX) / this.scaleFactor
                )} h: ${Math.round(
                    (object.height * object.scaleY) / this.scaleFactor
                )}`
            }

            const text = this.textArray.find((text) => text.id === object.id)

            const textCenter = this.textCenter.find(
                (txt) => txt.id === object.id
            )

            if (object.type === 'rect') {
                this.handleRectScaling(object, text, textAnnotation)
                this.updateCheckCrossButtons(object)
            } else if (object.type === 'polygon') {
                this.handlePolygonScaling(object, text)
                this.updateCheckCrossButtons(object)
            }

            if (textCenter) {
                textCenter.set({
                    left: object.left + (object.width * object.scaleX) / 2,
                    top: object.top + (object.height * object.scaleY) / 2,
                })
            }
            this.selectedPolygonAddingPoint = null
            this.updateAnnotations(object, false)
        },
        disableContextMenu(event) {
            event.preventDefault() // Prevent default context menu behavior
        },
        //check the parent element bounding
        checkWithinBounds(event, parentBounds) {
            const mouseX = event.e.clientX
            const mouseY = event.e.clientY

            return (
                mouseX >= parentBounds.left &&
                mouseX <= parentBounds.right &&
                mouseY >= parentBounds.top &&
                mouseY <= parentBounds.bottom
            )
        },
        //find the object by id
        findRectangleById(annotationId) {
            // Find the corresponding rectangle in the canvas based on its ID
            const objects = this.canvas.getObjects()
            return objects.find((obj) => obj.id === annotationId)
        },
        generateColorFromWord(word) {
            // Generate a hash code from the word
            let hash = 100
            for (let i = 0; i < word.length; i++) {
                hash = word.charCodeAt(i) + ((hash << 5) - hash)
            }

            // Adjust the hash code to limit the color range
            hash = (hash & 0x00ffffff) | 0x800000 // Set the highest bit to ensure a bright color

            // Convert the hash code to a hexadecimal color code
            const color = hash.toString(16).toUpperCase()

            // Prepend zeros if the color code is shorter than 6 characters
            const paddedColor = ('00000' + color).slice(-6)

            return '#' + paddedColor
        },

        drawRectangleWithText(
            left,
            top,
            width,
            height,
            scale,
            id,
            cat,
            seg,
            typ,
            fromData
        ) {
            //create the each annotation
            const textAnnotation = `${cat} w: ${Math.round(
                fromData ? width : width / scale
            )} h: ${Math.round(fromData ? height : height / scale)}`

            if (seg.length === 0) {
                const rect = new fabric.Rect({
                    left: fromData ? left * scale : left,
                    top: fromData ? top * scale : top,
                    width: fromData ? width * scale : width,
                    height: fromData ? height * scale : height,
                    fill: 'transparent',
                    stroke: this.generateColorFromWord(cat),
                    strokeWidth: 2 / this.zoomScale,
                    originX: 'left',
                    originY: 'top',
                    centeredRotation: false,
                    lockScalingX: false,
                    lockScalingY: false,
                    lockRotation: false,
                    hasControls: true,
                    cornerSize: 16,
                    hasBorders: true,
                    padding: 0,
                    lastLeft: fromData ? left * scale : left, // Add this
                    lastTop: fromData ? top * scale : top, // And this
                    lastScaleX: 1, // Assuming the initial scale is 1
                    lastScaleY: 1, // Assuming the initial scale is 1
                    noScaleCache: false,
                    strokeUniform: true,
                    selectable: true, //temporarily change it to move from centerPlus
                })

                rect.info = {
                    annotationid: id,
                    category: cat,
                    segmentation: seg,
                    typ: typ,
                }
                // rect.hasRotatingPoint = false
                rect.setControlsVisibility({
                    mtr: false,
                })
                //console.log('accept the rectangle: ', rect)

                // Create a "+" text at the center of the rectangle
                const centerPlus = new fabric.Text('+', {
                    left:
                        (fromData ? left * scale : left) +
                        (fromData ? width * scale : width) / 2,
                    top:
                        (fromData ? top * scale : top) +
                        (fromData ? height * scale : height) / 2,
                    fontSize: 40 / this.zoomScale,
                    fill: this.generateColorFromWord(cat),
                    selectable: false,
                    evented: false,
                    originX: 'center',
                    originY: 'center',
                })
                const text = new fabric.Text(textAnnotation, {
                    left: fromData ? left * scale : left,
                    top: fromData ? (top - 25) * scale : top - 25,
                    fontSize: 20,
                    fill: 'white',
                    selectable: false,
                    evented: false,
                })

                text.setControlsVisibility({
                    mtr: false,
                })

                // Attach the "+" text to the rectangle
                rect.centerPlus = centerPlus
                rect.text = text
                centerPlus.rect = rect
                centerPlus.category = rect.info.category

                // Assign the annotation ID as the text ID and centerPlus ID
                text.id = id
                rect.id = id
                centerPlus.id = id

                const indexText = this.textArray.findIndex(
                    (txt) => txt.id === text.id
                )

                if (indexText !== -1) {
                    this.textArray[indexText].left = text.left
                    this.textArray[indexText].top = text.top
                } else {
                    this.textArray.push(text)
                }

                const indexCenter = this.textCenter.findIndex(
                    (txt) => txt.id === centerPlus.id
                )
                if (indexCenter !== -1) {
                    this.textCenter[indexCenter].left = centerPlus.left
                    this.textCenter[indexCenter].top = centerPlus.top
                } else {
                    this.textCenter.push(centerPlus)
                }
                //console.log('drawing : ', rect.id, centerPlus.id, text.id)
                this.canvas.add(rect, centerPlus, text)
            }
            if (seg.length > 0) {
                this.drawSegmentation(seg, id, cat, false)
            }
            this.canvas.renderAll()
        },
        drawSegmentation(seg, id, cat, auto) {
            //console.log('check seg: ', seg)
            const points = []
            const pointsOriginal = []
            const pointCircle = []

            // console.log('point array: ', pointArray)
            if (auto === false) {
                seg.forEach((point, index) => {
                    points.push({
                        x: point.x * this.scaleFactor,
                        y: point.y * this.scaleFactor,
                    })
                    pointsOriginal.push({
                        x: point.x * this.scaleFactor,
                        y: point.y * this.scaleFactor,
                    })
                    const subId = `${id}-${index}`
                    const circle = new fabric.Circle({
                        radius: 5,
                        fill: '#ffffff',
                        stroke: '#333333',
                        strokeWidth: 0.5,
                        left: point.x * this.scaleFactor,
                        top: point.y * this.scaleFactor,
                        selectable: true,
                        hasBorders: false,
                        hasControls: false,
                        originX: 'center',
                        originY: 'center',
                        id: id,
                        subId: subId,
                        category: cat,
                    })
                    //this.canvas.add(circle)
                    pointCircle.push(circle)
                })
            } else {
                //console.log('segmentation: ', seg)

                for (let i = 0; i < seg.length; i++) {
                    const point = seg[i]
                    //console.log('point of segmentations: ', point)

                    points.push({
                        x: point[0] * this.scaleFactor,
                        y: point[1] * this.scaleFactor,
                    })
                    pointsOriginal.push({
                        x: point[0] * this.scaleFactor,
                        y: point[1] * this.scaleFactor,
                    })
                    const subId = `${id}-${i}`
                    const circle = new fabric.Circle({
                        radius: 5,
                        fill: '#ffffff',
                        stroke: '#333333',
                        strokeWidth: 0.5,
                        left: point[0] * this.scaleFactor,
                        top: point[1] * this.scaleFactor,
                        selectable: true,
                        hasBorders: false,
                        hasControls: false,
                        originX: 'center',
                        originY: 'center',
                        id: id,
                        subId: subId,
                        category: cat,
                    })
                    //this.canvas.add(circle)
                    pointCircle.push(circle)
                }
            }
            // Sort the points based on the smallest top and left values
            points.sort((a, b) => {
                if (a.x !== b.x) {
                    return a.x - b.x // Sort by smallest left value first
                } else {
                    return a.y - b.y // If left values are the same, sort by smallest top value
                }
            })

            // Get the point with the smallest top and left values
            const smallestPoint = points[0]

            pointCircle.id = id
            // Check if the ID already exists in the circleArray
            const existingCircle = this.circleArray.find(
                (circle) => circle.id === id
            )
            if (!existingCircle) {
                this.circleArray.push(pointCircle)
            }

            const polygon = new fabric.Polygon(pointsOriginal, {
                stroke: this.generateColorFromWord(cat),
                strokeWidth: 2,
                fill: '#ffffff',
                opacity: 0.5,
                hasBorders: true,
                hasControls: true,
                strokeUniform: true,
                selectable: true,
                lockScalingX: false,
                lockScalingY: false,
            })

            polygon.set('updatePoints', pointsOriginal)

            polygon.setControlsVisibility({
                mtr: false,
            })

            const textPolygon = new fabric.Text(cat, {
                left: smallestPoint.x,
                top: smallestPoint.y,
                fontSize: 20,
                fill: this.generateColorFromWord(cat),
                originX: 'center',
                originY: 'center',
                selectable: false,
                evented: false,
            })
            const indexText = this.textArray.findIndex(
                (txt) => txt.id === textPolygon.id
            )

            if (indexText !== -1) {
                this.textArray[indexText].left = text.left
                this.textArray[indexText].top = text.top
            } else {
                this.textArray.push(textPolygon)
            }
            const centerPlus = new fabric.Text('+', {
                left: polygon.left + polygon.width / 2,
                top: polygon.top + polygon.height / 2,
                fontSize: 40 / this.zoomScale,
                fill: this.generateColorFromWord(cat),
                selectable: false,
                evented: false,
                originX: 'center',
                originY: 'center',
            })
            const indexCenter = this.textCenter.findIndex(
                (txt) => txt.id === centerPlus.id
            )
            if (indexCenter !== -1) {
                this.textCenter[indexCenter].left = centerPlus.left
                this.textCenter[indexCenter].top = centerPlus.top
            } else {
                this.textCenter.push(centerPlus)
            }
            let rectData = {}

            //Information of the polygon
            polygon.id = id
            centerPlus.id = id
            polygon.category = cat
            textPolygon.id = id
            polygon.textPolygon = textPolygon
            polygon.centerPlus = centerPlus
            polygon.smallestPoint = smallestPoint
            // Create check-mark button
            let checkButton, crossButton
            if (auto) {
                rectData.x = polygon.left
                rectData.y = polygon.top
                rectData.width = polygon.width
                rectData.height = polygon.height

                // const checkButton = new CheckButton({
                //     left: polygon.left + polygon.width - 12,
                //     top: polygon.top - 20,
                // })

                // // Create cross button
                // const crossButton = new CrossButton({
                //     left: polygon.left + polygon.width + 10,
                //     top: polygon.top - 20,
                // })
                console.log('check polygon.top: ', polygon.top)
                if (polygon.top <= 20) {
                    console.log('check polygon.top: ', polygon.top)
                    checkButton = new CheckButton({
                        left: polygon.left + polygon.width - 32,
                        top: polygon.top,
                        selectable: false,
                        hasBorders: false,
                        hasControls: false,
                        lockMovementX: true,
                        lockMovementY: true,
                    })

                    // Create cross button
                    crossButton = new CrossButton({
                        left: polygon.left + polygon.width - 12,
                        top: polygon.top,
                        selectable: false,
                        hasBorders: false,
                        hasControls: false,
                        lockMovementX: true,
                        lockMovementY: true,
                    })
                } else {
                    checkButton = new CheckButton({
                        left: polygon.left + polygon.width - 32,
                        top: polygon.top - 25,
                        selectable: false,
                        hasBorders: false,
                        hasControls: false,
                        lockMovementX: true,
                        lockMovementY: true,
                    })

                    // Create cross button
                    crossButton = new CrossButton({
                        left: polygon.left + polygon.width - 12,
                        top: polygon.top - 25,
                        selectable: false,
                        hasBorders: false,
                        hasControls: false,
                        lockMovementX: true,
                        lockMovementY: true,
                    })
                }
                checkButton.id = id
                crossButton.id = id
                checkButton.polygon = polygon
                crossButton.polygon = polygon
                polygon.checkButton = checkButton
                polygon.crossButton = crossButton

                const indexCheck = this.checkArray.findIndex(
                    (check) => check.id === id
                )

                if (indexCheck === -1) {
                    this.checkArray.push(checkButton)
                }
                const indexCross = this.crossArray.findIndex(
                    (cross) => cross.id === id
                )

                if (indexCross === -1) {
                    this.crossArray.push(crossButton)
                }
                checkButton.rectData = rectData
                crossButton.rectData = rectData

                // Add buttons to the canvas
                this.canvas.add(checkButton, crossButton)
            } else {
                rectData.x = polygon.left
                rectData.y = polygon.top
                rectData.width = polygon.width
                rectData.height = polygon.height
            }
            polygon.rectData = rectData
            this.canvas.add(polygon, textPolygon, centerPlus)
            // Add the circles to the canvas
            pointCircle.forEach((circle) => {
                circle.polygon = polygon
                this.canvas.add(circle)
                this.canvas.bringToFront(circle)
            })
            if (checkButton && crossButton) {
                this.canvas.bringToFront(checkButton)
                this.canvas.bringToFront(crossButton)
            }

            this.canvas.renderAll()
            //this.canvas.add(polygon)
        },
        drawTemporaryRect(list, id, cat) {
            const textAnnotation = `${cat} w: ${list[2]} h: ${list[3]}`

            const rect = new fabric.Rect({
                left: list[0] * this.scaleFactor,
                top: list[1] * this.scaleFactor,
                width: list[2] * this.scaleFactor,
                height: list[3] * this.scaleFactor,
                fill: 'transparent',
                stroke: this.generateColorFromWord(cat),
                strokeWidth: 2 / this.zoomScale,
                originX: 'left',
                originY: 'top',
                centeredRotation: false,
                lockScalingX: false,
                lockScalingY: false,
                lockRotation: false,
                hasControls: true,
                cornerSize: 16,
                hasBorders: true,
                padding: 0,
                lastLeft: list[0] * this.scaleFactor, // Add this
                lastTop: list[1] * this.scaleFactor, // And this
                lastScaleX: 1, // Assuming the initial scale is 1
                lastScaleY: 1, // Assuming the initial scale is 1
                noScaleCache: false,
                strokeUniform: true,
                selectable: true, //temporarily change it to move from centerPlus
            })

            rect.info = {
                annotationid: id,
                category: cat,
            }
            // rect.hasRotatingPoint = false
            rect.setControlsVisibility({
                mtr: false,
            })

            // Create a "+" text at the center of the rectangle
            const centerPlus = new fabric.Text('+', {
                left:
                    list[0] * this.scaleFactor +
                    (list[2] * this.scaleFactor) / 2,
                top:
                    list[1] * this.scaleFactor +
                    (list[3] * this.scaleFactor) / 2,
                fontSize: 40 / this.zoomScale,
                fill: this.generateColorFromWord(cat),
                selectable: false,
                evented: false,
                originX: 'center',
                originY: 'center',
            })
            const text = new fabric.Text(textAnnotation, {
                left: list[0] * this.scaleFactor,
                top: (list[1] - 25) * this.scaleFactor,
                fontSize: 20,
                fill: 'white',
                selectable: false,
                evented: false,
            })
            //console.log('drawing rect: ', rect, centerPlus, text)
            text.setControlsVisibility({
                mtr: false,
            })

            // Attach the "+" text to the rectangle
            rect.centerPlus = centerPlus
            rect.text = text
            centerPlus.rect = rect
            centerPlus.category = rect.info.category

            // Assign the annotation ID as the text ID and centerPlus ID
            text.id = id
            rect.id = id
            centerPlus.id = id

            const indexText = this.textArray.findIndex(
                (txt) => txt.id === text.id
            )

            if (indexText !== -1) {
                this.textArray[indexText].left = text.left
                this.textArray[indexText].top = text.top
            } else {
                this.textArray.push(text)
            }

            const indexCenter = this.textCenter.findIndex(
                (txt) => txt.id === centerPlus.id
            )
            if (indexCenter !== -1) {
                this.textCenter[indexCenter].left = centerPlus.left
                this.textCenter[indexCenter].top = centerPlus.top
            } else {
                this.textCenter.push(centerPlus)
            }
            //console.log('drawing : ', rect.id, centerPlus.id, text.id)
            this.canvas.add(rect, centerPlus, text)
            let checkButton, crossButton
            if (rect.top === 0) {
                // Create check-mark button
                checkButton = new CheckButton({
                    left: rect.left + rect.width - 32,
                    top: rect.top,
                    selectable: false,
                    hasBorders: false,
                    hasControls: false,
                    lockMovementX: true,
                    lockMovementY: true,
                })

                // Create cross button
                crossButton = new CrossButton({
                    left: rect.left + rect.width - 12,
                    top: rect.top,
                    selectable: false,
                    hasBorders: false,
                    hasControls: false,
                    lockMovementX: true,
                    lockMovementY: true,
                })
            } else {
                // Create check-mark button
                checkButton = new CheckButton({
                    left: rect.left + rect.width - 32,
                    top: rect.top - 20,
                    selectable: false,
                    hasBorders: false,
                    hasControls: false,
                    lockMovementX: true,
                    lockMovementY: true,
                })

                // Create cross button
                crossButton = new CrossButton({
                    left: rect.left + rect.width - 12,
                    top: rect.top - 20,
                    selectable: false,
                    hasBorders: false,
                    hasControls: false,
                    lockMovementX: true,
                    lockMovementY: true,
                })
            }
            // // Create check-mark button
            // const checkButton = new CheckButton({
            //     left: rect.left + rect.width - 12,
            //     top: rect.top - 20,
            // })

            // // Create cross button
            // const crossButton = new CrossButton({
            //     left: rect.left + rect.width + 10,
            //     top: rect.top - 20,
            // })
            checkButton.id = id
            crossButton.id = id
            checkButton.rect = rect
            crossButton.rect = rect
            rect.checkButton = checkButton
            rect.crossButton = crossButton

            const indexCheck = this.checkArray.findIndex(
                (check) => check.id === id
            )

            if (indexCheck === -1) {
                this.checkArray.push(checkButton)
            }
            const indexCross = this.crossArray.findIndex(
                (cross) => cross.id === id
            )

            if (indexCross === -1) {
                this.crossArray.push(crossButton)
            }

            // Add buttons to the canvas
            this.canvas.add(checkButton, crossButton)
            this.canvas.bringToFront(checkButton)
            this.canvas.bringToFront(crossButton)
            this.canvas.renderAll()
        },
        //load Image to canvas after clicking button
        loadImage(image) {
            return new Promise((resolve, reject) => {
                //clear the existed annotation
                this.canvas.clear()
                //reset position of canvas
                this.canvas.setViewportTransform([1, 0, 0, 1, 0, 0])
                const linkImage = `data:image/jpeg;base64,${image}`

                //const parentElement = this.$refs.parentCanvas

                // this.canvas.setWidth(parentElement.clientWidth)
                // this.canvas.setHeight(parentElement.clientHeight)
                // set the zoom level
                //console.log('check zoomScale load image: ', this.zoomScale)
                this.canvas.setZoom(this.zoomScale)
                if (this.savedViewportTransform) {
                    this.canvas.viewportTransform = this.savedViewportTransform
                }

                fabric.Image.fromURL(
                    linkImage,
                    (fabricImage) => {
                        this.image = fabricImage

                        fabricImage.scaleToWidth(this.canvas.width)

                        this.canvas.setBackgroundImage(
                            fabricImage,
                            this.canvas.renderAll.bind(this.canvas)
                        )

                        //scaling the size of rect to show on canvas
                        this.scaleFactor = this.canvas.width / fabricImage.width

                        const imageWidth =
                            fabricImage.width * fabricImage.scaleX
                        const imageHeight =
                            fabricImage.height * fabricImage.scaleY

                        //console.log('check load scaleFactor image: ', this.scaleFactor)
                        resolve() // Image has loaded, resolve the Promise

                        // Set the canvas height equal to the scaled image height
                        this.canvas.setHeight(imageHeight)
                    },
                    { crossOrigin: 'anonymous' }
                )
            })
        },
        drawAnnotations(annotations) {
            for (const key in annotations) {
                this.drawRectangleWithText(
                    annotations[key].x,
                    annotations[key].y,
                    annotations[key].width,
                    annotations[key].height,
                    this.scaleFactor,
                    annotations[key].annotationid,
                    annotations[key].category,
                    annotations[key].segmentation,
                    annotations[key].typ,
                    true
                )
            }

            this.canvas.renderAll()
        },
        handleKeyDown(event) {
            // Zoom with key works when the mouse is inside the image
            if (
                this.isPointerInsideImageZoom1(this.initPosition) &&
                this.initPosition
            ) {
                return
            }

            // Zoom in
            if (event.key === 'v') {
                this.zoomScale += 0.1
                if (this.zoomScale > 20) this.zoomScale = 20
                this.canvas.zoomToPoint(
                    { x: this.initPosition.x, y: this.initPosition.y },
                    this.zoomScale
                )
            } else if (event.key === 'c') {
                // Zoom out
                this.zoomScale -= 0.1
                if (this.zoomScale < 0.1) this.zoomScale = 0.1
                this.canvas.zoomToPoint(
                    { x: this.initPosition.x, y: this.initPosition.y },
                    this.zoomScale
                )
            } else if (event.key === 'Enter') {
                // Check if polygon drawing mode is active
                if (
                    this.polygonMode === SEGMENTATION ||
                    this.polygonMode === AUTOSEGMENT
                ) {
                    // Generate the polygon with the existing point array
                    //this.generatePolygon(this.pointArray)
                    const points = []

                    let cat =
                        this.$store.getters['editor/selectedCategory'] ||
                        this.$store.getters['project/getData'].categoriesjson
                            .categories[0]
                    // console.log(' activeShape: ', this.activeShape, this.activeShape.left)
                    this.pointArray.forEach((point) => {
                        //console.log('check point circle: ', point.id)
                        points.push({
                            x: point.left / this.scaleFactor,
                            y: point.top / this.scaleFactor,
                        })
                    })

                    if (this.selectedPolygonAddingPoint) {
                        if (
                            this.selectedPolygonAddingPoint.type === 'polygon'
                        ) {
                            this.$store.dispatch(
                                'editor/setEditorActionMessage',
                                'Finishing adding points to the existed polygon'
                            )
                            this.selectedPolygonAddingPoint.set(
                                'stroke',
                                this.generateColorFromWord(
                                    this.selectedPolygonAddingPoint.category
                                )
                            )
                            this.selectedPolygonAddingPoint.centerPlus.set(
                                'fill',
                                this.generateColorFromWord(
                                    this.selectedPolygonAddingPoint.category
                                )
                            )
                        }
                        // console.log(
                        //     'check selectedPolygonAddingPoint: ',
                        //     this.selectedPolygonAddingPoint,
                        //     this.selectedPolygonAddingPoint.stroke,
                        // )
                        this.selectedPolygonAddingPoint = null
                    }

                    //console.log('watch points: ', points)
                    const id = Date.now().toString()
                    // if (this.polygonMode === AUTOSEGMENT) {
                    //     //console.log('show information: ', this.activeShape.left)
                    //     this.$store.dispatch(
                    //         'editor/setEditorActionMessage',
                    //         'Sending request to the database',
                    //     )
                    //     const x = parseInt(this.activeShape.left / this.scaleFactor)
                    //     const y = parseInt(this.activeShape.top / this.scaleFactor)
                    //     const widthValue = parseInt(this.activeShape.width / this.scaleFactor)
                    //     const heightValue = parseInt(this.activeShape.height / this.scaleFactor)
                    //     const bbox = [x, y, widthValue, heightValue]
                    //     this.$store.dispatch('editor/calcSegmentation', {
                    //         image_path: this.$store.getters['project/getImage'].image_path,
                    //         bbox,
                    //     })
                    //     //this.activeShape = null
                    // }
                    if (this.polygonMode === SEGMENTATION) {
                        //const seg = this.segmentation
                        const polygon = new fabric.Polygon(points, {
                            stroke: this.generateColorFromWord(cat),
                            strokeWidth: 2,
                            fill: '#ffffff',
                            opacity: 0.5,
                            hasBorders: true,
                            hasControls: true,
                            strokeUniform: true,
                            selectable: true,
                            lockScalingX: false,
                            lockScalingY: false,
                        })
                        if (points.length > 0) {
                            const typ = 'default'
                            const annotation = {
                                annotationid: id,
                                category: cat,
                                height: polygon.height,
                                segmentation: points,
                                typ: typ,
                                width: polygon.width,
                                x: polygon.left,
                                y: polygon.top,
                            }

                            this.annotationList.push(annotation)
                            //console.log('this annotationList keyDown: ', this.annotationList)
                            // Update the annotation list to show on the right side of the browser
                            this.$store.dispatch(
                                'editor/updatedAnnotationList',
                                this.annotationList
                            )
                            //this.$store.dispatch('editor/updatedAnnotationStatus', 'drawing')
                            this.drawRectangleWithText(
                                polygon.left,
                                polygon.top,
                                polygon.width,
                                polygon.height,
                                this.scaleFactor,
                                id,
                                cat,
                                points,
                                typ,
                                true
                            )
                            this.$store.dispatch(
                                'editor/setEditorActionMessage',
                                'Creating a new polygon'
                            )

                            this.$store.dispatch('editor/updateAnnotation', {
                                projectId:
                                    this.$store.getters['project/getProjectId'],
                                image: this.image,
                                image_path:
                                    this.$store.getters['project/getImage']
                                        .image_path,
                                annotations: this.annotationList,
                            })
                        }
                    }
                    this.deletePolygon()
                    // this.activeShape = null
                    // this.pointArray = []
                }
            } else if (event.key === 'Escape') {
                //console.log('esc work')
                // Check if polygon drawing mode is active
                if (
                    this.polygonMode === SEGMENTATION ||
                    this.polygonMode === AUTOSEGMENT
                ) {
                    //console.log(' activeShape: ', this.activeShape, this.activeShape.left)

                    //this.canvas.add(text)
                    if (this.activeShape) {
                        const polygonIdToRemove = this.activeShape.id
                        this.canvas.forEachObject((object) => {
                            if (
                                object.id === polygonIdToRemove &&
                                object.type === 'polygon'
                            ) {
                                this.canvas.remove(object) // Remove the existing polygon by ID
                            }
                        })
                    }

                    //console.log('point Array before generating: ', this.pointArray)

                    this.pointArray.forEach((point) => {
                        //console.log('check point circle: ', point.id)

                        const circleIdToRemove = point.id
                        this.canvas.forEachObject((object) => {
                            if (
                                object.id === circleIdToRemove &&
                                object.type === 'circle'
                            ) {
                                this.canvas.remove(object) // Remove the existing circle by ID
                            }
                        })
                        //this.canvas.remove(point)
                    })

                    this.activeShape = null
                    this.removeTempCircle = null
                    this.selectedCircle = null
                    this.pointArray = []
                    this.selectedPolygonAddingPoint = null
                }
            } else if (event.key === 'Backspace') {
                //console.log('backspace work')

                if (this.selectedCircle) {
                    //console.log('check data circle: ', this.selectedCircle)
                    this.$store.dispatch(
                        'editor/setEditorActionMessage',
                        'Deleting the point from the existed polygon'
                    )
                    // Clicked on an existing circle when drawing
                    const circleArrayIndex = this.circleArray.findIndex(
                        (circle) => circle.id === this.selectedCircle.id
                    )
                    let points = []
                    let databasePoint = []

                    if (circleArrayIndex !== -1) {
                        // console.log(
                        //     'check the length init: ',
                        //     this.circleArray[circleArrayIndex].length,
                        // )
                        const selectedCircleIndex = this.circleArray[
                            circleArrayIndex
                        ].findIndex(
                            (circle) =>
                                circle.subId === this.selectedCircle.subId
                        )

                        if (selectedCircleIndex !== -1) {
                            // Check if selectedCircleIndex is valid
                            this.circleArray[circleArrayIndex].splice(
                                selectedCircleIndex,
                                1
                            )
                            //console.log('Element removed from circleArray')
                        }
                        // // Check if circleArrayIndex is valid
                        // this.circleArray[circleArrayIndex] = this.circleArray[
                        //     circleArrayIndex
                        // ].filter((circle) => circle.subId !== this.selectedCircle.subId)

                        //console.log('check the length: ', this.circleArray[circleArrayIndex].length)
                    }
                    const text = this.textArray.find(
                        (text) => text.id === this.selectedCircle.id
                    )

                    const textCenter = this.textCenter.find(
                        (txt) => txt.id === this.selectedCircle.id
                    )

                    this.circleArray[circleArrayIndex].forEach((pos) => {
                        points.push({
                            x: pos.left,
                            y: pos.top,
                        })
                        databasePoint.push({
                            x: pos.left / this.scaleFactor,
                            y: pos.top / this.scaleFactor,
                        })
                    })

                    //console.log('points length adding: ', points.length, databasePoint)

                    this.canvas.forEachObject((obj) => {
                        if (
                            obj.id === this.selectedCircle.id &&
                            obj.type === 'polygon'
                        ) {
                            this.canvas.remove(obj) // Remove the existing polygon by ID
                        }
                        if (
                            obj.id === this.selectedCircle.id &&
                            obj.type === 'circle'
                        ) {
                            this.canvas.remove(obj) // Remove the existing polygon by ID
                        }
                    })

                    const polygon = new fabric.Polygon(points, {
                        stroke: this.generateColorFromWord(
                            this.selectedCircle.category
                        ),
                        strokeWidth: 2,
                        fill: '#ffffff',
                        opacity: 0.5,
                        hasBorders: true,
                        hasControls: true,
                        strokeUniform: true,
                        selectable: true,
                        lockScalingX: false,
                        lockScalingY: false,
                    })

                    polygon.setControlsVisibility({
                        mtr: false,
                    })
                    polygon.id = this.selectedCircle.id
                    // Create a copy of the points array
                    const sortedPoints = points.slice()
                    sortedPoints.sort((a, b) => {
                        if (a.x !== b.x) {
                            return a.x - b.x // Sort by smallest left value first
                        } else {
                            return a.y - b.y // If left values are the same, sort by smallest top value
                        }
                    })
                    //console.log('seg drawn: ', seg)
                    //console.log('points drawn: ', points)
                    // Get the point with the smallest top and left values
                    const smallestPoint = sortedPoints[0]
                    if (text) {
                        text.set({
                            left: smallestPoint.x,
                            top: smallestPoint.y,
                        })

                        //text.set('stroke', 'white')
                    }
                    if (textCenter) {
                        textCenter.set({
                            left: polygon.left + polygon.width / 2,
                            top: polygon.top + polygon.height / 2,
                        })
                    }
                    polygon.textPolygon = text
                    polygon.centerPlus = textCenter
                    polygon.smallestPoint = smallestPoint
                    polygon.category = this.selectedCircle.category

                    if (circleArrayIndex !== -1) {
                        this.circleArray[circleArrayIndex].forEach((pos) => {
                            this.canvas.remove(pos)
                            pos.polygon = polygon
                            this.canvas.add(pos)
                        })
                        const index = this.annotationList.findIndex(
                            (anno) =>
                                anno.annotationid === this.selectedCircle.id
                        )
                        this.annotationList[index].segmentation = databasePoint
                        //this.$store.dispatch('editor/updatedAnnotationList', this.annotationList)
                        //this.$store.dispatch('editor/updatedAnnotationStatus', 'drawing')

                        this.$store.dispatch(
                            'editor/setEditorActionMessage',
                            'Deleting a point from the polygon'
                        )

                        // this.$store.dispatch('editor/updateAnnotation', {
                        //     projectId: this.$store.getters['project/getProjectId'],
                        //     image: this.image,
                        //     image_path: this.$store.getters['project/getImage'].image_path,
                        //     annotations: this.annotationList,
                        // })
                        this.updateAnnotationList(false)
                    }
                    // this.circleArray[circleArrayIndex].forEach((pos) => {
                    //     pos.polygon = polygon
                    //     this.canvas.add(pos)
                    //     this.canvas.bringToFront(pos)
                    // })

                    this.canvas.add(polygon)
                    this.canvas.sendToBack(polygon)
                    this.selectedCircle = null
                    this.canvas.renderAll()
                }
                // Get the active object
                const activeObject = this.canvas.getActiveObject()
                console.log('check active object: ', activeObject)

                // Check if an object is active
                if (activeObject) {
                    // Delete the active object
                    //console.log('Active Object:', activeObject.id)
                    if (
                        activeObject.type === 'rect' ||
                        activeObject.type === 'polygon'
                    ) {
                        // const confirmMessage = {
                        //     showModal: true,
                        //     state: null,
                        //     message: 'Are you sure you want to delete this annotation?',
                        //     title: 'Annotation warning',
                        //     action: 'deleteAnnotation',
                        // }
                        // this.updatedInfo = activeObject.id
                        // this.$store.dispatch('notification/loadedConfirmMessage', confirmMessage)
                        this.deleteExistedObjectFromCanvas(activeObject.id)
                    }
                } else {
                    // No object is currently active
                    //console.log('No Active Object')
                }
            }
            if (this.canvas) {
                this.savedViewportTransform = this.canvas.viewportTransform
            }
        },

        logParentClientWidth() {
            //Responsive the canvas
            const parentElement = this.$refs.parentCanvas

            this.textArray = []
            this.textCenter = []
            this.segmentation = []
            this.pointArray = []
            this.lineArray = []
            this.activeLine = null
            this.activeShape = null
            this.temporaryCircle = []
            this.removeTempCircle = null
            //this.polygonMode = RECTANGLE
            this.selectedCircle = null
            //this.$store.dispatch('editor/setSegmentationMode', this.polygonMode)
            //this.$store.dispatch('editor/setAutoMode', false)
            // this.$store.dispatch(
            //     'editor/setEditorActionMessage',
            //     'Allows the user to draw, drag, and rescale objects.',
            // )

            this.circleArray = []

            if (parentElement) {
                // Calculate the new dimensions
                const newWidth = parentElement.clientWidth

                //scaling the size of rect to show on canvas
                if (this.image) {
                    this.scaleFactor = newWidth / this.image.width
                }

                // Resize the canvas
                this.canvas.setDimensions({
                    width: newWidth,
                    // Keep the aspect ratio consistent if needed
                    height: newWidth * (this.canvas.height / this.canvas.width),
                })
                this.loadImage(this.imageUrl)
                    .then(() => {
                        this.$store.dispatch(
                            'editor/setSegmentationMode',
                            this.polygonMode
                        )
                        this.drawAnnotations(this.annotationList)
                        //this.circleArray = []
                    })
                    .catch((error) => {
                        console.error('Error loading image:', error)
                    })
            }
        },
        updateCanvasVersion(selectedId) {
            // Iterate over the canvas objects
            this.canvas.forEachObject((object) => {
                if (object.type === 'rect') {
                    // Reset the stroke color of the rectangle to its default value
                    object.set(
                        'stroke',
                        this.generateColorFromWord(object.info.category)
                    )
                    // Set strokeUniform to true
                    object.set('strokeUniform', true)
                    object.centerPlus.set(
                        'fill',
                        this.generateColorFromWord(object.info.category)
                    )
                }
                // if (object.isType('text') && object.fill !== 'white') {
                //     object.set('fill', this.generateColorFromWord(object.category))
                // }

                if (object.type === 'rect' && object.id === selectedId) {
                    // Set the selected rectangle as active
                    this.canvas.setActiveObject(object)
                    object.set('stroke', 'yellow')
                    // Set strokeUniform to true
                    object.set('strokeUniform', true)
                    // Store the default stroke color of the rectangle
                    //object.defaultStroke = 'yellow'
                    object.centerPlus.set('fill', 'yellow')
                }
                // if (object.isType('text') && object.id === selectedId && object.fill !== 'white') {
                //     object.set('fill', 'yellow')
                // }
            })

            // Render the canvas to apply the changes
            this.canvas.renderAll()
        },

        updateCanvas(selectedId) {
            const objectsToModify = this.canvas
                .getObjects()
                .filter(
                    (object) =>
                        object.type === 'rect' || object.type === 'polygon'
                )

            // const objectsToModify = this.canvas
            //     .getObjects()
            //     .filter((object) => object.type !== 'circle')

            //console.log('updated all objects right hand: ', objectsToModify)

            objectsToModify.forEach((object) => {
                //console.log('updated object right hand id: ', object.type)
                if (object.type === 'rect') {
                    //console.log('rect works: ', object)
                    if (object.info && object.info.category) {
                        // Reset the stroke color of the rectangle to its default value
                        object.set(
                            'stroke',
                            this.generateColorFromWord(object.info.category)
                        )
                        // Set strokeUniform to true
                        object.set('strokeUniform', true)
                        object.centerPlus.set(
                            'fill',
                            this.generateColorFromWord(object.info.category)
                        )
                        // Rest of the code
                    }

                    if (object.type === 'rect' && object.id === selectedId) {
                        //console.log('rect works id: ', object)
                        // Set the selected rectangle as active
                        //this.canvas.setActiveObject(object);
                        object.set('stroke', 'yellow')
                        // Set strokeUniform to true
                        object.set('strokeUniform', true)
                        // Store the default stroke color of the rectangle
                        object.centerPlus.set('fill', 'yellow')
                    }
                }
                if (object.type === 'polygon') {
                    // Reset the stroke color of the rectangle to its default value

                    if (object.textPolygon) {
                        object.set(
                            'stroke',
                            this.generateColorFromWord(object.category)
                        )
                        object.textPolygon.set(
                            'fill',
                            this.generateColorFromWord(object.category)
                        )
                    }
                    if (object.centerPlus) {
                        object.centerPlus.set(
                            'fill',
                            this.generateColorFromWord(object.category)
                        )
                    }

                    //object.set('fill', '#ffffff');
                    // Set strokeUniform to true
                    //object.set('strokeUniform', true);

                    if (object.type === 'polygon' && object.id === selectedId) {
                        // Set the selected rectangle as active
                        //this.canvas.setActiveObject(object);
                        object.set('stroke', 'yellow')
                        //object.textPolygon.set('fill', 'white')
                        if (object.textPolygon) {
                            object.textPolygon.set(
                                'fill',
                                this.generateColorFromWord(object.category)
                            )
                        }
                        if (object.centerPlus) {
                            object.centerPlus.set('fill', 'yellow')
                        }

                        //object.set('fill', 'yellow');
                        // Set strokeUniform to true
                        //object.set('strokeUniform', true);
                    }
                }
                // if (object.type === 'circle') {
                //     return
                // }
            })

            // Render the canvas to apply the changes
            this.canvas.renderAll()
        },
        loadGrid(gridData) {
            const parentElement = this.$refs.parentCanvas

            this.canvas.setWidth(parentElement.clientWidth)
            this.canvas.setHeight(parentElement.clientHeight)
            let gridSize = 50

            // Draw the vertical grid lines
            for (var i = 0; i < canvas.width / gridSize; i++) {
                this.canvas.add(
                    new fabric.Line(
                        [i * gridSize, 0, i * gridSize, this.canvas.height],
                        {
                            stroke: '#ccc',
                            selectable: false,
                        }
                    )
                )
            }

            // // Draw the horizontal grid lines
            // for (var i = 0; i < this.canvas.height / gridSize; i++) {
            //     this.canvas.add(
            //         new fabric.Line([0, i * gridSize, this.canvas.width, i * gridSize], {
            //             stroke: '#ccc',
            //             selectable: false,
            //         }),
            //     )
            // }

            gridData.result.forEach((base64, index) => {
                const linkImage = `data:image/jpeg;base64,${base64}`
                fabric.Image.fromURL(linkImage, (img) => {
                    img.scaleToWidth(gridSize)
                    //img.scaleToHeight(gridSize)
                    img.set({ left: index * gridSize, top: 0 })
                    this.canvas.add(img)
                })
            })

            this.canvas.renderAll()
        },
        deletePolygon() {
            if (this.activeShape) {
                const polygonIdToRemove = this.activeShape.id
                this.canvas.forEachObject((object) => {
                    if (
                        object.id === polygonIdToRemove &&
                        object.type === 'polygon'
                    ) {
                        this.canvas.remove(object) // Remove the existing polygon by ID
                    }
                })
            }
            if (this.pointArray) {
                this.pointArray.forEach((point) => {
                    //console.log('check point circle: ', point.id)

                    const circleIdToRemove = point.id
                    this.canvas.forEachObject((object) => {
                        if (
                            object.id === circleIdToRemove &&
                            object.type === 'circle'
                        ) {
                            this.canvas.remove(object) // Remove the existing polygon by ID
                        }
                    })
                    //this.canvas.remove(point)
                })
            }
            this.pointArray = []
            this.activeShape = null
            this.removeTempCircle = null
            this.selectedCircle = null
            this.selectedPolygonAddingPoint = null
        },
    },
    computed: {
        dataProject() {
            return this.$store.getters['project/getData']
        },
        getImage() {
            return this.$store.getters['project/getImage']
        },
        selectedCategory() {
            return this.$store.getters['editor/selectedCategory']
        },
        getAnnotation() {
            return this.$store.getters['editor/getAnnotation']
        },
        getAnnotationId() {
            return this.$store.getters['editor/selectedAnnotationId']
        },
        getCategory() {
            return this.$store.getters['editor/selectedCategory']
        },
        deleteAnnotation() {
            return this.$store.getters['editor/deleteAnnotationId']
        },
        getUpdateAnnotation() {
            return this.$store.getters['editor/getUpdateAnnotation']
        },
        getAnnotationStatus() {
            return this.$store.getters['editor/getAnnotationStatus']
        },
        getZoomData() {
            return this.$store.getters['editor/getZoomData']
        },

        getDataState() {
            return this.$store.getters['editor/getDataState']
        },
        getSegmentationMode() {
            return this.$store.getters['editor/getSegmentationMode']
        },
        getAutoSegmentationData() {
            return this.$store.getters['editor/getAutoSegmentationData']
        },
        getConfirmMessage() {
            return this.$store.getters['notification/getConfirmMessage']
        },
    },
    watch: {
        //watch the change of value

        getImage(newVal, oldVal) {
            //test run grid
            //console.log('check the zoom scale init: ', this.zoomScale)
            //const parentElement = this.$refs.parentCanvas

            // this.canvas.setWidth(this.canvas.width * this.zoomScale)
            // this.canvas.setHeight(this.canvas.height * this.zoomScale)
            this.canvas.clear()
            this.segmentation = []
            this.pointArray = []
            this.lineArray = []
            this.activeLine = null
            this.activeShape = null
            this.selectedCircle = null
            this.temporaryCircle = []
            this.removeTempCircle = null
            this.drawingRect = null
            //this.polygonMode = RECTANGLE
            this.$store.dispatch('editor/setSegmentationMode', this.polygonMode)
            this.annotationList = []
            //this.$store.dispatch('editor/setSegmentationMode', 'rectangle')
            //this.$store.dispatch('editor/setAutoMode', false)
            // this.$store.dispatch(
            //     'editor/setEditorActionMessage',
            //     'Allows the user to draw, drag, and rescale objects.',
            // )
            //console.log('segmentations: ', this.segmentation)
            this.$store.dispatch('editor/loadAnnotation', {
                dataProject: this.$store.getters['project/getData'],
                getImage: this.$store.getters['project/getImage'],
            })

            //console.log('new val image canvas tool: ', newVal)

            if (newVal) {
                //console.log('canvas tool load image: ', newVal.result)
                this.imageUrl = newVal.result
                this.loadImage(newVal.result)
                this.annotationLoad = true
            } else {
                this.annotationList = []
                this.annotationLoad = false
            }
        },

        getAnnotation(annotations) {
            //console.log('annotation canvas tool: ', annotations)
            this.imagePath = this.$store.getters['project/getImage'].image_path
            this.nearestObject = null
            // &&
            //     this.removeAllAnnotations.length === 0
            if (annotations && annotations.length > 0 && this.annotationLoad) {
                //console.log('drawing work')
                //console.log('check annotations: ', annotations)

                // Get all objects on the canvas
                const objects = this.canvas.getObjects()

                // Filter and remove rectangles
                objects.forEach((obj) => {
                    this.canvas.remove(obj)
                })
                this.annotationList = annotations
                this.textArray = []
                this.textCenter = []

                this.$store.dispatch(
                    'editor/updatedAnnotationList',
                    this.annotationList
                )
                this.drawAnnotations(annotations)
            }
        },
        getAnnotationId(id) {
            this.updateCanvas(id)
        },
        deleteAnnotation(id) {
            this.updateCanvas(id)
            this.annotationList = this.annotationList.filter(
                (anno) => anno.annotationid !== id
            )

            this.removeAllAnnotations = this.removeAllAnnotations.filter(
                (anno) => anno.id !== id
            )
            //console.log('check removed list: ', this.removeAllAnnotations)
            // Dispatch the updateAnnotation action
            this.canvas.getObjects().forEach((obj) => {
                if (obj.id === id) {
                    // if (obj.type === 'polygon') {
                    //     console.log('object removed: ', obj)
                    // }

                    this.canvas.remove(obj)
                }
            })
            this.$store.dispatch('editor/updatedAnnotationStatus', 'delete')
            this.$store
                .dispatch('editor/updateAnnotation', {
                    projectId: this.$store.getters['project/getProjectId'],
                    image: this.image,
                    image_path:
                        this.$store.getters['project/getImage'].image_path,
                    annotations: this.annotationList,
                })
                .then(() => {
                    // Whatever you want to do after the dispatch completes
                    //console.log('Dispatch completed')
                    this.$store.dispatch(
                        'notification/loadedMessageNotification',
                        {
                            state: 1,
                            message: 'Delete the annotation successfully',
                            notiId: Date.now(),
                        }
                    )
                })
                .catch((error) => {
                    // Handle the error here
                    //console.error('An error occurred:', error)
                    this.$store.dispatch(
                        'notification/loadedMessageNotification',
                        {
                            state: 2,
                            message:
                                'An error occurred when deleting the annotation',
                            notiId: Date.now(),
                        }
                    )
                })

            if (this.annotationList.length === 0) {
                // Hide all other objects on the canvas
                this.canvas.getObjects().forEach((obj) => {
                    this.canvas.remove(obj)
                })
            }
        },
        getUpdateAnnotation(val) {
            if (val) {
                this.annotationList = val
            }
        },
        getAnnotationStatus(val) {
            //const status = this.$store.getters['editor/getAnnotationStatus']
            //console.log('check hidestatus: ', val)
            if (val === true) {
                //this.isDrawing = false
                //this.unlockCanvas = false
                //Remove all objects on canvas
                const removedObjects = this.canvas
                    .getObjects()
                    .map((obj) => obj)
                this.canvas.remove(...removedObjects)
                this.removeAllAnnotations.push(...removedObjects)
                this.canvas.getObjects().forEach((obj) => {
                    obj.set('opacity', 0)
                })
                this.canvas.selection = true
            }
            if (val === false) {
                //this.unlockCanvas = true
                //console.log('check remove list update status: ', this.removeAllAnnotations)
                while (this.removeAllAnnotations.length > 0) {
                    const obj = this.removeAllAnnotations.shift() // Removes the first element from storeObject and returns it
                    //console.log('check obj: ', obj)
                    this.canvas.add(obj)
                }

                this.canvas.selection = true
            }
        },
        getZoomData(val) {
            //console.log('check val zoomData: ', val)
            this.zoomScale = val.zoomScale
            this.savedViewportTransform = val.savedViewportTransform
        },
        nearestObject(val, old) {
            // console.log('check val changed: ', val, old)
            // console.log('Nearest Object:', val)
            // if (val && val.info) {
            //     val.set('stroke', this.generateColorFromWord(val.info.category))
            //     val.centerPlus.set('fill', this.generateColorFromWord(val.info.category))
            // }

            if (old) {
                // console.log('check old: ', old)
                // console.log('check info type: ', old.info.category)
                if (old.info) {
                    old.set(
                        'stroke',
                        this.generateColorFromWord(old.info.category)
                    )
                    if (old.centerPlus) {
                        old.centerPlus.set(
                            'fill',
                            this.generateColorFromWord(old.info.category)
                        )
                    }
                }
                if (old.category) {
                    old.set('stroke', this.generateColorFromWord(old.category))
                    if (old.centerPlus) {
                        old.centerPlus.set(
                            'fill',
                            this.generateColorFromWord(old.category)
                        )
                    }
                }

                // Render the canvas to apply the changes
                this.canvas.renderAll()
            }
            // Render the canvas to apply the changes
            //this.canvas.renderAll()
        },
        getDataState(val) {
            if (val > 0) {
                //console.log('new data state canvas: ', val)
                //console.log('data annotation: ', this.annotationList)
            }
        },
        getSegmentationMode(val) {
            console.log('canvas tool: ', val)
            if (val === 'rectangle') {
                this.polygonMode = RECTANGLE
                this.deletePolygon()
                this.selectedPolygonAddingPoint = null
                // this.canvas.getObjects().forEach((object) => {
                //     if (object.type === 'polygon' || object.type === 'rect') {
                //         object.set({
                //             selectable: true,
                //             evented: true,
                //         })
                //     } else {
                //         object.set({
                //             selectable: false,
                //             evented: false,
                //         })
                //     }
                // })
            } else if (val === 'segmentation') {
                this.polygonMode = SEGMENTATION
                this.deletePolygon()
                this.selectedPolygonAddingPoint = null
                // this.canvas.getObjects().forEach((object) => {
                //     if (object.type !== 'text') {
                //         object.set({
                //             selectable: true,
                //             evented: true,
                //         })
                //     }
                // })
            } else if (val === 'auto-segment') {
                this.polygonMode = AUTOSEGMENT
                this.deletePolygon()
                this.selectedPolygonAddingPoint = null
                // this.canvas.getObjects().forEach((object) => {
                //     if (object.type !== 'text') {
                //         object.set({
                //             selectable: true,
                //             evented: true,
                //         })
                //     }
                // })
            } else if (val === 'auto-rectangle') {
                this.polygonMode = AUTORECTANGLE
                this.deletePolygon()
                this.selectedPolygonAddingPoint = null
                // this.canvas.getObjects().forEach((object) => {
                //     if (object.type === 'polygon' || object.type === 'rect') {
                //         object.set({
                //             selectable: true,
                //             evented: true,
                //         })
                //     } else {
                //         object.set({
                //             selectable: false,
                //             evented: false,
                //         })
                //     }
                // })
                // this.canvas.getObjects().forEach((object) => {
                //     if (object.type !== 'text') {
                //         object.set({
                //             selectable: true,
                //             evented: true,
                //         })
                //     }
                // })
            }
            // if (val === 'segmentation') {
            //     this.polygonMode = true
            // }
        },
        getAutoSegmentationData(val) {
            if (val) {
                //console.log('check autosegment data: ', val)
                let cat =
                    this.$store.getters['editor/selectedCategory'] ||
                    this.$store.getters['project/getData'].categoriesjson
                        .categories[0]
                if (this.polygonMode === AUTORECTANGLE) {
                    const bboxes = Array.from(val.bboxes)
                    this.$store.dispatch(
                        'editor/setEditorActionMessage',
                        `Number of the received segmentation: ${bboxes.length}`
                    )
                    for (let i = 0; i < bboxes.length; i++) {
                        const bbox = bboxes[i]

                        const id = Date.now().toString() + i
                        //console.log('seg ment: ', seg)
                        if (bbox.length > 0) {
                            this.drawTemporaryRect(bbox, id, cat)
                        }
                    }
                    this.removeAllCircles()
                }
                if (this.polygonMode === AUTOSEGMENT) {
                    const segmentations = Array.from(val.segmentations)
                    const bboxes = Array.from(val.bboxes)
                    //console.log('get data: ', segmentations)
                    this.$store.dispatch(
                        'editor/setEditorActionMessage',
                        `Number of the received segmentation: ${segmentations.length}`
                    )
                    for (let i = 0; i < segmentations.length; i++) {
                        const seg = segmentations[i]
                        const bbox = bboxes[i]
                        const id = Date.now().toString() + i
                        //console.log('seg ment: ', seg)
                        if (seg.length > 0) {
                            this.drawSegmentation(seg, id, cat, true, bbox)
                        }
                    }
                    this.removeAllCircles()
                }
            }
        },
        polygonMode(val) {
            console.log('checked val polygon mode: ', val)
            // if (val === RECTANGLE || val === AUTORECTANGLE) {
            //     this.canvas.getObjects().forEach((object) => {
            //         if (object.type === 'polygon' || object.type === 'rect') {
            //             object.set({
            //                 selectable: true,
            //                 evented: true,
            //             })
            //         } else {
            //             object.set({
            //                 selectable: false,
            //                 evented: false,
            //             })
            //         }
            //     })
            // }
            this.$store.dispatch('editor/setSegmentationMode', val)
        },
        getConfirmMessage(val) {
            if (val) {
                if (!val.showModal) {
                    if (
                        val.action === 'deleteAnnotation' &&
                        this.updatedInfo &&
                        val.state
                    ) {
                        const existedAnno = this.annotationList.find(
                            (anno) => anno.annotationid !== this.updatedInfo
                        )
                        if (existedAnno) {
                            this.annotationList = this.annotationList.filter(
                                (anno) => anno.annotationid !== this.updatedInfo
                            )
                            this.$store.dispatch(
                                'editor/updatedAnnotationList',
                                this.annotationList
                            )
                            this.$store.dispatch(
                                'editor/deleteAnnotation',
                                this.updatedInfo
                            )
                            this.selectedPolygonAddingPoint = null
                        } else {
                            this.canvas.getObjects().forEach((obj) => {
                                if (obj.id === this.updatedInfo) {
                                    // if (obj.type === 'polygon') {
                                    //     console.log('object removed: ', obj)
                                    // }

                                    this.canvas.remove(obj)
                                }
                            })
                            this.selectedPolygonAddingPoint = null
                        }

                        this.$store.dispatch(
                            'editor/updatedAnnotationStatus',
                            'delete'
                        )
                    }
                    this.updatedInfo = null
                }
            }
        },
    },
    beforeDestroy() {
        window.removeEventListener(
            'resize',
            this.logParentClientWidth.bind(this)
        )
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    },
    updated() {},
}
</script>

<style scoped></style>

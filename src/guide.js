import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import cookie from 'js-cookie'

const steps = [
    {
        element: '#hamburger-container',
        popover: {
            title: 'Hamburger',
            description: 'Open && Close sidebar',
            position: 'bottom'
        }
    },
    {
        element: '#breadcrumb-container',
        popover: {
            title: 'Breadcrumb',
            description: 'Indicate the current page location',
            position: 'bottom'
        }
    },
    {
        element: '#header-search',
        popover: {
            title: 'Page Search',
            description: 'Page search, quick navigation',
            position: 'left'
        }
    },
    {
        element: '#screenfull',
        popover: {
            title: 'Screenfull',
            description: 'Set the page into fullscreen',
            position: 'left'
        }
    },
    {
        element: '#size-select',
        popover: {
            title: 'Switch Size',
            description: 'Switch the system size',
            position: 'left'
        }
    },
    {
        element: '#tags-view-container',
        popover: {
            title: 'Tags view',
            description: 'The history of the page you visited',
            position: 'bottom'
        },
        padding: 0
    }
]
const GUIDE_TAG = 'guide-tag'
let driver = new Driver({
    doneBtnText: '结束', // Text on the final button
    closeBtnText: '忽略', // Text on the close button for this step
    nextBtnText: '下一个', // Next button text for this step
    prevBtnText: '上一个',
    onReset(Element) {
        cookie.set(GUIDE_TAG, '1')
    }
})

export default {
    start() {
        if ('1' !== cookie.get(GUIDE_TAG)) {
            driver.defineSteps(steps)
            driver.start()
        }
    }
}



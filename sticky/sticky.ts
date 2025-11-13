/*

<div class="container">
    <div class="column STICKY_COLUMN _TOP" bind:this={Sticky.column}>
        <div class="sidebar STICKY_SIDEBAR" bind:this={Sticky.sidebar}>
            <div use:Sticky.sentinelTop></div>

            <div use:Sticky.sentinelBottom></div>
        </div>
    </div>
    <div class="content">

    </div>
</div>

<style>
    .STICKY_COLUMN {
        --sticky-sidebar-top:calc(var(--header-height) + 66px);
        --sticky-sidebar-bottom:0;
    }
</style>

*/

import {tick} from 'svelte';

export const Sticky = new function() {

    this.column;
    this.sidebar;

    let lastScrollY;

    const getThreshold = (propertyValue) => {
        const thresholdVar = window.getComputedStyle(this.sidebar).getPropertyValue(propertyValue);
        const thresholdCleaned = thresholdVar.replaceAll('calc(', '').replaceAll(')', '').replaceAll('px', '');
        const thresholdComputed = eval(thresholdCleaned);
        const threshold = Number(String(thresholdComputed))
        return threshold;
    }

    this.sentinelTop = async function(el) {

        await tick();
        lastScrollY = window.scrollY;
        const threshold = getThreshold('--sticky-sidebar-top')

        const listenReverseTop = (e) => {
            console.log(lastScrollY, window.scrollY)
            const isScrollingDown = lastScrollY < window.scrollY;
            if (isScrollingDown) {
                this.sidebar.style.top = this.sidebar.offsetTop + 'px';
                this.column.classList.remove('_TOP')
            }
            lastScrollY = window.scrollY;
        }

        let observer = new IntersectionObserver(async entries => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                this.column.classList.add('_TOP');
                window.addEventListener('scroll', listenReverseTop);
            } else {
                this.column.classList.remove('_TOP');
                window.removeEventListener('scroll', listenReverseTop);
            }
        }, { threshold: 0, rootMargin: `0px 0px ${threshold}px 0px`, });

        observer.observe(el);

        return {
            destroy() {
                observer.disconnect();
                window.removeEventListener('scroll', listenReverseTop);
            }
        };
    }

    this.sentinelBottom = async function(el) {

        await tick();
        lastScrollY = window.scrollY;
        const threshold = getThreshold('--sticky-sidebar-bottom')

        const listenReverseBottom = (e) => {
            const isScrollingUp = lastScrollY > window.scrollY;
            lastScrollY = window.scrollY;

            if (isScrollingUp) {
                this.sidebar.style.top = this.sidebar.offsetTop + 'px';
                this.column.classList.remove('_BOTTOM')
            }
        }

        let observer = new IntersectionObserver(async entries => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                this.column.classList.add('_BOTTOM')
                window.addEventListener('scroll', listenReverseBottom);
            } else {
                this.column.classList.remove('_BOTTOM')
                window.removeEventListener('scroll', listenReverseBottom);
            }
        }, { threshold: 0, rootMargin: `0px 0px ${threshold}px 0px`, });

        observer.observe(el);

        return {
            destroy() {
                observer.disconnect();
                window.removeEventListener('scroll', listenReverseBottom);
            }
        };
    }
}
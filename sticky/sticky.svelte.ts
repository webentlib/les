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

    let sentinelTopIntersecting;
    let sentinelBottomIntersecting;

    let enabled = true;
    let threshold = 0;

    const getThreshold = (propertyValue) => {
        const thresholdVar = window.getComputedStyle(this.sidebar).getPropertyValue(propertyValue);
        const thresholdCleaned = thresholdVar.replaceAll('calc(', '').replaceAll(')', '').replaceAll('px', '');
        const thresholdComputed = eval(thresholdCleaned);
        const threshold = Number(String(thresholdComputed))
        return threshold;
    }

    const reobserve = () => {
        enabled = threshold + this.sidebar.offsetHeight > window.innerHeight;
        if (!enabled) {
            this.column.classList.add('_TOP');
            this.column.classList.remove('_BOTTOM');
        }
    }

    this.sentinelTop = async function(el) {

        await tick();
        lastScrollY = window.scrollY;
        threshold = getThreshold('--sticky-sidebar-top')

        reobserve();
        window.addEventListener('resize', reobserve);

        const listenReverseTop = (e) => {
            const isScrollingDown = lastScrollY < window.scrollY;

            if (isScrollingDown) {
                if (!sentinelBottomIntersecting) {
                    this.sidebar.style.top = this.sidebar.offsetTop + 'px';
                    this.column.classList.remove('_TOP');
                }
            } else {
                // Есть кейс, когда стрелочка скролит наверх,
                // при этом руками крутим вниз,
                // поэтому, даже в штатном случае —
                // перепроставляем соответствующие классы
                this.column.classList.add('_TOP');
                this.column.classList.remove('_BOTTOM');
            }

            lastScrollY = window.scrollY;
        }

        let observer = new IntersectionObserver(async entries => {
            if (!enabled) return;
            const entry = entries[0];
            sentinelTopIntersecting = entry.isIntersecting;
            if (entry.isIntersecting) {
                this.column.classList.add('_TOP');
                window.addEventListener('scroll', listenReverseTop);
                window.addEventListener('resize', listenReverseTop);
            } else {
                this.column.classList.remove('_TOP');
                window.removeEventListener('scroll', listenReverseTop);
                window.removeEventListener('resize', listenReverseTop);
            }
        }, { threshold: 0, rootMargin: `0px 0px ${threshold}px 0px`, });

        observer.observe(el);

        return {
            destroy() {
                observer.disconnect();
                window.removeEventListener('scroll', listenReverseTop);
                window.removeEventListener('resize', listenReverseTop);
                window.removeEventListener('resize', reobserve);
            }
        };
    }

    this.sentinelMiddle = async function(el) {

        await tick();
        lastScrollY = window.scrollY;
        threshold = getThreshold('--sticky-sidebar-top')
        const thresholdBottom = getThreshold('--sticky-sidebar-bottom')

        reobserve();
        window.addEventListener('resize', reobserve);

        let observer = new IntersectionObserver(async entries => {
            const entry = entries[0];
            sentinelBottomIntersecting = entry.isIntersecting;
            if (entry.isIntersecting) {
                // ...
            } else {
                // console.log('NOT INTERSECTING')
                this.column.classList.remove('_BOTTOM')
                this.column.classList.add('_TOP')
            }
        }, { threshold: 0, rootMargin: `${thresholdBottom}px 0px ${threshold}px 0px`, });

        observer.observe(el);

        return {
            destroy() {
                observer.disconnect();
            }
        };
    }

    this.sentinelBottom = async function(el) {

        await tick();
        lastScrollY = window.scrollY;
        const thresholdBottom = getThreshold('--sticky-sidebar-bottom')

        reobserve();
        window.addEventListener('resize', reobserve);

        const listenReverseBottom = (e) => {
            const isScrollingUp = lastScrollY > window.scrollY;

            if (isScrollingUp) {
                this.sidebar.style.top = this.sidebar.offsetTop + 'px';
                this.column.classList.remove('_BOTTOM')
            } else {
                this.column.classList.remove('_TOP');
                this.column.classList.add('_BOTTOM');
            }

            lastScrollY = window.scrollY;
        }

        let observer = new IntersectionObserver(async entries => {
            if (!enabled) return;
            const entry = entries[0];
            sentinelBottomIntersecting = entry.isIntersecting;
            if (entry.isIntersecting) {
                if (!sentinelTopIntersecting) {
                    this.column.classList.add('_BOTTOM')
                    window.addEventListener('scroll', listenReverseBottom);
                    window.addEventListener('resize', listenReverseBottom);
                }
            } else {
                this.column.classList.remove('_BOTTOM')
                window.removeEventListener('scroll', listenReverseBottom);
                window.removeEventListener('resize', listenReverseBottom);
            }
        }, { threshold: 0, rootMargin: `0px 0px ${thresholdBottom}px 0px`, });

        observer.observe(el);

        return {
            destroy() {
                observer.disconnect();
                window.removeEventListener('scroll', listenReverseBottom);
                window.removeEventListener('resize', listenReverseBottom);
                window.removeEventListener('resize', reobserve);
            }
        };
    }
}
import Link from "next/link"
import styles from "./page.module.css"
import Nav from "./projectComponents/nav/Nav"
import React from "react"
import SlideShow from "./projectComponents/slideshow/SlideShow"
import Image from "next/image"
import Gallery from "./projectComponents/gallery/Gallery"
import Services from "./projectComponents/services/Services"
import Footer from "./projectComponents/footer/Footer"
import AnimateElements from "./projectComponents/animateElements/AnimateElements"

export default function Page() {

    return (
        <main className={`${styles.main}`}>
            <Nav />

            <div className={styles.heroCont}>
                <div className={styles.slideShowCont}>
                    <SlideShow />
                </div>

                <div className={styles.socialsCont}>
                    {[
                        {
                            name: "facebook",
                            link: ""
                        },
                        {
                            name: "twitter",
                            link: ""
                        },
                        {
                            name: "instagram",
                            link: ""
                        },
                    ].map((each, eachIndex) => {
                        return (
                            <React.Fragment key={eachIndex}>
                                <Link className={styles.socials} href={each.link}>{each.name}</Link>

                                {eachIndex !== 2 && <div style={{ height: "2px", width: "4px", borderTop: "1px solid var(--color1)" }}></div>}

                                {eachIndex === 2 && <div style={{ height: "2px", width: "25px", borderTop: "1px solid var(--color1)" }}></div>}
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>

            <section>
                <AnimateElements animationOption="slideUp" delay={200}>
                    <h2>About Us</h2>
                    <h1>Luminous Lens</h1>

                    <div style={{ display: "flex", flexDirection: "row-reverse", justifyContent: "center", flexWrap: "wrap", columnGap: "1rem", rowGap: "3rem", maxWidth: "800px", margin: "2rem auto 0rem auto" }}>
                        <div style={{ flex: '0 1 300px', display: "grid", justifyItems: "center" }}>
                            <div className={styles.backdrop} style={{ width: "fit-content", height: "fit-content" }}>
                                <Image alt="about us image" src={require(`@/public/projects/luminousLens/about.jpg`).default.src} width={500} height={500} priority={true} style={{ objectFit: "contain", width: "100%", height: "350px" }} />
                            </div>
                        </div>

                        <div style={{ flex: "2 1 300px", display: "grid", gap: "1rem", alignContent: "flex-start", color: "var(--gray1)" }}>
                            <p className={styles.highlight} style={{ textTransform: "uppercase", fontFamily: "var(--JuliusSansOne)", fontSize: "var(--mediumFontSize)" }}>we believe that every picture tells a story</p>

                            <p>Our passion is capturing the unique moments that make life beautiful, whether it&apos;s a wedding, a family reunion, or a personal portrait.</p>

                            <p>With years of experience and a keen eye for detail, we transform ordinary moments into extraordinary memories. Let us be a part of your journey and help you preserve your most cherished moments with stunning photography.</p>
                        </div>
                    </div>
                </AnimateElements>
            </section>

            <section>
                <AnimateElements animationOption={"fadeIn"} delay={1000}>
                    <h2>Portfolio</h2>
                    <h1>Gallery</h1>
                </AnimateElements>

                <Gallery
                    galleryItems={[
                        {
                            name: "Family Portrait",
                            image: require(`@/public/projects/luminousLens/gfamily.jpg`).default.src,
                        },
                        {
                            name: "Product Photography",
                            image: require(`@/public/projects/luminousLens/gwatch.jpg`).default.src,
                        },
                        {
                            name: "Real Estate",
                            image: require(`@/public/projects/luminousLens/ghouse.jpg`).default.src,
                        },
                        {
                            name: "Wedding Photography",
                            image: require(`@/public/projects/luminousLens/gwedding.jpg`).default.src,
                        },
                        {
                            name: "Portrait",
                            image: require(`@/public/projects/luminousLens/gportrait.jpg`).default.src,
                        },
                        {
                            name: "Lifestyle Photography",
                            image: require(`@/public/projects/luminousLens/glifestyle.jpg`).default.src,
                        },
                        {
                            name: "Event Photography",
                            image: require(`@/public/projects/luminousLens/gevent.jpg`).default.src,
                        },
                        {
                            name: "Food Photography",
                            image: require(`@/public/projects/luminousLens/gfood.jpg`).default.src,
                        },
                    ]} />
            </section>

            <section style={{ overflow: "hidden" }}>
                <AnimateElements animationOption={"fadeIn"} delay={1000}>
                    <h2>What We Do</h2>
                    <h1>Services</h1>
                </AnimateElements>

                <Services
                    services={[
                        {
                            name: "Family Photography",
                            image: require(`@/public/projects/luminousLens/sfamily.jpg`).default.src,
                        },
                        {
                            name: "Personal Photography",
                            image: require(`@/public/projects/luminousLens/sportrait.jpg`).default.src,
                        },
                        {
                            name: "Wedding Photography",
                            image: require(`@/public/projects/luminousLens/swedding.jpg`).default.src,
                        },
                        {
                            name: "Product Photography",
                            image: require(`@/public/projects/luminousLens/sproduct.jpg`).default.src,
                        },
                        {
                            name: "Travel Photography",
                            image: require(`@/public/projects/luminousLens/stravel.jpg`).default.src,
                        },
                        {
                            name: "Real-Estate Photography",
                            image: require(`@/public/projects/luminousLens/sluxury.jpg`).default.src,
                        },
                    ]} />
            </section>

            <Footer />
        </main>
    )
}

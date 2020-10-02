<template>
  <div>

  <section class="section section--hello" id="hello">
      <div class="section__inner">
          <div class="block">
              <a class="pre" href="#intro"><span>#0</span>Hello</a>
              <h2>Hello</h2>
              <ul class="anchornav">
                  <li><a href="#intro">Intro <span>#1 What is going on?</span></a></li>
                  <li><a href="#about">About <span>#2 Who is this guy?</span></a></li>
                  <li><a href="#clients">Clients <span>#3 Who did he work for?</span></a></li>
                  <li><a href="#portfolio">Portfolio <span>#4 What did he do?</span></a></li>
                  <li><a href="#contact">Contact <span>#5 Write him a message</span></a></li>
              </ul>
          </div>
      </div>
  </section>

<section class="section section--intro" id="intro">
    <div class="section__inner">
        <div class="block">
            <a class="pre" href="#intro"><span>#1</span>Intro</a>
            <h1>Volker Otto is a<br>
                Web Architect<br>
                based in Norderstedt<br>
                Germany.</h1>
            <p class="lead">
                See small bits of his design work on <a href="https://dribbble.com/hellovolker" class="link">Dribbble</a>, quick thoughts on <a href="https://twitter.com/hellovolker" class="link">Twitter</a>, and a full resume on <a href="#" class="link">Linkedin</a>.
            </p>
        </div>
    </div>
</section>

<section class="section section--about" id="about">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10" preserveAspectRatio="none">
        <polygon points="100 0 100 10 0 10" />
    </svg>

    <div class="section__inner">
        <div class="block">
            <a class="pre" href="#about"><span>#2</span>Building</a>
            <h2>Volker works for companies and agencies, creating responsive web applications.</h2>
            <p class="lead">Building the right foundation to ongoing optimization and support. In short, he tries to make the web a better place.</p>
        </div>
    </div>

</section>

<section class="section section--clients" id="clients">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10" preserveAspectRatio="none">
        <polygon points="100 10 0 0 0 10" />
    </svg>

    <div class="section__inner">
        <div class="block">
            <a class="pre" href="#clients"><span>#3</span>Clients</a>
            <h2>Volker works with corporations, institutions and startups in a wide range of industries.</h2>
            <p class="lead">Here are some of his clients, he has had the pleasure working with:</p>
        </div>
    </div>

</section>

<section class="section section--portfolio1" id="portfolio">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
    </svg>

    <div class="section__inner">
        <div class="block">
            <a class="pre" href="#portfolio"><span>#4</span>Portfolio</a>
            <h2>Portfolio Item #1</h2>
            <p class="lead">Here are some of his clients, he has had the pleasure working with.</p>
        </div>
    </div>
</section>

<section class="section section--portfolio" id="portfolio2">
    <div class="section__inner">
        <div class="block">
            <h2>Portfolio Item #2</h2>
            <p>Descripton of said portfolio item.</p>
        </div>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 102" preserveAspectRatio="none" class="bottom">
        <path d="M0 0 L50 100 L100 0 Z"></path>
    </svg>
</section>

<section class="section section--contact" id="contact">
    <div class="section__inner">
        <div class="block">
            <a class="pre" href="#contact"><span>#5</span>Get in touch</a>
            <h2>For work inquiries<br>please email:<br>
                <span><a href="mailto:hello@volkerotto.net">hello@volkerotto.net</a></span></h2>
            <p class="lead">More links: <a href="https://dribbble.com/hellovolker">Dribbble</a>, <a href="https://twitter.com/hellovolker">Twitter</a> and <a href="https://www.linkedin.com/in/ottovolker">Linkedin</a>.</p>
        </div>
    </div>
</section>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

$primary: #de5f5f;
$black: #555;
$grey: #343436;
$lightgrey: #959595;

$font-serif: "ff-meta-serif-web-pro", serif;
$font-sans: "nimbus-sans", sans-serif;

$transition: all 0.3s cubic-bezier(.05, .69, .14, 1);

*,*::before,*::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
}

a {
    text-decoration: none;
}

/**
 * The fixed Side
 */
$sideWidth: 50px;

/**
 * The first navigation
 */
.anchornav {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
        display: block;
        &::after {
            content: '';
            width: 1.3rem;
            display: block;
            height: 2px;
            background: black;
        }

        &:last-child::after{
            display: none;
        }
    }

    a {
        display: block;
        padding: 1em 0;
        font-family: $font-sans;
        text-transform: uppercase;
        font-size: 12px;
        letter-spacing: 1.4px;
        color: inherit;
        transition: $transition;

        span {
            display: inline;
            padding: .5em 0 0;
            opacity: .3;
            letter-spacing: normal;
            font-family: $font-serif;
            text-transform: none;
        }

        &:hover {
            color: $primary;
            span {
                opacity: 1;
                color: #181818;
            }
        }
    }
}

/**
 * The different sections
 */
.section{
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    min-height: 60vh;
    width: 100%;
    align-content: center;
    padding: 20vh $sideWidth 20vh $sideWidth * 1.5;

    svg {
        position: absolute;
        top: -50px;
        left: 0;
        right: 0;
        width: 100%;
        height: 50px;

        &.bottom {
            bottom: 0;
            top: auto;
            fill: grey;
        }
    }

    .section__inner {
        height: 100%;
        max-width: 800px;
        margin: auto auto auto 0;
    }

    &.section--hello {
        background-color: #FDEF52;
        color: #181818;
    }

    &.section--intro {
        background-color: white;
        color: $black;
    }

    &.section--about {
        background-color: $primary;
        color: white;

        svg {
            fill: $primary;
        }
    }

    &.section--clients {
        background-color: $grey;
        color: white;

        svg {
            fill: $grey;
        }
    }

    &.section--portfolio {
        background-color: orange;
        color: white;

        svg {
            top: -20px;
            fill: orange;

            &.bottom {
                top: auto;
                bottom: -50px;
            }
        }
    }

    &.section--portfolio1 {
        background-color: #3A99D8;
        color: white;

        svg {
            top: -50px;
            fill: #3A99D8;
        }
    }

    &.section--pepperhill {

        svg {
            top: -50px;
            fill: #3A99D8;
        }
    }

    &.section--contact {
        svg {
            fill: white;
        }
    }
}

/**
 * Typo
 */
h1,.h1,h2,.h2,h3,.h3,h4,.h5 {
    font-family: $font-sans;
    font-weight: bold;
    margin: 0 0 1em;
    line-height: 1;
    letter-spacing: -1px;

    @media (min-width: 30rem) {
        letter-spacing: -2px;
    }

    a {
        color: inherit;
        &:hover {
            border-bottom: .1875rem solid;
        }
    }

    span {
        color: $primary;
    }
}
h1,.h1 {
    font-size: 1.2rem;
    @media (min-width: 30rem) {
        font-size: 2.5rem;
    }
}
h2,.h2 {
    font-size: 1.2rem;
    @media (min-width: 30rem) {
        font-size: 2.5rem;
    }
}

.pre {
    display: inline-block;
    font-size: 12px;
    margin: 0;
    opacity: .8;
    letter-spacing: 1.4px;
    word-spacing: .2rem;
    text-transform: uppercase;
    margin-bottom: 1em;
    color: inherit;
    //padding: 6px 5px 5px;
    //background: rgba(black,.1);

    span {
        font-size: .9em;
        margin-right: .4em;
        //color: $primary;
        opacity: .5;
    }

    &:hover {
        opacity: 1;
    }
}

p {
    font-size: .75rem;
    line-height: 1.4;

    @media (min-width: 30rem) {
        font-size: .875rem;
    }

    a {
        font-weight: bold;
        color: inherit;

        &:hover {
            border-bottom: .1875rem solid;
        }
    }
}

.lead {
    display: block;
    font-size: .875rem;
    margin: 0;

    @media (min-width: 30rem) {
        font-size: 1rem;
    }
}

.portfolio {
    font-size: .75rem;

    &.block {
        display: inline-block;
        width: 100%;

        @media (min-width: 30rem) {
            width: 30%;
        }
    }

    .link {
        display: block;
        margin: 2em 0 0 0;
        color: $black;
        letter-spacing: 2px;
        font-size: 12px;
    }

    p {
        font-size: inherit;
        color: $grey;
        opacity: .7;
    }
}
</style>

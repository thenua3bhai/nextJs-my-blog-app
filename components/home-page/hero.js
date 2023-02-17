import classes from "./hero.module.css"; //.module.css extension because
//A CSS Module is a CSS file in which all class names and animation names are scoped locally by default.

import Image from "next/image"; //It is better than html img tag in next js for optimized images m and set acc. to screen size.
// see docs. for more. benefits.

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/profile2.png"
          alt="Image is coming"
          height={800}
          width={800}
        />
      </div>
      <h1>Hi, I am Nature</h1>
      <p>Blog Posts about Nature </p>
    </section>
  );
}

export default Hero;

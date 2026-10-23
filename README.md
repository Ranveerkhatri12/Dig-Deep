# Dig Down!

A scroll-to-dig website for our event. You start on the grass, keep scrolling, and dig all the way down underground to find our sleeping mascot, Orpheus.

It is inspired by those "scroll to the bottom of the ocean" pages. We wanted something playful and a bit childish, so everything is cartoony and a little silly.

## What happens

A mole is your guide. His speech bubble in the corner changes as you go deeper. Along the way you pass ants, worms, beetles, tree roots, a trapdoor spider, a beaver driving a digger, a lost boot and some buried treasure. Further down the fossils start showing up, then crystals, dino eggs and a dino skull. Right at the bottom, Orpheus is fast asleep. Get close and he wakes up, and confetti falls.

A few small things to try:

- Tap any creature or fossil to get a one-line fun fact
- Watch the depth counter in the corner (it starts in cm, then switches to metres)
- Look at the zone name under the counter, it changes from Topsoil all the way to the Dinosaur Layer

## Running it

There is nothing to install. Download the folder and open `index.html` in your browser.

If you want to put it online with GitHub Pages, push the files with `index.html` in the root of the repo, then go to Settings, then Pages, and pick the main branch and the root folder.

## What is inside

```
index.html     the page and every creature on it
style.css      all the looks and animations
script.js      depth counter, story lines, pop-in effects, confetti
assets/        all the images
```

It is plain HTML and CSS with a small amount of JavaScript. No libraries, no build step.

## Changing things

Every creature is a small block in `index.html`. Three numbers control where it goes:

- `--d` is the depth in metres
- `--x` is how far across the screen it sits (0% is left, 100% is right)
- `--s` is the size (1 is normal, 2 is double)

To add something new, copy one block and change the numbers, the image and the fact:

```html
<div class="item" style="--d:20; --x:34%; --s:1.2;" data-fact="Your fun fact goes here.">
  <img class="art" src="assets/yourimage.png" alt="Name" data-emoji="🐛">
  <p class="label">Name</p>
</div>
```

The `data-emoji` is a backup. If an image file is missing or has the wrong name, the page shows that emoji instead of a broken picture.

The yellow note cards are the `fact` blocks. The mole's lines live in the `story` list in `script.js`, each one tied to a depth.

The depth is stretched on purpose so the shallow part gets more room than the deep part. That uses the CSS `sqrt()` function, so use a fairly recent browser.

## Images

All images live in `assets/`. The file names matter because the page looks for them by name.

| File | What it is |
|---|---|
| `orpheus.png` | Our mascot, waiting at the bottom |
| `explorer.png` | The kid with the shovel at the top |
| `mole.png` | The mole guide |
| `ant.png`, `earthworm.png`, `beetle.png`, `horned-beetle.png`, `cricket.png`, `rabbit.png`, `spider.png`, `fungus.png`, `roots.png`, `beaver-digger.png` | Living things |
| `old-boot.png`, `treasure-chest.png` | Fun finds |
| `seashell.png`, `bone.png`, `coral.png`, `fern.png`, `ammonite.png`, `trilobite.png`, `crystals.png`, `dino-skeleton.png`, `dino-egg.png`, `dino-skull.png` | Fossils and rocks |
| `sky.jpg` | The pixel sky at the top |
| `ground.jpg` | The dirt tile |

Transparent PNGs work best for everything except the sky and the dirt.

## Still to do

- Add `seashell.png` and `trilobite.png` (they show emoji for now)
- Swap the images that still have stock watermarks for clean ones
- Check the licence on every image before the site goes public

## Credits

Orpheus is the Hack Club mascot, and the sticker art belongs to them. Other images came from free and stock image sites, so please check each one before reusing it.

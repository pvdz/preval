# Preval test case

# prop_no_yes_yes.md

> Normalize > Nullish > Prop no yes yes
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a.b??c??d);
`````

## Pre Normal

`````js filename=intro
const a = {};
$(a.b ?? c ?? d);
`````

## Normalized

`````js filename=intro
const a = {};
const tmpCallCallee = $;
let tmpCalleeParam = a.b;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = c;
} else {
}
const tmpIfTest$1 = tmpCalleeParam == null;
if (tmpIfTest$1) {
  tmpCalleeParam = d;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpObjectPrototype = Object.prototype;
let tmpCalleeParam = tmpObjectPrototype.b;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = c;
} else {
}
const tmpIfTest$1 = tmpCalleeParam == null;
if (tmpIfTest$1) {
  d;
  $(d);
} else {
  $(tmpCalleeParam);
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

c, d

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

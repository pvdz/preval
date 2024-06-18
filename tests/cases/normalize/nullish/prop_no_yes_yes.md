# Preval test case

# prop_no_yes_yes.md

> Normalize > Nullish > Prop no yes yes
>
> Mix nullish with regular member expressions

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
let tmpCalleeParam = $ObjectPrototype.b;
const tmpIfTest = tmpCalleeParam == null;
let tmpIfTest$1 = false;
if (tmpIfTest) {
  tmpCalleeParam = c;
  tmpIfTest$1 = tmpCalleeParam == null;
} else {
  tmpIfTest$1 = tmpCalleeParam == null;
}
if (tmpIfTest$1) {
  d;
  $(d);
} else {
  $(tmpCalleeParam);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $ObjectPrototype.b;
const b = a == null;
let c = false;
if (b) {
  a = c;
  c = a == null;
}
else {
  c = a == null;
}
if (c) {
  d;
  $( d );
}
else {
  $( a );
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

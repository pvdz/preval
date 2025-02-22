# Preval test case

# pseudo_default.md

> Tests > Tofix > Pseudo default

Consider this pattern to be in a function that tests if an arg is `undefined`, defaulting to an empty object.
We can easily support this particular case to default to arg first.
-->

let val = arg;
if (val === undefined) val = {};

## Input

`````js filename=intro
let val = undefined;
if (arg === undefined) {
  val = {};
} else {
  val = arg;
}
$(val);
`````

## Pre Normal


`````js filename=intro
let val = undefined;
if (arg === undefined) {
  val = {};
} else {
  val = arg;
}
$(val);
`````

## Normalized


`````js filename=intro
let val = undefined;
const tmpIfTest = arg === undefined;
if (tmpIfTest) {
  val = {};
} else {
  val = arg;
}
$(val);
`````

## Output


`````js filename=intro
const tmpIfTest /*:boolean*/ = arg === undefined;
if (tmpIfTest) {
  const tmpClusterSSA_val /*:object*/ = {};
  $(tmpClusterSSA_val);
} else {
  const tmpClusterSSA_val$1 = arg;
  $(tmpClusterSSA_val$1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = arg === undefined;
if (a) {
  const b = {};
  $( b );
}
else {
  const c = arg;
  $( c );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

arg

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

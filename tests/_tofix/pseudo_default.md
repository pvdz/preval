# Preval test case

# pseudo_default.md

> Tofix > pseudo default

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

## Settled


`````js filename=intro
const tmpIfTest /*:boolean*/ = arg === undefined;
if (tmpIfTest) {
  const tmpClusterSSA_val /*:object*/ = {};
  $(tmpClusterSSA_val);
} else {
  $(arg);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if (arg === undefined) {
  $({});
} else {
  $(arg);
}
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
  $(val);
} else {
  val = arg;
  $(arg);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = arg === undefined;
if (a) {
  const b = {};
  $( b );
}
else {
  $( arg );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

arg

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

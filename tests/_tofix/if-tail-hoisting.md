# Preval test case

# if-tail-hoisting.md

> Tofix > if-tail-hoisting

Two things to fix here:
- The assignments to x could be replaced by a call to $(x, 'final') and inlined
- The assignments are first assigned to a let but that seems redundant, are we forcing that? should we?
Though in this test, once we do one we can't do the other (--> `$($(2))`)

## Input

`````js filename=intro
let x = undefined;
const test = $(1);
if (test) {
  const a = $(2);
  x = a;
} else {
  const test2 = $(3);
  if (test2) {
    const b = $(4);
    x = b;
  } else {
    const c = $(5);
    x = c;
  }
}
$(x, "final");
`````

## Pre Normal


`````js filename=intro
let x = undefined;
const test = $(1);
if (test) {
  const a = $(2);
  x = a;
} else {
  const test2 = $(3);
  if (test2) {
    const b = $(4);
    x = b;
  } else {
    const c = $(5);
    x = c;
  }
}
$(x, `final`);
`````

## Normalized


`````js filename=intro
let x = undefined;
const test = $(1);
if (test) {
  const a = $(2);
  x = a;
} else {
  const test2 = $(3);
  if (test2) {
    const b = $(4);
    x = b;
  } else {
    const c = $(5);
    x = c;
  }
}
$(x, `final`);
`````

## Output


`````js filename=intro
let x = undefined;
const test = $(1);
if (test) {
  const a = $(2);
  x = a;
} else {
  const test2 = $(3);
  if (test2) {
    const b = $(4);
    x = b;
  } else {
    const c = $(5);
    x = c;
  }
}
$(x, `final`);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( 1 );
if (b) {
  const c = $( 2 );
  a = c;
}
else {
  const d = $( 3 );
  if (d) {
    const e = $( 4 );
    a = e;
  }
  else {
    const f = $( 5 );
    a = f;
  }
}
$( a, "final" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

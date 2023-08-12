# Preval test case

# invisible_string.md

> Ref tracking > Invisible string
>
> Both strings should be replaced with an empty string (or a custom string indicating they can't be observed)

## Input

`````js filename=intro
let a = "abc";
let b = "def"; // never observed, overwritten in both branches in the loop
if ($) {
  let c = 1;
  const d = $( "x" );
  if (d.length) {
    b = a.slice( 1 );
  }
  else {
    b = a;
  }
  const h = b.length;
  $(h)
}
`````

## Pre Normal

`````js filename=intro
let a = `abc`;
let b = `def`;
if ($) {
  let c = 1;
  const d = $(`x`);
  if (d.length) {
    b = a.slice(1);
  } else {
    b = a;
  }
  const h = b.length;
  $(h);
}
`````

## Normalized

`````js filename=intro
let a = `abc`;
let b = `def`;
if ($) {
  let c = 1;
  const d = $(`x`);
  const tmpIfTest = d.length;
  if (tmpIfTest) {
    b = a.slice(1);
  } else {
    b = a;
  }
  const h = b.length;
  $(h);
} else {
}
`````

## Output

`````js filename=intro
let b = `bc`;
if ($) {
  const d = $(`x`);
  const tmpIfTest = d.length;
  if (tmpIfTest) {
  } else {
    b = `abc`;
  }
  const h = b.length;
  $(h);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = "bc";
if ($) {
  const b = $( "x" );
  const c = b.length;
  if (c) {

  }
  else {
    a = "abc";
  }
  const d = a.length;
  $( d );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

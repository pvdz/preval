# Preval test case

# base2.md

> Let true while > Base2
>
> A func that is being cleared after being called once is "locked". I guess.

#TODO

## Input

`````js filename=intro
let y = $(5);
let x = true;
while (x) {
  $(x);
  const z = y - 1;
  y = z;
  x = z;
}
$(x, y);
`````

## Pre Normal

`````js filename=intro
let y = $(5);
let x = true;
while (x) {
  $(x);
  const z = y - 1;
  y = z;
  x = z;
}
$(x, y);
`````

## Normalized

`````js filename=intro
let y = $(5);
let x = true;
while (true) {
  if (x) {
    $(x);
    const z = y - 1;
    y = z;
    x = z;
  } else {
    break;
  }
}
$(x, y);
`````

## Output

`````js filename=intro
let y = $(5);
$(true);
const z = y - 1;
y = z;
let tmpSSA_x = z;
if (z) {
  $(z);
  const z$1 = y - 1;
  y = z$1;
  tmpSSA_x = z$1;
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_x) {
      $(tmpSSA_x);
      const z$2 = y - 1;
      y = z$2;
      tmpSSA_x = z$2;
    } else {
      break;
    }
  }
} else {
}
$(tmpSSA_x, y);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 5 );
$( true );
const b = a - 1;
a = b;
let c = b;
if (b) {
  $( b );
  const d = a - 1;
  a = d;
  c = d;
  while ($LOOP_UNROLL_9) {
    if (c) {
      $( c );
      const e = a - 1;
      a = e;
      c = e;
    }
    else {
      break;
    }
  }
}
$( c, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: true
 - 3: 4
 - 4: 3
 - 5: 2
 - 6: 1
 - 7: 0, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

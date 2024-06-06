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
const y = $(5);
$(true);
const z = y - 1;
let tmpClusterSSA_y = z;
let tmpClusterSSA_x = z;
if (z) {
  $(z);
  const z$1 = z - 1;
  tmpClusterSSA_y = z$1;
  tmpClusterSSA_x = z$1;
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_x) {
      $(tmpClusterSSA_x);
      const z$2 = tmpClusterSSA_y - 1;
      tmpClusterSSA_y = z$2;
      tmpClusterSSA_x = z$2;
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_x, tmpClusterSSA_y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 5 );
$( true );
const b = a - 1;
let c = b;
let d = b;
if (b) {
  $( b );
  const e = b - 1;
  c = e;
  d = e;
  while ($LOOP_UNROLL_9) {
    if (d) {
      $( d );
      const f = c - 1;
      c = f;
      d = f;
    }
    else {
      break;
    }
  }
}
$( d, c );
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

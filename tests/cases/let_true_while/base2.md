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
  const tmpNestedComplexRhs = y - 1;
  y = tmpNestedComplexRhs;
  x = tmpNestedComplexRhs;
}
$(x, y);
`````

## Pre Normal

`````js filename=intro
let y = $(5);
let x = true;
while (x) {
  $(x);
  const tmpNestedComplexRhs = y - 1;
  y = tmpNestedComplexRhs;
  x = tmpNestedComplexRhs;
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
    const tmpNestedComplexRhs = y - 1;
    y = tmpNestedComplexRhs;
    x = tmpNestedComplexRhs;
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
const tmpNestedComplexRhs = y - 1;
let tmpClusterSSA_y = tmpNestedComplexRhs;
let tmpClusterSSA_x = tmpNestedComplexRhs;
let $tmpLoopUnrollCheck = true;
if (tmpNestedComplexRhs) {
  $(tmpNestedComplexRhs);
  const tmpNestedComplexRhs$1 = tmpNestedComplexRhs - 1;
  tmpClusterSSA_y = tmpNestedComplexRhs$1;
  tmpClusterSSA_x = tmpNestedComplexRhs$1;
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_x) {
      $(tmpClusterSSA_x);
      const tmpNestedComplexRhs$2 = tmpClusterSSA_y - 1;
      tmpClusterSSA_y = tmpNestedComplexRhs$2;
      tmpClusterSSA_x = tmpNestedComplexRhs$2;
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
let e = true;
if (b) {
  $( b );
  const f = b - 1;
  c = f;
  d = f;
}
else {
  e = false;
}
if (e) {
  while ($LOOP_UNROLL_9) {
    if (d) {
      $( d );
      const g = c - 1;
      c = g;
      d = g;
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

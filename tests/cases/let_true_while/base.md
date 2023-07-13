# Preval test case

# base.md

> Let true while > Base
>
> A func that is being cleared after being called once is "locked". I guess.

#TODO

## Input

`````js filename=intro
let y = $(5);
let x = true;
while (x) {
  $(x);
  x = --y;
}
$(x, y);
`````

## Pre Normal

`````js filename=intro
let y = $(5);
let x = true;
while (x) {
  $(x);
  x = --y;
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
    const tmpNestedCompoundLhs = y;
    const tmpNestedComplexRhs = tmpNestedCompoundLhs - 1;
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
if (tmpNestedComplexRhs) {
  $(tmpNestedComplexRhs);
  const tmpNestedComplexRhs$1 = tmpNestedComplexRhs - 1;
  tmpClusterSSA_y = tmpNestedComplexRhs$1;
  tmpClusterSSA_x = tmpNestedComplexRhs$1;
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

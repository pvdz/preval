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
while (x) {
  $(x);
  const tmpNestedCompoundLhs = y;
  const tmpNestedComplexRhs = tmpNestedCompoundLhs - 1;
  y = tmpNestedComplexRhs;
  x = tmpNestedComplexRhs;
}
$(x, y);
`````

## Output

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

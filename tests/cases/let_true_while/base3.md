# Preval test case

# base3.md

> Let true while > Base3
>
> A func that is being cleared after being called once is "locked". I guess.

#TODO

## Input

`````js filename=intro
let y = 5;
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
let y = 5;
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
let y = 5;
let x = true;
while (x) {
  $(x);
  const tmpNestedComplexRhs = y - 1;
  y = tmpNestedComplexRhs;
  x = tmpNestedComplexRhs;
}
$(x, y);
`````

## Output

`````js filename=intro
let y = 5;
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
 - 1: true
 - 2: 4
 - 3: 3
 - 4: 2
 - 5: 1
 - 6: 0, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

# Preval test case

# pattern.md

> Normalize > Binding > Stmt-global-block > Pattern
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
if ($(true)) {
  let x = 1, y = 2, z = [10, 20, 30];
  let [a, b] = z;
  $(a, b, x, y, z);
}
`````

## Pre Normal


`````js filename=intro
if ($(true)) {
  let x = 1,
    y = 2,
    z = [10, 20, 30];
  let [a, b] = z;
  $(a, b, x, y, z);
}
`````

## Normalized


`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let x = 1;
  let y = 2;
  let z = [10, 20, 30];
  let bindingPatternArrRoot = z;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let a = arrPatternSplat[0];
  let b = arrPatternSplat[1];
  $(a, b, x, y, z);
} else {
}
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const z /*:array*/ = [10, 20, 30];
  const arrPatternSplat /*:array*/ = [...z];
  const a /*:unknown*/ = arrPatternSplat[0];
  const b /*:unknown*/ = arrPatternSplat[1];
  $(a, b, 1, 2, z);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = [ 10, 20, 30 ];
  const c = [ ...b ];
  const d = c[ 0 ];
  const e = c[ 1 ];
  $( d, e, 1, 2, b );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 10, 20, 1, 2, [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

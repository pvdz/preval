# Preval test case

# simple_pattern.md

> Normalize > Binding > Stmt-global-block > Simple pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
if ($(true)) {
  let x = 1, y = 2, z = [10, 20, 30];
  let a = [x, y] = z;
  $(a, x, y, z);
}
`````

## Pre Normal

`````js filename=intro
if ($(true)) {
  let x = 1,
    y = 2,
    z = [10, 20, 30];
  let a = ([x, y] = z);
  $(a, x, y, z);
}
`````

## Normalized

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let x = 1;
  let y = 2;
  let z = [10, 20, 30];
  let a = undefined;
  const tmpNestedAssignArrPatternRhs = z;
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  a = tmpNestedAssignArrPatternRhs;
  $(a, x, y, z);
} else {
}
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  const z = [10, 20, 30];
  const arrPatternSplat = [...z];
  const tmpSSA_x = arrPatternSplat[0];
  const tmpSSA_y = arrPatternSplat[1];
  $(z, tmpSSA_x, tmpSSA_y, z);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = [ 10, 20, 30 ];
  const c = [ ... b ];
  const d = c[ 0 ];
  const e = c[ 1 ];
  $( b, d, e, b );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: [10, 20, 30], 10, 20, [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

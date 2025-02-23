# Preval test case

# simple_pattern.md

> Normalize > Binding > Stmt-global-top > Simple pattern
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
let a = [x, y] = z;
$(a, x, y, z);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2,
  z = [10, 20, 30];
let a = ([x, y] = z);
$(a, x, y, z);
`````

## Normalized


`````js filename=intro
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
`````

## Output


`````js filename=intro
const z /*:array*/ = [10, 20, 30];
const arrPatternSplat /*:array*/ = [...z];
const tmpClusterSSA_x /*:unknown*/ = arrPatternSplat[0];
const tmpClusterSSA_y /*:unknown*/ = arrPatternSplat[1];
$(z, tmpClusterSSA_x, tmpClusterSSA_y, z);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 10, 20, 30 ];
const b = [ ...a ];
const c = b[ 0 ];
const d = b[ 1 ];
$( a, c, d, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [10, 20, 30], 10, 20, [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

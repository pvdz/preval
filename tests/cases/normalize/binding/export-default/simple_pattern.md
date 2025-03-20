# Preval test case

# simple_pattern.md

> Normalize > Binding > Export-default > Simple pattern
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
export let a = [x, y] = z;
$(a, x, y, z);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const z /*:array*/ = [10, 20, 30];
const arrPatternSplat /*:array*/ = [...z];
const tmpClusterSSA_x /*:unknown*/ = arrPatternSplat[0];
const tmpClusterSSA_y /*:unknown*/ = arrPatternSplat[1];
a = z;
export { a };
$(a, tmpClusterSSA_x, tmpClusterSSA_y, z);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const z = [10, 20, 30];
const arrPatternSplat = [...z];
const tmpClusterSSA_x = arrPatternSplat[0];
const tmpClusterSSA_y = arrPatternSplat[1];
a = z;
export { a };
$(a, tmpClusterSSA_x, tmpClusterSSA_y, z);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2,
  z = [10, 20, 30];
let a = ([x, y] = z);
export { a };
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
export { a };
$(a, x, y, z);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = [ 10, 20, 30 ];
const c = [ ...b ];
const d = c[ 0 ];
const e = c[ 1 ];
a = b;
export { a as a };
$( a, d, e, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read

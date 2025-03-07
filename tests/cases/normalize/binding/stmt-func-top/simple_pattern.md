# Preval test case

# simple_pattern.md

> Normalize > Binding > Stmt-func-top > Simple pattern
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f() {
  let  x = 1, y = 2, z = [10, 20, 30];
  let a = [x, y] = z;
  $(a, x, y, z);
}
$(f());
`````

## Settled


`````js filename=intro
const z /*:array*/ = [10, 20, 30];
const arrPatternSplat /*:array*/ = [...z];
const tmpClusterSSA_x /*:unknown*/ = arrPatternSplat[0];
const tmpClusterSSA_y /*:unknown*/ = arrPatternSplat[1];
$(z, tmpClusterSSA_x, tmpClusterSSA_y, z);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const z = [10, 20, 30];
const arrPatternSplat = [...z];
$(z, arrPatternSplat[0], arrPatternSplat[1], z);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = 1,
    y = 2,
    z = [10, 20, 30];
  let a = ([x, y] = z);
  $(a, x, y, z);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
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
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 10, 20, 30 ];
const b = [ ...a ];
const c = b[ 0 ];
const d = b[ 1 ];
$( a, c, d, a );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [10, 20, 30], 10, 20, [10, 20, 30]
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
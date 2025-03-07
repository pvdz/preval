# Preval test case

# pattern_pattern.md

> Normalize > Binding > Stmt-func-block > Pattern pattern
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f(){
if ($(true)) {
let x = 1, y = 2, z = [10, 20, 30];
  let [a, b] = [, x, y] = z;
  $(a, b, x, y, z);
}
}
$(f());
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const z /*:array*/ = [10, 20, 30];
  const arrPatternSplat$1 /*:array*/ = [...z];
  const tmpClusterSSA_x /*:unknown*/ = arrPatternSplat$1[1];
  const tmpClusterSSA_y /*:unknown*/ = arrPatternSplat$1[2];
  const arrPatternSplat /*:array*/ = [...z];
  const a /*:unknown*/ = arrPatternSplat[0];
  const b /*:unknown*/ = arrPatternSplat[1];
  $(a, b, tmpClusterSSA_x, tmpClusterSSA_y, z);
} else {
}
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  const z = [10, 20, 30];
  const arrPatternSplat$1 = [...z];
  const tmpClusterSSA_x = arrPatternSplat$1[1];
  const tmpClusterSSA_y = arrPatternSplat$1[2];
  const arrPatternSplat = [...z];
  $(arrPatternSplat[0], arrPatternSplat[1], tmpClusterSSA_x, tmpClusterSSA_y, z);
}
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($(true)) {
    let x = 1,
      y = 2,
      z = [10, 20, 30];
    let [a, b] = ([, x, y] = z);
    $(a, b, x, y, z);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let x = 1;
    let y = 2;
    let z = [10, 20, 30];
    let bindingPatternArrRoot = undefined;
    const tmpNestedAssignArrPatternRhs = z;
    const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
    x = arrPatternSplat$1[1];
    y = arrPatternSplat$1[2];
    bindingPatternArrRoot = tmpNestedAssignArrPatternRhs;
    let arrPatternSplat = [...bindingPatternArrRoot];
    let a = arrPatternSplat[0];
    let b = arrPatternSplat[1];
    $(a, b, x, y, z);
    return undefined;
  } else {
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = [ 10, 20, 30 ];
  const c = [ ...b ];
  const d = c[ 1 ];
  const e = c[ 2 ];
  const f = [ ...b ];
  const g = f[ 0 ];
  const h = f[ 1 ];
  $( g, h, d, e, b );
}
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: 10, 20, 20, 30, [10, 20, 30]
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
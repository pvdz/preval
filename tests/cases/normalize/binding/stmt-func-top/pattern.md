# Preval test case

# pattern.md

> Normalize > Binding > Stmt-func-top > Pattern
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f() {
  let x = 1, y = 2, z = [10, 20, 30];
  let [a, b] = z;
  $(a, b, x, y, z);
}
$(f());
`````

## Settled


`````js filename=intro
const z /*:array*/ = [10, 20, 30];
const arrPatternSplat /*:array*/ = [...z];
const a /*:unknown*/ = arrPatternSplat[0];
const b /*:unknown*/ = arrPatternSplat[1];
$(a, b, 1, 2, z);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const z = [10, 20, 30];
const arrPatternSplat = [...z];
$(arrPatternSplat[0], arrPatternSplat[1], 1, 2, z);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = 1,
    y = 2,
    z = [10, 20, 30];
  let [a, b] = z;
  $(a, b, x, y, z);
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
  let bindingPatternArrRoot = z;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let a = arrPatternSplat[0];
  let b = arrPatternSplat[1];
  $(a, b, x, y, z);
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
$( c, d, 1, 2, a );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 10, 20, 1, 2, [10, 20, 30]
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope

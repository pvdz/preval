# Preval test case

# pattern.md

> Normalize > Binding > Stmt-func-block > Pattern
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f(){
if ($(true)) {
let z = [10, 20, 30];
  let [x, y] = z;
  $(x, y, z);
}
}
$(f());
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const z /*:array*/ = [10, 20, 30];
  const arrPatternSplat /*:array*/ = [...z];
  const x /*:unknown*/ = arrPatternSplat[0];
  const y /*:unknown*/ = arrPatternSplat[1];
  $(x, y, z);
  $(undefined);
} else {
  $(undefined);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  const z = [10, 20, 30];
  const arrPatternSplat = [...z];
  $(arrPatternSplat[0], arrPatternSplat[1], z);
  $(undefined);
} else {
  $(undefined);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($(true)) {
    let z = [10, 20, 30];
    let [x, y] = z;
    $(x, y, z);
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
    let z = [10, 20, 30];
    let bindingPatternArrRoot = z;
    let arrPatternSplat = [...bindingPatternArrRoot];
    let x = arrPatternSplat[0];
    let y = arrPatternSplat[1];
    $(x, y, z);
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
  const d = c[ 0 ];
  const e = c[ 1 ];
  $( d, e, b );
  $( undefined );
}
else {
  $( undefined );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: 10, 20, [10, 20, 30]
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope

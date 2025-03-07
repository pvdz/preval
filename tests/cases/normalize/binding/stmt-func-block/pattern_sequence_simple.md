# Preval test case

# pattern_sequence_simple.md

> Normalize > Binding > Stmt-func-block > Pattern sequence simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f(){
if ($(true)) {
let x = 1, y = 2, z = [10, 20, 30];
  let [a, b] = ($(x), $(y), z);
  $(a, b, x, y, z);
}
}
$(f());
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(1);
  $(2);
  const z /*:array*/ = [10, 20, 30];
  const arrPatternSplat /*:array*/ = [...z];
  const a /*:unknown*/ = arrPatternSplat[0];
  const b /*:unknown*/ = arrPatternSplat[1];
  $(a, b, 1, 2, z);
} else {
}
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(1);
  $(2);
  const z = [10, 20, 30];
  const arrPatternSplat = [...z];
  $(arrPatternSplat[0], arrPatternSplat[1], 1, 2, z);
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
    let [a, b] = ($(x), $(y), z);
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
    $(x);
    $(y);
    let bindingPatternArrRoot = z;
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
  $( 1 );
  $( 2 );
  const b = [ 10, 20, 30 ];
  const c = [ ...b ];
  const d = c[ 0 ];
  const e = c[ 1 ];
  $( d, e, 1, 2, b );
}
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: 1
 - 3: 2
 - 4: 10, 20, 1, 2, [10, 20, 30]
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
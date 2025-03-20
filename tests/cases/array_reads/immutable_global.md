# Preval test case

# immutable_global.md

> Array reads > Immutable global
>
> As long as a global array can't mutate, array elements can be inlined

## Input

`````js filename=intro
const arr = [1, 2, 3];
function f(){
  $(arr[0], arr[1], arr[2], arr[3]);
  return arr[2];
}
$(f());
$(f);
$(arr[1]);
$(arr.length);
`````

## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  $(1, 2, 3, undefined);
  return 3;
};
$(1, 2, 3, undefined);
$(3);
$(f);
$(2);
$(3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $(1, 2, 3, undefined);
  return 3;
};
$(1, 2, 3, undefined);
$(3);
$(f);
$(2);
$(3);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(arr[0], arr[1], arr[2], arr[3]);
  return arr[2];
};
const arr = [1, 2, 3];
$(f());
$(f);
$(arr[1]);
$(arr.length);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpCalleeParam = arr[0];
  const tmpCalleeParam$1 = arr[1];
  const tmpCalleeParam$3 = arr[2];
  const tmpCalleeParam$5 = arr[3];
  $(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
  const tmpReturnArg = arr[2];
  return tmpReturnArg;
};
const arr = [1, 2, 3];
const tmpCalleeParam$7 = f();
$(tmpCalleeParam$7);
$(f);
const tmpCalleeParam$9 = arr[1];
$(tmpCalleeParam$9);
const tmpCalleeParam$11 = arr.length;
$(tmpCalleeParam$11);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( 1, 2, 3, undefined );
  return 3;
};
$( 1, 2, 3, undefined );
$( 3 );
$( a );
$( 2 );
$( 3 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1, 2, 3, undefined
 - 2: 3
 - 3: '<function>'
 - 4: 2
 - 5: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- inline computed array property read

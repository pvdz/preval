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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let tmpCalleeParam = arr[0];
  let tmpCalleeParam$1 = arr[1];
  let tmpCalleeParam$3 = arr[2];
  let tmpCalleeParam$5 = arr[3];
  $(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
  const tmpReturnArg = arr[2];
  return tmpReturnArg;
};
const arr = [1, 2, 3];
let tmpCalleeParam$7 = f();
$(tmpCalleeParam$7);
$(f);
let tmpCalleeParam$9 = arr[1];
$(tmpCalleeParam$9);
let tmpCalleeParam$11 = arr.length;
$(tmpCalleeParam$11);
`````


## Todos triggered


None


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

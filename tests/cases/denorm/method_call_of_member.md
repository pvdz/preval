# Preval test case

# method_call_of_member.md

> Denorm > Method call of member
>
>

## Input

`````js filename=intro
var spy = { get x(){ $('x1'); return () => { $('call') }} };
var spy2 = { get x(){ $('x2') } };
spy.x(spy2.x);
`````


## Settled


`````js filename=intro
const tmpReturnArg /*:()=>undefined*/ = function () {
  debugger;
  $(`call`);
  return undefined;
};
const spy /*:object*/ = {
  get x() {
    debugger;
    $(`x1`);
    return tmpReturnArg;
  },
};
const tmpCallVal /*:unknown*/ = spy.x;
const spy2 /*:object*/ = {
  get x() {
    debugger;
    $(`x2`);
    return undefined;
  },
};
const tmpCalleeParam /*:unknown*/ = spy2.x;
$dotCall(tmpCallVal, spy, `x`, tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpReturnArg = function () {
  $(`call`);
};
const spy = {
  get x() {
    $(`x1`);
    return tmpReturnArg;
  },
};
spy.x(
  {
    get x() {
      $(`x2`);
    },
  }.x,
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "call" );
  return undefined;
};
const b = { get x() {
  debugger;
  $( "x1" );
  return a;
} };
const c = b.x;
const d = { get x() {
  debugger;
  $( "x2" );
  return undefined;
} };
const e = d.x;
$dotCall( c, b, "x", e );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x1'
 - 2: 'x2'
 - 3: 'call'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

# Preval test case

# return_new_func.md

> Function inlining > Return new func
>
> We should be able to inline certain functions

## Input

`````js filename=intro
function g(a) {
  return $(a, 'g');
}
function f() {
  return new g(10);
}
$(f(), 'outer');
`````


## Settled


`````js filename=intro
const g /*:(unknown)=>unknown*/ = function ($$0) {
  const a /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg$1 /*:unknown*/ = $(a, `g`);
  return tmpReturnArg$1;
};
const tmpReturnArg /*:object*/ = new g(10);
$(tmpReturnArg, `outer`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const g = function (a) {
  const tmpReturnArg$1 = $(a, `g`);
  return tmpReturnArg$1;
};
$(new g(10), `outer`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = $( b, "g" );
  return c;
};
const d = new a( 10 );
$( d, "outer" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10, 'g'
 - 2: {}, 'outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

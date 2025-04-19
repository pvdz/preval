# Preval test case

# return_param_method.md

> Return > Return param method
>
> A function that returns an alteration of its param

## Input

`````js filename=intro
function f(a) {
  $('stop');
  $('the');
  $('inlining');
  return a.toString(2); // A lot trickier, at least in certain cases
}
$(f(1));
$(f(2));
$(f('three'));
`````


## Settled


`````js filename=intro
const f /*:(primitive)=>unknown*/ = function ($$0) {
  const a /*:primitive*/ = $$0;
  debugger;
  $(`stop`);
  $(`the`);
  $(`inlining`);
  const tmpCallCompVal /*:unknown*/ = a.toString;
  const tmpReturnArg /*:unknown*/ = $dotCall(tmpCallCompVal, a, `toString`, 2);
  return tmpReturnArg;
};
const tmpCalleeParam /*:unknown*/ = f(1);
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:unknown*/ = f(2);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:unknown*/ = f(`three`);
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (a) {
  $(`stop`);
  $(`the`);
  $(`inlining`);
  const tmpReturnArg = a.toString(2);
  return tmpReturnArg;
};
$(f(1));
$(f(2));
$(f(`three`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  $( "stop" );
  $( "the" );
  $( "inlining" );
  const c = b.toString;
  const d = $dotCall( c, b, "toString", 2 );
  return d;
};
const e = a( 1 );
$( e );
const f = a( 2 );
$( f );
const g = a( "three" );
$( g );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'stop'
 - 2: 'the'
 - 3: 'inlining'
 - 4: '1'
 - 5: 'stop'
 - 6: 'the'
 - 7: 'inlining'
 - 8: '10'
 - 9: 'stop'
 - 10: 'the'
 - 11: 'inlining'
 - 12: 'three'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

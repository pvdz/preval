# Preval test case

# builtin_symbol_only.md

> Primitive arg inlining > Builtin symbol only
>
> Calling a function with a builtin symbol like $number_toString should clone the function and try to inline the arg with that symbol.

## Options

- reducersOnly: inlineIdenticalParam

## Input

`````js filename=intro
function f(a, b) {
  return a + b;
}
$(f($number_toString, 2));
$(f($number_toString, 4));
`````


## Settled


`````js filename=intro
let f /*:(function, number)=>unknown*/ = function ($$0, $$1) {
  let a /*:function*/ /*truthy*/ = $$0;
  let b /*:number*/ = $$1;
  debugger;
  const tmpReturnArg /*:primitive*/ = a + b;
  return tmpReturnArg;
};
let tmpCalleeParam /*:unknown*/ = f($number_toString, 2);
$(tmpCalleeParam);
let tmpCalleeParam$1 /*:unknown*/ = f($number_toString, 4);
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let f = function (a, b) {
  const tmpReturnArg = a + b;
  return tmpReturnArg;
};
let tmpCalleeParam = f($number_toString, 2);
$(tmpCalleeParam);
let tmpCalleeParam$1 = f($number_toString, 4);
$(tmpCalleeParam$1);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = function($$0,$$1 ) {
  let b = $$0;
  let c = $$1;
  debugger;
  const d = b + c;
  return d;
};
let e = a( $number_toString, 2 );
$( e );
let f = a( $number_toString, 4 );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  const tmpReturnArg = a + b;
  return tmpReturnArg;
};
let tmpCalleeParam = f($number_toString, 2);
$(tmpCalleeParam);
let tmpCalleeParam$1 = f($number_toString, 4);
$(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'function() { [native code] }2'
 - 2: 'function() { [native code] }4'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

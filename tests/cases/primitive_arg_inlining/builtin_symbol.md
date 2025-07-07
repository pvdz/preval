# Preval test case

# builtin_symbol.md

> Primitive arg inlining > Builtin symbol
>
> Calling a function with a builtin symbol like $number_toString should clone the function and try to inline the arg with that symbol.

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
$($Number_NaN);
$(`function toString() { [native code] }4`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_NaN);
$(`function toString() { [native code] }4`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Number_NaN );
$( "function toString() { [native code] }4" );
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

Post settled calls: BAD!!
 - !1: NaN
 -  2: 'function() { [native code] }4'
 -  eval returned: undefined

Denormalized calls: BAD!!
 - !1: NaN
 -  2: 'function() { [native code] }4'
 -  eval returned: undefined

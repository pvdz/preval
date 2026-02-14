# Preval test case

# builtin_symbol2.md

> Primitive arg inlining > Builtin symbol2
>
> Calling a function with a builtin symbol like $number_toString should clone the function and try to inline the arg with that symbol.

## Input

`````js filename=intro
const tmpReturnArg$3 /*:primitive*/ = $number_toString + 2;
const tmpCalleeParam /*:primitive*/ = tmpReturnArg$3;
$(tmpCalleeParam);
const tmpReturnArg$1 /*:primitive*/ = $number_toString + 4;
const tmpCalleeParam$1 /*:primitive*/ = tmpReturnArg$1;
$(tmpCalleeParam$1);
`````


## Settled


`````js filename=intro
$(`function toString() { [native code] }2`);
$(`function toString() { [native code] }4`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`function toString() { [native code] }2`);
$(`function toString() { [native code] }4`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "function toString() { [native code] }2" );
$( "function toString() { [native code] }4" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpReturnArg$3 = `function toString() { [native code] }2`;
const tmpCalleeParam = tmpReturnArg$3;
$(tmpReturnArg$3);
const tmpReturnArg$1 = `function toString() { [native code] }4`;
const tmpCalleeParam$1 = tmpReturnArg$1;
$(tmpReturnArg$1);
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

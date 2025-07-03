# Preval test case

# string_padStart_call_ctx_spread_second.md

> Builtins cases > Ai string > String padStart call ctx spread second
>
> Test 'padStart' called with .call and object context, spread as second argument (three values)

## Input

`````js filename=intro
$(String.prototype.padStart.call("abc", 6, ...$(["*", 42, null])));
// Expected: "***abc"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [`*`, 42, null];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam /*:string*/ = $dotCall($string_padStart, `abc`, undefined, 6, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([`*`, 42, null]);
$($dotCall($string_padStart, `abc`, undefined, 6, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "*", 42, null ];
const b = $( a );
const c = $dotCall( $string_padStart, "abc", undefined, 6, ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.padStart;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam$1 = [`*`, 42, null];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `abc`, 6, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_call
- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $string_padStart


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['*', 42, null]
 - 2: '***abc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

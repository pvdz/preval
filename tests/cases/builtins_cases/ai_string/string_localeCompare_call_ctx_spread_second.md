# Preval test case

# string_localeCompare_call_ctx_spread_second.md

> Builtins cases > Ai string > String localeCompare call ctx spread second
>
> Test 'localeCompare' called with .call and object context, spread as second argument (three values)

## Input

`````js filename=intro
$(String.prototype.localeCompare.call("abc", "abd", ...$(["en", { sensitivity: "base" }])));
// Expected: -1
`````


## Settled


`````js filename=intro
const tmpArrElement$1 /*:object*/ /*truthy*/ = { sensitivity: `base` };
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [`en`, tmpArrElement$1];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam /*:number*/ = $dotCall($string_localeCompare, `abc`, undefined, `abd`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement$1 = { sensitivity: `base` };
const tmpMCSP = $([`en`, tmpArrElement$1]);
$($dotCall($string_localeCompare, `abc`, undefined, `abd`, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { sensitivity: "base" };
const b = [ "en", a ];
const c = $( b );
const d = $dotCall( $string_localeCompare, "abc", undefined, "abd", ...c );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.localeCompare;
const tmpMCF = tmpMCOO.call;
const tmpArrElement = `en`;
const tmpArrElement$1 = { sensitivity: `base` };
let tmpCalleeParam$1 = [tmpArrElement, tmpArrElement$1];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `abc`, `abd`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_call
- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $string_localeCompare


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['en', { sensitivity: '"base"' }]
 - 2: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

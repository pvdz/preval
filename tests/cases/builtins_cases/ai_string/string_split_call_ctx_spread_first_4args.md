# Preval test case

# string_split_call_ctx_spread_first_4args.md

> Builtins cases > Ai string > String split call ctx spread first 4args
>
> Test 'split' called with .call and object context, spread as first argument (four values)

## Input

`````js filename=intro
$(String.prototype.split.call("abc", ...$(["b", 1, 42, null])));
// Expected: ["a"]
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [`b`, 1, 42, null];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam /*:array*/ /*truthy*/ = $dotCall($string_split, `abc`, undefined, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([`b`, 1, 42, null]);
$($dotCall($string_split, `abc`, undefined, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "b", 1, 42, null ];
const b = $( a );
const c = $dotCall( $string_split, "abc", undefined, ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.split;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam$1 = [`b`, 1, 42, null];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `abc`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_call
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['b', 1, 42, null]
 - 2: ['a']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

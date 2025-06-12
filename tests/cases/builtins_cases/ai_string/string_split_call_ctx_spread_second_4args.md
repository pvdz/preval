# Preval test case

# string_split_call_ctx_spread_second_4args.md

> Builtins cases > Ai string > String split call ctx spread second 4args
>
> Test 'split' called with .call and object context, spread as second argument (four values)

## Input

`````js filename=intro
$(String.prototype.split.call("abc", "b", ...$([1, 42, null, undefined])));
// Expected: ["a"]
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [1, 42, null, undefined];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam /*:array*/ /*truthy*/ = $dotCall($string_split, `abc`, undefined, `b`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([1, 42, null, undefined]);
$($dotCall($string_split, `abc`, undefined, `b`, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 42, null, undefined ];
const b = $( a );
const c = $dotCall( $string_split, "abc", undefined, "b", ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.split;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam$1 = [1, 42, null, undefined];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `abc`, `b`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 42, null, undefined]
 - 2: ['a']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

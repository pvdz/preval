# Preval test case

# string_match_call_ctx_spread_second.md

> Builtins cases > Ai string > String match call ctx spread second
>
> Test 'match' called with .call and object context, spread as second argument (three values)

## Input

`````js filename=intro
$(String.prototype.match.call("abc", "b", ...$(["extra", 42, null])));
// Expected: ["b"]
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [`extra`, 42, null];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:string*/ = $dotCall($string_match, `abc`, undefined, `b`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([`extra`, 42, null]);
[...tmpMCSP];
$($dotCall($string_match, `abc`, undefined, `b`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "extra", 42, null ];
const b = $( a );
[ ...b ];
const c = $dotCall( $string_match, "abc", undefined, "b" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.match;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam$1 = [`extra`, 42, null];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `abc`, `b`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $string_match


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['extra', 42, null]
 - 2: ['b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

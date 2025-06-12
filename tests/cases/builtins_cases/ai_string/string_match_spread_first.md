# Preval test case

# string_match_spread_first.md

> Builtins cases > Ai string > String match spread first
>
> Test 'match' called directly with spread as first argument (three values)

## Input

`````js filename=intro
$("abc".match(...$(["b", "extra", 42])));
// Expected: ["b"]
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [`b`, `extra`, 42];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam /*:string*/ = $dotCall($string_match, `abc`, `match`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([`b`, `extra`, 42]);
$($dotCall($string_match, `abc`, `match`, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "b", "extra", 42 ];
const b = $( a );
const c = $dotCall( $string_match, "abc", "match", ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_match;
let tmpCalleeParam$1 = [`b`, `extra`, 42];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, `abc`, `match`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $string_match


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['b', 'extra', 42]
 - 2: ['b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

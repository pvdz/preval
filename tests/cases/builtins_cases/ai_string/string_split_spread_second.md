# Preval test case

# string_split_spread_second.md

> Builtins cases > Ai string > String split spread second
>
> Test 'split' called directly with spread as second argument (three values)

## Input

`````js filename=intro
$("abc".split("b", ...$([1, 42, null])));
// Expected: ["a"]
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [1, 42, null];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam /*:array*/ /*truthy*/ = $dotCall($string_split, `abc`, `split`, `b`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([1, 42, null]);
$($dotCall($string_split, `abc`, `split`, `b`, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 42, null ];
const b = $( a );
const c = $dotCall( $string_split, "abc", "split", "b", ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_split;
let tmpCalleeParam$1 = [1, 42, null];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, `abc`, `split`, `b`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 42, null]
 - 2: ['a']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

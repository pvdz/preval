# Preval test case

# string_split_spread_first.md

> Builtins cases > Ai string > String split spread first
>
> Test 'split' called directly with spread as first argument (three values)

## Input

`````js filename=intro
$("abc".split(...$(["b", 1, 42])));
// Expected: ["a"]
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [`b`, 1, 42];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam /*:array*/ /*truthy*/ = $dotCall($string_split, `abc`, `split`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([`b`, 1, 42]);
$($dotCall($string_split, `abc`, `split`, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "b", 1, 42 ];
const b = $( a );
const c = $dotCall( $string_split, "abc", "split", ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_split;
let tmpCalleeParam$1 = [`b`, 1, 42];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, `abc`, `split`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['b', 1, 42]
 - 2: ['a']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

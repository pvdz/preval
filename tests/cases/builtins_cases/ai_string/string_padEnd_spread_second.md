# Preval test case

# string_padEnd_spread_second.md

> Builtins cases > Ai string > String padEnd spread second
>
> Test 'padEnd' called directly with spread as second argument (three values)

## Input

`````js filename=intro
$("abc".padEnd(6, ...$(["*", 42, null])));
// Expected: "abc***"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [`*`, 42, null];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam /*:string*/ = $dotCall($string_padEnd, `abc`, `padEnd`, 6, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([`*`, 42, null]);
$($dotCall($string_padEnd, `abc`, `padEnd`, 6, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "*", 42, null ];
const b = $( a );
const c = $dotCall( $string_padEnd, "abc", "padEnd", 6, ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_padEnd;
let tmpCalleeParam$1 = [`*`, 42, null];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, `abc`, `padEnd`, 6, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $string_padEnd


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['*', 42, null]
 - 2: 'abc***'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

# Preval test case

# string_padEnd_spread_second_4args.md

> Builtins cases > Ai string > String padEnd spread second 4args
>
> Test 'padEnd' called directly with spread as second argument (four values)

## Input

`````js filename=intro
$("abc".padEnd(6, ...$(["*", 42, null, undefined])));
// Expected: "abc***"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [`*`, 42, null, undefined];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam /*:string*/ = $dotCall($string_padEnd, `abc`, `padEnd`, 6, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([`*`, 42, null, undefined]);
$($dotCall($string_padEnd, `abc`, `padEnd`, 6, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "*", 42, null, undefined ];
const b = $( a );
const c = $dotCall( $string_padEnd, "abc", "padEnd", 6, ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_padEnd;
let tmpCalleeParam$1 = [`*`, 42, null, undefined];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, `abc`, `padEnd`, 6, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $string_padEnd


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['*', 42, null, undefined]
 - 2: 'abc***'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

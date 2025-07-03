# Preval test case

# string_normalize_spread_first_4args.md

> Builtins cases > Ai string > String normalize spread first 4args
>
> Test 'normalize' called directly with spread as first argument (four values)

## Input

`````js filename=intro
$("Amélie".normalize(...$(["NFD", "extra", 42, null])));
// Expected: "Amélie"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [`NFD`, `extra`, 42, null];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam /*:string*/ = $dotCall($string_normalize, `Am\u00e9lie`, `normalize`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([`NFD`, `extra`, 42, null]);
$($dotCall($string_normalize, `Am\u00e9lie`, `normalize`, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "NFD", "extra", 42, null ];
const b = $( a );
const c = $dotCall( $string_normalize, "Am\u00e9lie", "normalize", ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_normalize;
let tmpCalleeParam$1 = [`NFD`, `extra`, 42, null];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, `Am\u00e9lie`, `normalize`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $string_normalize


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['NFD', 'extra', 42, null]
 - 2: 'Amélie'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

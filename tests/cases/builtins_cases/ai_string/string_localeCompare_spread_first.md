# Preval test case

# string_localeCompare_spread_first.md

> Builtins cases > Ai string > String localeCompare spread first
>
> Test 'localeCompare' called directly with spread as first argument (three values)

## Input

`````js filename=intro
$("abc".localeCompare(...$(["abd", "en", { sensitivity: "base" }])));
// Expected: -1
`````


## Settled


`````js filename=intro
const tmpArrElement$3 /*:object*/ /*truthy*/ = { sensitivity: `base` };
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [`abd`, `en`, tmpArrElement$3];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam /*:number*/ = $dotCall($string_localeCompare, `abc`, `localeCompare`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement$3 = { sensitivity: `base` };
const tmpMCSP = $([`abd`, `en`, tmpArrElement$3]);
$($dotCall($string_localeCompare, `abc`, `localeCompare`, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { sensitivity: "base" };
const b = [ "abd", "en", a ];
const c = $( b );
const d = $dotCall( $string_localeCompare, "abc", "localeCompare", ...c );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_localeCompare;
const tmpArrElement = `abd`;
const tmpArrElement$1 = `en`;
const tmpArrElement$3 = { sensitivity: `base` };
let tmpCalleeParam$1 = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, `abc`, `localeCompare`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $string_localeCompare


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['abd', 'en', { sensitivity: '"base"' }]
 - 2: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

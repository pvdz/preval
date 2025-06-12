# Preval test case

# string_normalize_spread_second_4args.md

> Builtins cases > Ai string > String normalize spread second 4args
>
> Test 'normalize' called directly with spread as second argument (four values)

## Input

`````js filename=intro
$("Amélie".normalize("NFD", ...$(["extra", 42, null, undefined])));
// Expected: "Amélie"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [`extra`, 42, null, undefined];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
$(`Ame\u0301lie`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([`extra`, 42, null, undefined]);
[...tmpMCSP];
$(`Ame\u0301lie`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "extra", 42, null, undefined ];
const b = $( a );
[ ...b ];
$( "Ame\u0301lie" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_normalize;
let tmpCalleeParam$1 = [`extra`, 42, null, undefined];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, `Am\u00e9lie`, `normalize`, `NFD`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $string_normalize


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['extra', 42, null, undefined]
 - 2: 'Amélie'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

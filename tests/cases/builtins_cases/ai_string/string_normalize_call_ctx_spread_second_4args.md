# Preval test case

# string_normalize_call_ctx_spread_second_4args.md

> Builtins cases > Ai string > String normalize call ctx spread second 4args
>
> Test 'normalize' called with .call and object context, spread as second argument (four values)

## Input

`````js filename=intro
$(String.prototype.normalize.call("Amélie", "NFD", ...$(["extra", 42, null, undefined])));
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
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.normalize;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam$1 = [`extra`, 42, null, undefined];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `Am\u00e9lie`, `NFD`, ...tmpMCSP);
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

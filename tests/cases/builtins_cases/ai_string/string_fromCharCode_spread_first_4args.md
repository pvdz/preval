# Preval test case

# string_fromCharCode_spread_first_4args.md

> Builtins cases > Ai string > String fromCharCode spread first 4args
>
> Test String.fromCharCode called directly with spread as first argument (four values)

## Input

`````js filename=intro
$(String.fromCharCode(...$([65, 66, 67, 68])));
// Expected: "ABCD"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [65, 66, 67, 68];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:string*/ = $String_fromCharCode(...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([65, 66, 67, 68]);
[...tmpMCSP];
$($String_fromCharCode(...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 65, 66, 67, 68 ];
const b = $( a );
[ ...b ];
const c = $String_fromCharCode( ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $String_fromCharCode;
let tmpCalleeParam$1 = [65, 66, 67, 68];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, $string_constructor, `fromCharCode`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [65, 66, 67, 68]
 - 2: 'ABCD'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

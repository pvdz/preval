# Preval test case

# string_fromCharCode_spread_second_4args.md

> Builtins cases > Ai string > String fromCharCode spread second 4args
>
> Test String.fromCharCode called directly with spread as second argument (four values)

## Input

`````js filename=intro
$(String.fromCharCode(65, ...$([66, 67, 68, 69])));
// Expected: "ABCDE"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [66, 67, 68, 69];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:string*/ = $String_fromCharCode(65, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([66, 67, 68, 69]);
[...tmpMCSP];
$($String_fromCharCode(65, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 66, 67, 68, 69 ];
const b = $( a );
[ ...b ];
const c = $String_fromCharCode( 65, ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $String_fromCharCode;
let tmpCalleeParam$1 = [66, 67, 68, 69];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, $string_constructor, `fromCharCode`, 65, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [66, 67, 68, 69]
 - 2: 'ABCDE'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

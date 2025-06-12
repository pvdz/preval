# Preval test case

# string_charAt_spread_second_4args.md

> Builtins cases > Ai string > String charAt spread second 4args
>
> Test String.prototype.charAt called directly with spread as second argument (four values)

## Input

`````js filename=intro
$("abc".charAt(1, ...$([2, 3, 4, 5])));
// Expected: "b"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [2, 3, 4, 5];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
$(`b`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([2, 3, 4, 5]);
[...tmpMCSP];
$(`b`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 2, 3, 4, 5 ];
const b = $( a );
[ ...b ];
$( "b" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_charAt;
let tmpCalleeParam$1 = [2, 3, 4, 5];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, `abc`, `charAt`, 1, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2, 3, 4, 5]
 - 2: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

# Preval test case

# string_charAt_spread_first.md

> Builtins cases > Ai string > String charAt spread first
>
> Test String.prototype.charAt called directly with spread as first argument (three values)

## Input

`````js filename=intro
$("abc".charAt(...$([1, 2, 3])));
// Expected: "b"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [1, 2, 3];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam /*:string*/ = $dotCall($string_charAt, `abc`, `charAt`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([1, 2, 3]);
$($dotCall($string_charAt, `abc`, `charAt`, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = $( a );
const c = $dotCall( $string_charAt, "abc", "charAt", ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_charAt;
let tmpCalleeParam$1 = [1, 2, 3];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, `abc`, `charAt`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

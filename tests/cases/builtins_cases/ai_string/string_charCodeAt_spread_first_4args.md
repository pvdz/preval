# Preval test case

# string_charCodeAt_spread_first_4args.md

> Builtins cases > Ai string > String charCodeAt spread first 4args
>
> Test String.prototype.charCodeAt called directly with spread as first argument (four values)

## Input

`````js filename=intro
$("abc".charCodeAt(...$([1, 2, 3, 4])));
// Expected: 98
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [1, 2, 3, 4];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam /*:number*/ = $dotCall($string_charCodeAt, `abc`, `charCodeAt`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([1, 2, 3, 4]);
$($dotCall($string_charCodeAt, `abc`, `charCodeAt`, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3, 4 ];
const b = $( a );
const c = $dotCall( $string_charCodeAt, "abc", "charCodeAt", ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_charCodeAt;
let tmpCalleeParam$1 = [1, 2, 3, 4];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, `abc`, `charCodeAt`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Support string.charCodeAt when the arg is not a string literal
- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3, 4]
 - 2: 98
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

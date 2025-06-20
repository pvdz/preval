# Preval test case

# string_concat_spread_first.md

> Builtins cases > Ai string > String concat spread first
>
> Test String.prototype.concat called directly with spread as first argument (three values)

## Input

`````js filename=intro
$("abc".concat(...$(["d", "e", "f"])));
// Expected: "abcdef"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [`d`, `e`, `f`];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam /*:string*/ = $dotCall($string_concat, `abc`, `concat`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([`d`, `e`, `f`]);
$($dotCall($string_concat, `abc`, `concat`, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "d", "e", "f" ];
const b = $( a );
const c = $dotCall( $string_concat, "abc", "concat", ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_concat;
let tmpCalleeParam$1 = [`d`, `e`, `f`];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, `abc`, `concat`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Maybe support type tracked trick of string.concat with spread
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['d', 'e', 'f']
 - 2: 'abcdef'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

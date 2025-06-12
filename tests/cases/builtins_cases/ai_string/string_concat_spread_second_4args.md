# Preval test case

# string_concat_spread_second_4args.md

> Builtins cases > Ai string > String concat spread second 4args
>
> Test String.prototype.concat called directly with spread as second argument (four values)

## Input

`````js filename=intro
$("abc".concat("d", ...$(["e", "f", "g", "h"])));
// Expected: "abcdefg" (extra arg ignored)
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [`e`, `f`, `g`, `h`];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam /*:string*/ = $dotCall($string_concat, `abc`, `concat`, `d`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([`e`, `f`, `g`, `h`]);
$($dotCall($string_concat, `abc`, `concat`, `d`, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "e", "f", "g", "h" ];
const b = $( a );
const c = $dotCall( $string_concat, "abc", "concat", "d", ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_concat;
let tmpCalleeParam$1 = [`e`, `f`, `g`, `h`];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, `abc`, `concat`, `d`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Maybe support type tracked trick of string.concat with spread
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['e', 'f', 'g', 'h']
 - 2: 'abcdefgh'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

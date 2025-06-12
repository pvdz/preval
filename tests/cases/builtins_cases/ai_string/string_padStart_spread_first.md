# Preval test case

# string_padStart_spread_first.md

> Builtins cases > Ai string > String padStart spread first
>
> Test 'padStart' called directly with spread as first argument (three values)

## Input

`````js filename=intro
$("abc".padStart(...$([6, "*", 42])));
// Expected: "***abc"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [6, `*`, 42];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam /*:string*/ = $dotCall($string_padStart, `abc`, `padStart`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([6, `*`, 42]);
$($dotCall($string_padStart, `abc`, `padStart`, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 6, "*", 42 ];
const b = $( a );
const c = $dotCall( $string_padStart, "abc", "padStart", ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_padStart;
let tmpCalleeParam$1 = [6, `*`, 42];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, `abc`, `padStart`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $string_padStart


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [6, '*', 42]
 - 2: '***abc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

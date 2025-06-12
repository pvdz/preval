# Preval test case

# string_match_spread_second.md

> Builtins cases > Ai string > String match spread second
>
> Test 'match' called directly with spread as second argument (three values)

## Input

`````js filename=intro
$("abc".match("b", ...$(["extra", 42, null])));
// Expected: ["b"]
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [`extra`, 42, null];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
const tmpCalleeParam /*:string*/ = $dotCall($string_match, `abc`, `match`, `b`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([`extra`, 42, null]);
[...tmpMCSP];
$($dotCall($string_match, `abc`, `match`, `b`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "extra", 42, null ];
const b = $( a );
[ ...b ];
const c = $dotCall( $string_match, "abc", "match", "b" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_match;
let tmpCalleeParam$1 = [`extra`, 42, null];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, `abc`, `match`, `b`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $string_match


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['extra', 42, null]
 - 2: ['b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

# Preval test case

# string_repeat_spread_first.md

> Builtins cases > Ai string > String repeat spread first
>
> Test 'repeat' called directly with spread as first argument (three values)

## Input

`````js filename=intro
$("abc".repeat(...$([2, 42, null])));
// Expected: "abcabc"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [2, 42, null];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam /*:string*/ = $dotCall($string_repeat, `abc`, `repeat`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([2, 42, null]);
$($dotCall($string_repeat, `abc`, `repeat`, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 2, 42, null ];
const b = $( a );
const c = $dotCall( $string_repeat, "abc", "repeat", ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_repeat;
let tmpCalleeParam$1 = [2, 42, null];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, `abc`, `repeat`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $string_repeat


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2, 42, null]
 - 2: 'abcabc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

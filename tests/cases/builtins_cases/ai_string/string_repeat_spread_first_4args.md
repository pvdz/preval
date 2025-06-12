# Preval test case

# string_repeat_spread_first_4args.md

> Builtins cases > Ai string > String repeat spread first 4args
>
> Test 'repeat' called directly with spread as first argument (four values)

## Input

`````js filename=intro
$("abc".repeat(...$([2, 42, null, undefined])));
// Expected: "abcabc"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [2, 42, null, undefined];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam /*:string*/ = $dotCall($string_repeat, `abc`, `repeat`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([2, 42, null, undefined]);
$($dotCall($string_repeat, `abc`, `repeat`, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 2, 42, null, undefined ];
const b = $( a );
const c = $dotCall( $string_repeat, "abc", "repeat", ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_repeat;
let tmpCalleeParam$1 = [2, 42, null, undefined];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, `abc`, `repeat`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $string_repeat


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2, 42, null, undefined]
 - 2: 'abcabc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

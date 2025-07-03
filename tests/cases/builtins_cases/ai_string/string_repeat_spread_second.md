# Preval test case

# string_repeat_spread_second.md

> Builtins cases > Ai string > String repeat spread second
>
> Test 'repeat' called directly with spread as second argument (three values)

## Input

`````js filename=intro
$("abc".repeat(2, ...$([42, null, undefined])));
// Expected: "abcabc"
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [42, null, undefined];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpMCSP];
$(`abcabc`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([42, null, undefined]);
[...tmpMCSP];
$(`abcabc`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 42, null, undefined ];
const b = $( a );
[ ...b ];
$( "abcabc" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_repeat;
let tmpCalleeParam$1 = [42, null, undefined];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, `abc`, `repeat`, 2, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $string_repeat


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [42, null, undefined]
 - 2: 'abcabc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

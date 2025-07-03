# Preval test case

# string_split_spread_second_4args.md

> Builtins cases > Ai string > String split spread second 4args
>
> Test 'split' called directly with spread as second argument (four values)

## Input

`````js filename=intro
$("abc".split("b", ...$([1, 42, null, undefined])));
// Expected: ["a"]
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [1, 42, null, undefined];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam /*:array*/ /*truthy*/ = $dotCall($string_split, `abc`, `split`, `b`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $([1, 42, null, undefined]);
$($dotCall($string_split, `abc`, `split`, `b`, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 42, null, undefined ];
const b = $( a );
const c = $dotCall( $string_split, "abc", "split", "b", ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_split;
let tmpCalleeParam$1 = [1, 42, null, undefined];
const tmpMCSP = $(tmpCalleeParam$1);
let tmpCalleeParam = $dotCall(tmpMCF, `abc`, `split`, `b`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 42, null, undefined]
 - 2: ['a']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

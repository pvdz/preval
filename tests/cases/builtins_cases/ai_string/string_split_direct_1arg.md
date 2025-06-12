# Preval test case

# string_split_direct_1arg.md

> Builtins cases > Ai string > String split direct 1arg
>
> Test 'split' called directly with one argument on a string instance

## Input

`````js filename=intro
$("abc".split("b"));
// Expected: ["a", "c"]
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [`a`, `c`];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`a`, `c`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "c" ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_split;
let tmpCalleeParam = [`a`, `c`];
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['a', 'c']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

# Preval test case

# string_split_direct_0args.md

> Builtins cases > Ai string > String split direct 0args
>
> Test 'split' called directly with zero arguments on a string instance

## Input

`````js filename=intro
$("abc".split());
// Expected: ["abc"]
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [`abc`];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`abc`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "abc" ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_split;
let tmpCalleeParam = [`abc`];
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['abc']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

# Preval test case

# string_split_direct_3args.md

> Builtins cases > Ai string > String split direct 3args
>
> Test 'split' called directly with three arguments on a string instance (extra arg ignored)

## Input

`````js filename=intro
$("abc".split("b", 1, 42));
// Expected: ["a"]
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [`a`];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`a`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a" ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_split;
const tmpArgOverflow = `b`;
const tmpArgOverflow$1 = 1;
let tmpCalleeParam = $dotCall($string_split, `abc`, `split`, tmpArgOverflow, tmpArgOverflow$1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['a']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

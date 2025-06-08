# Preval test case

# spread_member.md

> Normalize > Array > Spread member
>
> Spread arg that is simple should not change

## Input

`````js filename=intro
$([...true.toString.name]);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [`t`, `o`, `S`, `t`, `r`, `i`, `n`, `g`];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`t`, `o`, `S`, `t`, `r`, `i`, `n`, `g`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "t", "o", "S", "t", "r", "i", "n", "g" ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $boolean_toString;
const tmpArrSpread = tmpCompObj.name;
let tmpCalleeParam = [...tmpArrSpread];
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['t', 'o', 'S', 't', 'r', 'i', 'n', 'g']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

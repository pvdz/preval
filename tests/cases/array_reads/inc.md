# Preval test case

# inc.md

> Array reads > Inc
>
> Inlining array properties

(This actually caused a syntax erorr at one point, oops)

## Input

`````js filename=intro
const arr = [1, 2, 3];
$(++arr[0]);
`````


## Settled


`````js filename=intro
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3];
const tmpUpdObj = arr;
const tmpUpdProp = 0;
const tmpUpdVal = tmpUpdObj[tmpUpdProp];
const tmpUpdNum = $coerce(tmpUpdVal, `number`);
const tmpUpdInc = tmpUpdNum + 1;
tmpUpdObj[tmpUpdProp] = tmpUpdInc;
let tmpCalleeParam = tmpUpdInc;
$(tmpUpdInc);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

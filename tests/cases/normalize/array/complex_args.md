# Preval test case

# complex_args.md

> Normalize > Array > Complex args
>
> An array with complex elements should be normalized to a temp var

## Input

`````js filename=intro
$([5 + 5, $(), Array.prototype.length]);
`````


## Settled


`````js filename=intro
const tmpArrElement$1 /*:unknown*/ = $();
const tmpCalleeParam /*:array*/ /*truthy*/ = [10, tmpArrElement$1, 0];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement$1 = $();
$([10, tmpArrElement$1, 0]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = [ 10, a, 0 ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = 10;
const tmpArrElement$1 = $();
const tmpCompObj = $Array_prototype;
const tmpArrElement$3 = tmpCompObj.length;
let tmpCalleeParam = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: [10, undefined, 0]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

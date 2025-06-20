# Preval test case

# array_in_array_method.md

> Array > Spread > Array in array method
>
> Spreading an array into another array that is assigned to a binding

## Input

`````js filename=intro
const x = [1, 2, 3];
$(x.join('')); // This is benign, but splice would not be
const y = ['a', ...x, 'b'];
$(y);
`````


## Settled


`````js filename=intro
$(`123`);
const y /*:array*/ /*truthy*/ = [`a`, 1, 2, 3, `b`];
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`123`);
$([`a`, 1, 2, 3, `b`]);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "123" );
const a = [ "a", 1, 2, 3, "b" ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = [1, 2, 3];
const tmpMCF = x.join;
let tmpCalleeParam = $dotCall(tmpMCF, x, `join`, ``);
$(tmpCalleeParam);
const y = [`a`, ...x, `b`];
$(y);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '123'
 - 2: ['a', 1, 2, 3, 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

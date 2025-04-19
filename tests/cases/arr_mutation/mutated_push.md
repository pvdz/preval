# Preval test case

# mutated_push.md

> Arr mutation > Mutated push
>
>

## Input

`````js filename=intro
const arr = [1, 2, 3, 4];
arr.splice(1, 2);
arr.push('a', 'b');
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [1, 4, `a`, `b`];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 4, `a`, `b`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 4, "a", "b" ];
$( a );
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: tmpCallCompVal
- (todo) arr mutation may be able to inline this method: tmpCallCompVal$1


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 4, 'a', 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

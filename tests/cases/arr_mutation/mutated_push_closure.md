# Preval test case

# mutated_push_closure.md

> Arr mutation > Mutated push closure
>
>

## Input

`````js filename=intro
const arr = [1, 2, 3, 4];
f();
arr.push('a', 'b');
$(arr);
function f() {
  arr.splice(1, 5); // If a and b are added before the splice then a will be removed
}
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [1, `a`, `b`];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, `a`, `b`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, "a", "b" ];
$( a );
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) arr mutation may be able to inline this method: tmpMCF$1
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 'a', 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

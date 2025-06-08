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
const arr /*:array*/ /*truthy*/ = [1, `a`, `b`];
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpMCF = arr.splice;
  $dotCall(tmpMCF, arr, `splice`, 1, 5);
  return undefined;
};
const arr = [1, 2, 3, 4];
f();
const tmpMCF$1 = arr.push;
$dotCall(tmpMCF$1, arr, `push`, `a`, `b`);
$(arr);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) access object property that also exists on prototype? $array_splice
- (todo) arr mutation may be able to inline this method: tmpMCF
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

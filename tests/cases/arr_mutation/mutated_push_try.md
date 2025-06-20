# Preval test case

# mutated_push_try.md

> Arr mutation > Mutated push try
>
>

## Input

`````js filename=intro
const arr = [1, 2, 3, 4];
try {
  $(1);
  arr.splice(1, 2);
} catch {
  
}
arr.push('a', 'b');
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [1, 2, 3, 4];
try {
  $(1);
  $dotCall($array_splice, arr, `splice`, 1, 2);
} catch (e) {}
$dotCall($array_push, arr, `push`, `a`, `b`);
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [1, 2, 3, 4];
try {
  $(1);
  $dotCall($array_splice, arr, `splice`, 1, 2);
} catch (e) {}
$dotCall($array_push, arr, `push`, `a`, `b`);
$(arr);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3, 4 ];
try {
  $( 1 );
  $dotCall( $array_splice, a, "splice", 1, 2 );
}
catch (b) {

}
$dotCall( $array_push, a, "push", "a", "b" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3, 4];
try {
  $(1);
  const tmpMCF = arr.splice;
  $dotCall(tmpMCF, arr, `splice`, 1, 2);
} catch (e) {}
const tmpMCF$1 = arr.push;
$dotCall(tmpMCF$1, arr, `push`, `a`, `b`);
$(arr);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) access object property that also exists on prototype? $array_splice
- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: [1, 4, 'a', 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

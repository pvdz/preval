# Preval test case

# mutated_push_closure2.md

> Arr mutation > Mutated push closure2
>
>

## Input

`````js filename=intro
const arr = [1, 2, 3, 4];
f();
arr.push('a', 'b');
$(arr);
function f(x) {
  arr.splice(1, 5); // If a and b are added before the splice then a will be removed
  if (x) f(x); // Attempt at not to get eliminated, though eventually this won't hold :)
}
`````


## Settled


`````js filename=intro
const f /*:(unknown)=>undefined*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  $dotCall($array_splice, arr, `splice`, 1, 5);
  if (x) {
    f(x);
    return undefined;
  } else {
    return undefined;
  }
};
const arr /*:array*/ = [1, 2, 3, 4];
f();
$dotCall($array_push, arr, `push`, `a`, `b`);
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (x) {
  $dotCall($array_splice, arr, `splice`, 1, 5);
  if (x) {
    f(x);
  }
};
const arr = [1, 2, 3, 4];
f();
$dotCall($array_push, arr, `push`, `a`, `b`);
$(arr);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  $dotCall( $array_splice, c, "splice", 1, 5 );
  if (b) {
    a( b );
    return undefined;
  }
  else {
    return undefined;
  }
};
const c = [ 1, 2, 3, 4 ];
a();
$dotCall( $array_push, c, "push", "a", "b" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  const tmpMCF = arr.splice;
  $dotCall(tmpMCF, arr, `splice`, 1, 5);
  if (x) {
    f(x);
    return undefined;
  } else {
    return undefined;
  }
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

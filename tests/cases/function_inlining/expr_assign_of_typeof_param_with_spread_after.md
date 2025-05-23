# Preval test case

# expr_assign_of_typeof_param_with_spread_after.md

> Function inlining > Expr assign of typeof param with spread after
>
> A function that does a simple thing may need to be inlined in trivial cases.

In this case the assignment used a param.

The call has a spread after the param index which is fine.

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, b) {
    x = typeof b;
  }
  const arr = $([1, 2, 3]);
  g(10, 20, 30, ...arr, 40, 50, 60);
}
f();
$(x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [1, 2, 3];
const arr /*:unknown*/ = $(tmpCalleeParam);
[...arr];
$(`number`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([1, 2, 3]);
[...arr];
$(`number`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = $( a );
[ ...b ];
$( "number" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0, $$1) {
    let a = $$0;
    let b = $$1;
    debugger;
    x = typeof b;
    return undefined;
  };
  let tmpCalleeParam = [1, 2, 3];
  const arr = $(tmpCalleeParam);
  g(10, 20, 30, ...arr, 40, 50, 60);
  return undefined;
};
let x = 0;
f();
$(x);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

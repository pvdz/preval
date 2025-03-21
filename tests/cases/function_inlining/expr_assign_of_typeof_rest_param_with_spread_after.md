# Preval test case

# expr_assign_of_typeof_rest_param_with_spread_after.md

> Function inlining > Expr assign of typeof rest param with spread after
>
> A function that does a simple thing may need to be inlined in trivial cases.

The assignment in g uses a rest param. There are some cases where we can still transform this.

In this case, the function is called with a spread after the rest param index so we should transform.

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, ...b) {
    x = typeof b;
  }
  const arr = $([1, 2])
  g(10, 20, 30, 40, ...arr, 50, 60);
}
f();
$(x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [1, 2];
const arr /*:unknown*/ = $(tmpCalleeParam);
[...arr];
$(`object`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([1, 2]);
[...arr];
$(`object`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2 ];
const b = $( a );
[ ...b ];
$( "object" );
`````


## Todos triggered


- (todo) drop unused rest param?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2]
 - 2: 'object'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

# Preval test case

# return_call_func.md

> Function inlining > Return call func
>
> We should be able to inline certain functions

## Input

`````js filename=intro
function g(a) {
  return $(a, 'g');
}
function f() {
  return g(10);
}
$(f(), 'outer');
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpReturnArg /*:unknown*/ = $(10, `g`);
$(tmpClusterSSA_tmpReturnArg, `outer`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(10, `g`), `outer`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10, "g" );
$( a, "outer" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpReturnArg = g(10);
  return tmpReturnArg;
};
let g = function ($$0) {
  let a = $$0;
  debugger;
  const tmpReturnArg$1 = $(a, `g`);
  return tmpReturnArg$1;
};
let tmpCalleeParam = f();
$(tmpCalleeParam, `outer`);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10, 'g'
 - 2: 10, 'outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

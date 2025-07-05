# Preval test case

# spread_call.md

> Normalize > Object > Spread call
>
> Spread arg that is simple should not change

## Input

`````js filename=intro
function f(){
  return $({x: 1});
}
$({...f()});
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { x: 1 };
const tmpClusterSSA_tmpObjSpread /*:unknown*/ = $(tmpCalleeParam);
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { ...tmpClusterSSA_tmpObjSpread };
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_tmpObjSpread = $({ x: 1 });
$({ ...tmpClusterSSA_tmpObjSpread });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = { ... b };
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let tmpCalleeParam = { x: 1 };
  const tmpReturnArg = $(tmpCalleeParam);
  return tmpReturnArg;
};
const tmpObjSpread = f();
let tmpCalleeParam$1 = { ...tmpObjSpread };
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support ObjectExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

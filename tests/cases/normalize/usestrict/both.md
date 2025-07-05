# Preval test case

# both.md

> Normalize > Usestrict > Both
>
> Make sure the directive is not kept because of its special status

## Input

`````js filename=intro
"use strict";
function f() {
  "use strict";
  return $();
}
$(f());
`````


## Settled


`````js filename=intro
const tmpReturnArg /*:unknown*/ = $();
$(tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpReturnArg = $();
  return tmpReturnArg;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

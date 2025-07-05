# Preval test case

# printing_regression.md

> Ifelse > Printing regression
>
> This was a regression at some point, leading to printing errors mid-way the rule.

The problem was that an assignment was generated with its .right set to null (this involves the let without init in this example).

## Input

`````js filename=intro
let f = function (a) {
  let x = undefined;
  if ($) {
    x = $;
  }
  let y;
};
const c = f();
$(c);
`````


## Settled


`````js filename=intro
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  let x = undefined;
  if ($) {
    x = $;
  } else {
  }
  let y = undefined;
  return undefined;
};
const c = f();
$(c);
`````


## Todos triggered


- (todo) support IfStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

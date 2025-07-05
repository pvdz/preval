# Preval test case

# label.md

> Function > Constructor > Label
>
> Label state should also clone

## Input

`````js filename=intro
const f = Function(`label_x: { $(y); break label_x; } return 500`);
$(f());
`````


## Settled


`````js filename=intro
$(y);
$(500);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(y);
$(500);
`````


## PST Settled
With rename=true

`````js filename=intro
$( y );
$( 500 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function () {
  debugger;
  $(y);
  return 500;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support ExpressionStatement as statement in let_hoisting noob check


## Globals


BAD@! Found 1 implicit global bindings:

y


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

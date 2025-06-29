# Preval test case

# dupe_var.md

> Function > Constructor > Dupe var
>
> Label state should also clone

## Input

`````js filename=intro
const test = $(true, 1);
const f = Function(`const test = 100; if (test) return test;`);
$(f(test));
`````


## Settled


`````js filename=intro
$(true, 1);
$(100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true, 1);
$(100);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true, 1 );
$( 100 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const test = $(true, 1);
const f = function () {
  debugger;
  const test$1 = 100;
  if (test$1) {
    return test$1;
  } else {
    return undefined;
  }
};
let tmpCalleeParam = f(test);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true, 1
 - 2: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

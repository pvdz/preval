# Preval test case

# with_tail2.md

> Ifelse > Label > With tail2
>
> Regression

Something was allowing the collapse of a function to global space causing a return statement to appear outside of a function.

## Input

`````js filename=intro
const A = function() {};
const B = function () {
  const C = function () {
    const x = $(true);
    if (x) {
      A();
    }
  };
  const r = C();
  return r;
};
B();
`````


## Settled


`````js filename=intro
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const A = function () {
  debugger;
  return undefined;
};
const B = function () {
  debugger;
  const C = function () {
    debugger;
    const x = $(true);
    if (x) {
      A();
      return undefined;
    } else {
      return undefined;
    }
  };
  const r = C();
  return r;
};
B();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

# Preval test case

# if_return.md

> One timers > Statement > If return
>
> Return inlining

## Input

`````js filename=intro
function f() {
  if ($()) {
    return $(1);
  }
}
f();
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $();
if (tmpIfTest) {
  $(1);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($()) {
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
if (a) {
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $();
  if (tmpIfTest) {
    const tmpReturnArg = $(1);
    return tmpReturnArg;
  } else {
    return undefined;
  }
};
f();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

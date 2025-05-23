# Preval test case

# if_return_return.md

> One timers > Var > If return return
>
> Return inlining

## Input

`````js filename=intro
function f() {
  if ($()) {
    $(1);
  }
  $(2);
}
const x = f();
$(x);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $();
if (tmpIfTest) {
  $(1);
  $(2);
  $(undefined);
} else {
  $(2);
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($()) {
  $(1);
  $(2);
  $(undefined);
} else {
  $(2);
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
if (a) {
  $( 1 );
  $( 2 );
  $( undefined );
}
else {
  $( 2 );
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $();
  if (tmpIfTest) {
    $(1);
    $(2);
    return undefined;
  } else {
    $(2);
    return undefined;
  }
};
const x = f();
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 2
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

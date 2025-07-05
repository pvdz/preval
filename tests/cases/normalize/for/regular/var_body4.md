# Preval test case

# var_body4.md

> Normalize > For > Regular > Var body4
>
> Var as body of a do-while

## Input

`````js filename=intro
for(;$(x);) var x = undefined;
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(undefined);
if (tmpIfTest) {
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpIfTest$1 /*:unknown*/ = $(undefined);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(undefined)) {
  while (true) {
    if (!$(undefined)) {
      break;
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( undefined );
if (a) {
  while ($LOOP_UNROLLS_LEFT_10) {
    const b = $( undefined );
    if (b) {

    }
    else {
      break;
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
while (true) {
  const tmpIfTest = $(x);
  if (tmpIfTest) {
    x = undefined;
  } else {
    break;
  }
}
`````


## Todos triggered


None


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

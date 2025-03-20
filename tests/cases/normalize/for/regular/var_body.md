# Preval test case

# var_body.md

> Normalize > For > Regular > Var body
>
> Var as body of a do-while

## Input

`````js filename=intro
for(;$(false);) var x = 0;
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(false);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(false);
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
if ($(false)) {
  while (true) {
    if (!$(false)) {
      break;
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
if (a) {
  while ($LOOP_UNROLL_10) {
    const b = $( false );
    if (b) {

    }
    else {
      break;
    }
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

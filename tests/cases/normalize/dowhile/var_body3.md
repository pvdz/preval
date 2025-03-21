# Preval test case

# var_body3.md

> Normalize > Dowhile > Var body3
>
> Var as body of a do-while

## Input

`````js filename=intro
do var x; while ($(x));
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(undefined);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
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
  while ($LOOP_UNROLL_10) {
    const b = $( undefined );
    if (b) {

    }
    else {
      break;
    }
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

# Preval test case

# empty_body.md

> Normalize > While > Empty body
>
> A loop cannot be eliminated but can be normalized

## Input

`````js filename=intro
while ($());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $();
if (tmpIfTest) {
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpIfTest$1 /*:unknown*/ = $();
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
if ($()) {
  while (true) {
    if (!$()) {
      break;
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
if (a) {
  while ($LOOP_UNROLLS_LEFT_10) {
    const b = $();
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
while (true) {
  const tmpIfTest = $();
  if (tmpIfTest) {
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
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

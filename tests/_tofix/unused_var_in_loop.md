# Preval test case

# unused_var_in_loop.md

> Tofix > unused var in loop

At the time of writing this xyz var ws not eliminated or even pulled
into the else branch. I think there's room for improvement here

## Input

`````js filename=intro
let xyz /*:boolean*/ = !$(true);
if ($) {
} else {
  while ($LOOP_UNROLLS_LEFT_9) {
    if (xyz) {
      if ($()) {
        xyz = false;
      } else {
      }
    } else {
      break;
    }
  }
}
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(true);
let xyz /*:boolean*/ = !tmpUnaryArg;
if ($) {
} else {
  while ($LOOP_UNROLLS_LEFT_9) {
    if (xyz) {
      const tmpIfTest /*:unknown*/ = $();
      if (tmpIfTest) {
        xyz = false;
      } else {
      }
    } else {
      break;
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(true);
let xyz = !tmpUnaryArg;
if (!$) {
  while (true) {
    if (xyz) {
      if ($()) {
        xyz = false;
      }
    } else {
      break;
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
let b = !a;
if ($) {

}
else {
  while ($LOOP_UNROLLS_LEFT_9) {
    if (b) {
      const c = $();
      if (c) {
        b = false;
      }
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
const tmpUnaryArg = $(true);
let xyz = !tmpUnaryArg;
if ($) {
} else {
  while ($LOOP_UNROLLS_LEFT_9) {
    if (xyz) {
      const tmpIfTest = $();
      if (tmpIfTest) {
        xyz = false;
      } else {
      }
    } else {
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
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

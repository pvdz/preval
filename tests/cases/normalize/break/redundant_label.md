# Preval test case

# redundant_label.md

> Normalize > Break > Redundant label
>
> If a labeled break does the same thing without the label then the label should be dropped

## Input

`````js filename=intro
let x = $(2);
exit: while (x) {
  $(1);
  
  if ($(1)) {
    x = $(3);
  }
  if (x) {
    break exit;
  } else {
    x = $(4);
  }
}
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(2);
if (x) {
  $(1);
  const tmpIfTest /*:unknown*/ = $(1);
  if (tmpIfTest) {
    x = $(3);
  } else {
  }
  if (x) {
  } else {
    let tmpClusterSSA_x /*:unknown*/ = $(4);
    while ($LOOP_UNROLL_10) {
      if (tmpClusterSSA_x) {
        $(1);
        const tmpIfTest$1 /*:unknown*/ = $(1);
        if (tmpIfTest$1) {
          tmpClusterSSA_x = $(3);
        } else {
        }
        if (tmpClusterSSA_x) {
          break;
        } else {
          tmpClusterSSA_x = $(4);
        }
      } else {
        break;
      }
    }
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(2);
if (x) {
  $(1);
  if ($(1)) {
    x = $(3);
  }
  if (!x) {
    let tmpClusterSSA_x = $(4);
    while (true) {
      if (tmpClusterSSA_x) {
        $(1);
        if ($(1)) {
          tmpClusterSSA_x = $(3);
        }
        if (tmpClusterSSA_x) {
          break;
        } else {
          tmpClusterSSA_x = $(4);
        }
      } else {
        break;
      }
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( 2 );
if (a) {
  $( 1 );
  const b = $( 1 );
  if (b) {
    a = $( 3 );
  }
  if (a) {

  }
  else {
    let c = $( 4 );
    while ($LOOP_UNROLL_10) {
      if (c) {
        $( 1 );
        const d = $( 1 );
        if (d) {
          c = $( 3 );
        }
        if (c) {
          break;
        }
        else {
          c = $( 4 );
        }
      }
      else {
        break;
      }
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(2);
while (true) {
  if (x) {
    $(1);
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      x = $(3);
    } else {
    }
    if (x) {
      break;
    } else {
      x = $(4);
    }
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
 - 1: 2
 - 2: 1
 - 3: 1
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

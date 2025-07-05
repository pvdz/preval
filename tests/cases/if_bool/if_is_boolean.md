# Preval test case

# if_is_boolean.md

> If bool > If is boolean

`let y = true; if (x) { y = false; }` is really `let y = Boolean(x)`

## Input

`````js filename=intro
let y = true;
let x = !$;
if (x) {
  if ($) {
    x = false;
  } else {
  }
} else {
  y = false;
}
if (y) {
  while ($LOOP_UNROLLS_LEFT_9) {
    if (x) {
      if ($) {
        x = false;
      } else {
      }
    } else {
      break;
    }
  }
} else {
}
`````


## Settled


`````js filename=intro
let tmpClusterSSA_x /*:boolean*/ = !$;
if ($) {
} else {
  while ($LOOP_UNROLLS_LEFT_9) {
    if (tmpClusterSSA_x) {
      if ($) {
        tmpClusterSSA_x = false;
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
let tmpClusterSSA_x = !$;
if (!$) {
  while (true) {
    if (tmpClusterSSA_x) {
      if ($) {
        tmpClusterSSA_x = false;
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
let a = !$;
if ($) {

}
else {
  while ($LOOP_UNROLLS_LEFT_9) {
    if (a) {
      if ($) {
        a = false;
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
let y = true;
let x = !$;
if (x) {
  if ($) {
    x = false;
  } else {
  }
} else {
  y = false;
}
if (y) {
  while ($LOOP_UNROLLS_LEFT_9) {
    if (x) {
      if ($) {
        x = false;
      } else {
      }
    } else {
      break;
    }
  }
} else {
}
`````


## Todos triggered


- (todo) Support referencing this builtin in isFree: $


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

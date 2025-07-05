# Preval test case

# nested_ifs.md

> Ssa > Single scope > Nested ifs
>
> Bindings should find each other across ifs

## Input

`````js filename=intro
const f = function (y) {
  let n = undefined; // This one should be eliminated and moved inside the `if`
  if (y) {
    n = 0;
    while (true) {
      if ($) {
        n = n + 1;
        break;
      }
    }
  }
};
$(f);
`````


## Settled


`````js filename=intro
const f /*:(unknown)=>undefined*/ = function ($$0) {
  const y /*:unknown*/ = $$0;
  debugger;
  if (y) {
    if ($) {
      return undefined;
    } else {
      while ($LOOP_UNROLLS_LEFT_10) {
        if ($) {
          break;
        } else {
        }
      }
      return undefined;
    }
  } else {
    return undefined;
  }
};
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function (y) {
  if (y) {
    if (!$) {
      while (true) {
        if ($) {
          break;
        }
      }
    }
  }
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  if (b) {
    if ($) {
      return undefined;
    }
    else {
      while ($LOOP_UNROLLS_LEFT_10) {
        if ($) {
          break;
        }
      }
      return undefined;
    }
  }
  else {
    return undefined;
  }
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function ($$0) {
  let y = $$0;
  debugger;
  let n = undefined;
  if (y) {
    n = 0;
    while (true) {
      if ($) {
        n = n + 1;
        break;
      } else {
      }
    }
    return undefined;
  } else {
    return undefined;
  }
};
$(f);
`````


## Todos triggered


- (todo) Support referencing this builtin in isFree: $


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

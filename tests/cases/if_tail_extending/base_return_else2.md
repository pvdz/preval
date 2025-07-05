# Preval test case

# base_return_else2.md

> If tail extending > Base return else2
>
> Break should also flip
> This partial regressed at some point

## Input

`````js filename=intro
const f = function() {
  const tmpAfterLabel = function($tmpLoopUnrollCheck) {
    if ($tmpLoopUnrollCheck) {
      while ($LOOP_UNROLLS_LEFT_10) {
        if (x) {
          $(1);
          if ($) {
            $(2);
          } else {
            return undefined;
          }
        } else {
          break;
        }
      }
      return undefined;
    } else {
      return undefined;
    }
  };
  let $tmpLoopUnrollCheck = true;
  if (x) {
    $(1);
    if ($) {
      $(2);
      const tmpReturnArg$1 = tmpAfterLabel($tmpLoopUnrollCheck);
      return tmpReturnArg$1;
    } else {
      return undefined;
    }
  } else {
    $tmpLoopUnrollCheck = false;
    const tmpReturnArg = tmpAfterLabel($tmpLoopUnrollCheck);
    return tmpReturnArg;
  }
};
f();
`````


## Settled


`````js filename=intro
if (x) {
  $(1);
  if ($) {
    $(2);
    while ($LOOP_UNROLLS_LEFT_10) {
      if (x) {
        $(1);
        if ($) {
          $(2);
        } else {
          break;
        }
      } else {
        break;
      }
    }
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (x) {
  $(1);
  if ($) {
    $(2);
    while (true) {
      if (x) {
        $(1);
        if ($) {
          $(2);
        } else {
          break;
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
if (x) {
  $( 1 );
  if ($) {
    $( 2 );
    while ($LOOP_UNROLLS_LEFT_10) {
      if (x) {
        $( 1 );
        if ($) {
          $( 2 );
        }
        else {
          break;
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
const f = function () {
  debugger;
  const tmpAfterLabel = function ($$0) {
    let $tmpLoopUnrollCheck$1 = $$0;
    debugger;
    if ($tmpLoopUnrollCheck$1) {
      while ($LOOP_UNROLLS_LEFT_10) {
        if (x) {
          $(1);
          if ($) {
            $(2);
          } else {
            return undefined;
          }
        } else {
          break;
        }
      }
      return undefined;
    } else {
      return undefined;
    }
  };
  let $tmpLoopUnrollCheck = true;
  if (x) {
    $(1);
    if ($) {
      $(2);
      const tmpReturnArg$1 = tmpAfterLabel($tmpLoopUnrollCheck);
      return tmpReturnArg$1;
    } else {
      return undefined;
    }
  } else {
    $tmpLoopUnrollCheck = false;
    const tmpReturnArg = tmpAfterLabel($tmpLoopUnrollCheck);
    return tmpReturnArg;
  }
};
f();
`````


## Todos triggered


- (todo) Support this node type in isFree: DebuggerStatement


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

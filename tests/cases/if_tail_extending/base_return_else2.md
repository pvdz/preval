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
      while ($LOOP_UNROLL_10) {
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

## Pre Normal

`````js filename=intro
const f = function () {
  debugger;
  const tmpAfterLabel = function ($$0) {
    let $tmpLoopUnrollCheck$1 = $$0;
    debugger;
    if ($tmpLoopUnrollCheck$1) {
      while ($LOOP_UNROLL_10) {
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

## Normalized

`````js filename=intro
const f = function () {
  debugger;
  const tmpAfterLabel = function ($$0) {
    let $tmpLoopUnrollCheck$1 = $$0;
    debugger;
    if ($tmpLoopUnrollCheck$1) {
      while ($LOOP_UNROLL_10) {
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

## Output

`````js filename=intro
const tmpSplitTruthy = function () {
  debugger;
  if (x) {
    $(1);
    if ($) {
      $(2);
      while ($LOOP_UNROLL_9) {
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
  } else {
    return undefined;
  }
};
if (x) {
  $(1);
  if ($) {
    $(2);
    tmpSplitTruthy();
  } else {
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  if (x) {
    $( 1 );
    if ($) {
      $( 2 );
      while ($LOOP_UNROLL_9) {
        if (x) {
          $( 1 );
          if ($) {
            $( 2 );
          }
          else {
            return undefined;
          }
        }
        else {
          break;
        }
      }
      return undefined;
    }
    else {
      return undefined;
    }
  }
  else {
    return undefined;
  }
};
if (x) {
  $( 1 );
  if ($) {
    $( 2 );
    a();
  }
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

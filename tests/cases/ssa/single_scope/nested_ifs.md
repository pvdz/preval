# Preval test case

# nested_ifs.md

> Ssa > Single scope > Nested ifs
>
> Bindings should find each other across ifs

#TODO

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

## Pre Normal


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
      }
    }
  }
};
$(f);
`````

## Normalized


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

## Output


`````js filename=intro
const f = function ($$0) {
  const y = $$0;
  debugger;
  if (y) {
    let $tmpLoopUnrollCheck = true;
    if ($) {
      $tmpLoopUnrollCheck = false;
    } else {
    }
    if ($tmpLoopUnrollCheck) {
      while ($LOOP_UNROLL_10) {
        if ($) {
          break;
        } else {
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
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  if (b) {
    let d = true;
    if ($) {
      d = false;
    }
    if (d) {
      while ($LOOP_UNROLL_10) {
        if ($) {
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
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

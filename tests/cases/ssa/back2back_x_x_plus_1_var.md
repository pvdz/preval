# Preval test case

# back2back_x_x_plus_1_var.md

> Ssa > Back2back x x plus 1 var
>
> This may be an artifact through using ++x

We may not be able to properly deal with the temporal order but we can certainly know that the back2back write to x can be SSA'd.

We do have to be careful about using x in the rhs.

Zooming in on the `x = x + 1` case.

#TODO

## Input

`````js filename=intro
const f = function () {
  if ($) {
    // This init is _only_ observed as part of the next update to x, so we should be able to SSA this
    let x = $(5);
    // But because the x is used in the rhs, it becomes write-read-write, which is tricky
    x = x + 1;
    const g = function () {
      if ($) {
        $(x);
        return undefined;
      } else {
        return undefined;
      }
    };
    g();
    return undefined;
  } else {
    return undefined;
  }
};
if ($) {
  f();
} else {
}
`````

## Pre Normal

`````js filename=intro
const f = function () {
  debugger;
  if ($) {
    let x = $(5);
    x = x + 1;
    const g = function () {
      debugger;
      if ($) {
        $(x);
        return undefined;
      } else {
        return undefined;
      }
    };
    g();
    return undefined;
  } else {
    return undefined;
  }
};
if ($) {
  f();
} else {
}
`````

## Normalized

`````js filename=intro
const f = function () {
  debugger;
  if ($) {
    let x = $(5);
    x = x + 1;
    const g = function () {
      debugger;
      if ($) {
        $(x);
        return undefined;
      } else {
        return undefined;
      }
    };
    g();
    return undefined;
  } else {
    return undefined;
  }
};
if ($) {
  f();
} else {
}
`````

## Output

`````js filename=intro
if ($) {
  const x = $(5);
  const tmpSSA_x = x + 1;
  if ($) {
    $(tmpSSA_x);
  } else {
  }
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

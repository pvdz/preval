# Preval test case

# back2back_ref_closure_after.md

> Ssa > Back2back ref closure after
>
> This may be an artifact through using ++x

We may not be able to properly deal with the temporal order but we can certainly know that the back2back write to x can be SSA'd.

We do have to be careful about using x in the rhs.

This version makes sure there's no closure of x before the decl.

#TODO

## Input

`````js filename=intro
function f() {
  if ($) { // The branching prevents flattening
    let x = undefined;
    x = function(){};
    const g = function() {
      if ($) $(x);
    }
    g();
  }
}
if ($) f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    let x = undefined;
    x = function () {
      debugger;
    };
    const g = function () {
      debugger;
      if ($) $(x);
    };
    g();
  }
};
if ($) f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    let x = undefined;
    x = function () {
      debugger;
      return undefined;
    };
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
  const x = function () {
    debugger;
    return undefined;
  };
  if ($) {
    $(x);
  } else {
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  const a = function() {
    debugger;
    return undefined;
  };
  if ($) {
    $( a );
  }
}
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

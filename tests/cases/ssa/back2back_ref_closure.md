# Preval test case

# back2back_ref_closure.md

> Ssa > Back2back ref closure
>
> This may be an artifact through using ++x

We may not be able to properly deal with the temporal order but we can certainly know that the back2back write to x can be SSA'd.

We do have to be careful about using x in the rhs.

## Input

`````js filename=intro
function f() {
  if ($) { // The branching prevents flattening
    let x = undefined;
    x = function(){};
    function g() {
      if ($) $(x);
    }
    g();
    $(x);
  }
}
if ($) f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    let g = function () {
      debugger;
      if ($) $(x);
    };
    let x = undefined;
    x = function () {
      debugger;
    };
    g();
    $(x);
  }
};
if ($) f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    let g = function () {
      debugger;
      if ($) {
        $(x);
        return undefined;
      } else {
        return undefined;
      }
    };
    let x = undefined;
    x = function () {
      debugger;
      return undefined;
    };
    g();
    $(x);
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
  const tmpSSA_x /*:()=>unknown*/ = function () {
    debugger;
    return undefined;
  };
  if ($) {
    $(tmpSSA_x);
  } else {
  }
  $(tmpSSA_x);
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
  $( a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

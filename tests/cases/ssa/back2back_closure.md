# Preval test case

# back2back_closure.md

> Ssa > Back2back closure
>
> This may be an artifact through using ++x

We may not be able to properly deal with the temporal order but we can certainly know that the back2back write to x can be SSA'd.

We do have to be careful about using x in the rhs.

## Input

`````js filename=intro
function f() {
  if ($) { // The branching prevents flattening
    let x = $(5);
    ++x;
    function g() {
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
    let g = function () {
      debugger;
      if ($) $(x);
    };
    let x = $(5);
    ++x;
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
    let g = function () {
      debugger;
      if ($) {
        $(x);
        return undefined;
      } else {
        return undefined;
      }
    };
    let x = $(5);
    x = x + 1;
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
  const tmpClusterSSA_x = x + 1;
  if ($) {
    $(tmpClusterSSA_x);
  } else {
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  const a = $( 5 );
  const b = a + 1;
  if ($) {
    $( b );
  }
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

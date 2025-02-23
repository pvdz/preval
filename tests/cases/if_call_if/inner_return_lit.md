# Preval test case

# inner_return_lit.md

> If call if > Inner return lit
>
> The inner returning a literal should be inlinable

## Input

`````js filename=intro
function f() {
  function g() {
    if (x) {
      return 500;
    } else {
      return 1000;
    }
  }
  let x = $(1);
  if (x) {
    x = true;
    return g();
  } else {
    x = $(0);
    return g();
  }
}
if ($) $(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    if (x) {
      return 500;
    } else {
      return 1000;
    }
  };
  let x = $(1);
  if (x) {
    x = true;
    return g();
  } else {
    x = $(0);
    return g();
  }
};
if ($) $(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    if (x) {
      return 500;
    } else {
      return 1000;
    }
  };
  let x = $(1);
  if (x) {
    x = true;
    const tmpReturnArg = g();
    return tmpReturnArg;
  } else {
    x = $(0);
    const tmpReturnArg$1 = g();
    return tmpReturnArg$1;
  }
};
if ($) {
  const tmpCallCallee = $;
  const tmpCalleeParam = f();
  tmpCallCallee(tmpCalleeParam);
} else {
}
`````

## Output


`````js filename=intro
if ($) {
  const x /*:unknown*/ = $(1);
  if (x) {
    $(500);
  } else {
    const tmpClusterSSA_x /*:unknown*/ = $(0);
    if (tmpClusterSSA_x) {
      $(500);
    } else {
      $(1000);
    }
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  const a = $( 1 );
  if (a) {
    $( 500 );
  }
  else {
    const b = $( 0 );
    if (b) {
      $( 500 );
    }
    else {
      $( 1000 );
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 500
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

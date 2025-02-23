# Preval test case

# bools.md

> Static arg ops > If > Bools
>
> Outline of the `if` test

## Input

`````js filename=intro
function f() {
  let x = 0;
  let g = function(t) {
    if (t) {
      x = x + 1;
      $(x);
    }
  }
  if ($) {
    g(true);
    g(false);
    g(true);
    g(false);
    g(false);
    g(true);
    g(true);
  }
}
if ($) $(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = 0;
  let g = function ($$0) {
    let t = $$0;
    debugger;
    if (t) {
      x = x + 1;
      $(x);
    }
  };
  if ($) {
    g(true);
    g(false);
    g(true);
    g(false);
    g(false);
    g(true);
    g(true);
  }
};
if ($) $(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = 0;
  let g = function ($$0) {
    let t = $$0;
    debugger;
    if (t) {
      x = x + 1;
      $(x);
      return undefined;
    } else {
      return undefined;
    }
  };
  if ($) {
    g(true);
    g(false);
    g(true);
    g(false);
    g(false);
    g(true);
    g(true);
    return undefined;
  } else {
    return undefined;
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
  let x /*:number*/ = 0;
  const g_t /*:()=>*/ = function () {
    debugger;
    x = x + 1;
    $(x);
    return undefined;
  };
  if ($) {
    g_t();
    g_t();
    g_t();
    g_t();
  } else {
  }
  $(undefined);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  let a = 0;
  const b = function() {
    debugger;
    a = a + 1;
    $( a );
    return undefined;
  };
  if ($) {
    b();
    b();
    b();
    b();
  }
  $( undefined );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

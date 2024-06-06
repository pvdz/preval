# Preval test case

# inner_call_return_lit.md

> If call if > Inner call return lit
>
> The inner returning a literal should be inlinable

#TODO

## Input

`````js filename=intro
function f() {
  function g() {
    if (x) {
      $('a');
      return 500;
    } else {
      $('b');
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
      $(`a`);
      return 500;
    } else {
      $(`b`);
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
      $(`a`);
      return 500;
    } else {
      $(`b`);
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
const f = function () {
  debugger;
  const x = $(1);
  if (x) {
    $(`a`);
    return 500;
  } else {
    const tmpClusterSSA_x = $(0);
    if (tmpClusterSSA_x) {
      $(`a`);
      return 500;
    } else {
      $(`b`);
      return 1000;
    }
  }
};
if ($) {
  const tmpCalleeParam = f();
  $(tmpCalleeParam);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  if (b) {
    $( "a" );
    return 500;
  }
  else {
    const c = $( 0 );
    if (c) {
      $( "a" );
      return 500;
    }
    else {
      $( "b" );
      return 1000;
    }
  }
};
if ($) {
  const d = a();
  $( d );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'a'
 - 3: 500
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

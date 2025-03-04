# Preval test case

# _base_if_false.md

> If call if > Var trampo expr return > Base if false
>
> The if-call-if pattern is common and is probably a result from how we transform `||` and `&&`

## Input

`````js filename=intro
function outer() {
  let x = $(0);
  const f = function(){
    if (x) {
      $('inner if', x);
      return;
    } else {
      $('inner else', x);
      return;
    }
  };
  if (x) {
    x = $(2);
    return f();
  } else {
    return f();
  }
}
if ($) $(outer(), 'outer');
`````

## Pre Normal


`````js filename=intro
let outer = function () {
  debugger;
  let x = $(0);
  const f = function () {
    debugger;
    if (x) {
      $(`inner if`, x);
      return;
    } else {
      $(`inner else`, x);
      return;
    }
  };
  if (x) {
    x = $(2);
    return f();
  } else {
    return f();
  }
};
if ($) $(outer(), `outer`);
`````

## Normalized


`````js filename=intro
let outer = function () {
  debugger;
  let x = $(0);
  const f = function () {
    debugger;
    if (x) {
      $(`inner if`, x);
      return undefined;
    } else {
      $(`inner else`, x);
      return undefined;
    }
  };
  if (x) {
    x = $(2);
    const tmpReturnArg = f();
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = f();
    return tmpReturnArg$1;
  }
};
if ($) {
  const tmpCallCallee = $;
  const tmpCalleeParam = outer();
  const tmpCalleeParam$1 = `outer`;
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
} else {
}
`````

## Output


`````js filename=intro
if ($) {
  const x /*:unknown*/ = $(0);
  if (x) {
    const tmpClusterSSA_x /*:unknown*/ = $(2);
    if (tmpClusterSSA_x) {
      $(`inner if`, tmpClusterSSA_x);
    } else {
      $(`inner else`, tmpClusterSSA_x);
    }
  } else {
    $(`inner else`, x);
  }
  $(undefined, `outer`);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  const a = $( 0 );
  if (a) {
    const b = $( 2 );
    if (b) {
      $( "inner if", b );
    }
    else {
      $( "inner else", b );
    }
  }
  else {
    $( "inner else", a );
  }
  $( undefined, "outer" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 'inner else', 0
 - 3: undefined, 'outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

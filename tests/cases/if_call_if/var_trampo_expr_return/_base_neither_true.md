# Preval test case

# _base_neither_true.md

> If call if > Var trampo expr return > Base neither true
>
> The if-call-if pattern is common and is probably a result from how we transform `||` and `&&`

## Input

`````js filename=intro
function outer() {
  let x = $(1);
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
    return f();
  } else {
    x = false;
    return f();
  }
}
if ($) $(outer(), 'outer');
`````

## Pre Normal


`````js filename=intro
let outer = function () {
  debugger;
  let x = $(1);
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
    return f();
  } else {
    x = false;
    return f();
  }
};
if ($) $(outer(), `outer`);
`````

## Normalized


`````js filename=intro
let outer = function () {
  debugger;
  let x = $(1);
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
    const tmpReturnArg = f();
    return tmpReturnArg;
  } else {
    x = false;
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
  const x = $(1);
  if (x) {
    $(`inner if`, x);
  } else {
    $(`inner else`, false);
  }
  $(undefined, `outer`);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  const a = $( 1 );
  if (a) {
    $( "inner if", a );
  }
  else {
    $( "inner else", false );
  }
  $( undefined, "outer" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'inner if', 1
 - 3: undefined, 'outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

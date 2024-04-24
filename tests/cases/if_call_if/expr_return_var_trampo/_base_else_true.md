# Preval test case

# _base_else_true.md

> If call if > Expr return var trampo > Base else true
>
> The if-call-if pattern is common and is probably a result from how we transform `||` and `&&`

#TODO

## Input

`````js filename=intro
function outer() {
  let x = $(1);
  const f = function(){
    if (x) {
      return $('inner if', x);
    } else {
      return $('inner else', x);
    }
  };
  if (x) {
    f();
    return;
  } else {
    x = $(2);
    f();
    return;
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
      return $(`inner if`, x);
    } else {
      return $(`inner else`, x);
    }
  };
  if (x) {
    f();
    return;
  } else {
    x = $(2);
    f();
    return;
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
      const tmpReturnArg = $(`inner if`, x);
      return tmpReturnArg;
    } else {
      const tmpReturnArg$1 = $(`inner else`, x);
      return tmpReturnArg$1;
    }
  };
  if (x) {
    f();
    return undefined;
  } else {
    x = $(2);
    f();
    return undefined;
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
  let x = $(1);
  if (x) {
    $(`inner if`, x);
  } else {
    x = $(2);
    if (x) {
      $(`inner if`, x);
    } else {
      $(`inner else`, x);
    }
  }
  $(undefined, `outer`);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  let a = $( 1 );
  if (a) {
    $( "inner if", a );
  }
  else {
    a = $( 2 );
    if (a) {
      $( "inner if", a );
    }
    else {
      $( "inner else", a );
    }
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

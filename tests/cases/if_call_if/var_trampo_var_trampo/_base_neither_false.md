# Preval test case

# _base_neither_false.md

> If call if > Var trampo var trampo > Base neither false
>
> The if-call-if pattern is common and is probably a result from how we transform `||` and `&&`

#TODO

## Input

`````js filename=intro
function outer() {
  let x = $(0);
  const f = function(){
    if (x) {
      return $('inner if', x);
    } else {
      return $('inner else', x);
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
  let x = $(0);
  const f = function () {
    debugger;
    if (x) {
      return $(`inner if`, x);
    } else {
      return $(`inner else`, x);
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
  let x = $(0);
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
    const tmpReturnArg$3 = f();
    return tmpReturnArg$3;
  } else {
    x = false;
    const tmpReturnArg$5 = f();
    return tmpReturnArg$5;
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
const outer = function () {
  debugger;
  let x = $(0);
  if (x) {
    const tmpReturnArg$3 = $(`inner if`, x);
    return tmpReturnArg$3;
  } else {
    x = false;
    const tmpReturnArg$5 = $(`inner else`, false);
    return tmpReturnArg$5;
  }
};
if ($) {
  const tmpCalleeParam = outer();
  $(tmpCalleeParam, `outer`);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  let b = $( 0 );
  if (b) {
    const c = $( "inner if", b );
    return c;
  }
  else {
    b = false;
    const d = $( "inner else", false );
    return d;
  }
};
if ($) {
  const e = a();
  $( e, "outer" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 'inner else', false
 - 3: 'inner else', 'outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

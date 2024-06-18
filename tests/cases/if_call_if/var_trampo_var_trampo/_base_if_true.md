# Preval test case

# _base_if_true.md

> If call if > Var trampo var trampo > Base if true
>
> The if-call-if pattern is common and is probably a result from how we transform `||` and `&&`

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
    x = $(2);
    const tmpReturnArg$3 = f();
    return tmpReturnArg$3;
  } else {
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
if ($) {
  const x = $(1);
  if (x) {
    const tmpClusterSSA_x = $(2);
    if (tmpClusterSSA_x) {
      const tmpReturnArg = $(`inner if`, tmpClusterSSA_x);
      $(tmpReturnArg, `outer`);
    } else {
      const tmpReturnArg$1 = $(`inner else`, tmpClusterSSA_x);
      $(tmpReturnArg$1, `outer`);
    }
  } else {
    const tmpReturnArg$5 = $(`inner else`, x);
    $(tmpReturnArg$5, `outer`);
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
    const b = $( 2 );
    if (b) {
      const c = $( "inner if", b );
      $( c, "outer" );
    }
    else {
      const d = $( "inner else", b );
      $( d, "outer" );
    }
  }
  else {
    const e = $( "inner else", a );
    $( e, "outer" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'inner if', 2
 - 4: 'inner if', 'outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

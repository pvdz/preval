# Preval test case

# _base_neither_false.md

> If call if > Var trampo var trampo > Base neither false
>
> The if-call-if pattern is common and is probably a result from how we transform `||` and `&&`

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

## Settled


`````js filename=intro
if ($) {
  const x /*:unknown*/ = $(0);
  if (x) {
    const tmpReturnArg$3 /*:unknown*/ = $(`inner if`, x);
    $(tmpReturnArg$3, `outer`);
  } else {
    const tmpReturnArg$5 /*:unknown*/ = $(`inner else`, false);
    $(tmpReturnArg$5, `outer`);
  }
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  const x = $(0);
  if (x) {
    $($(`inner if`, x), `outer`);
  } else {
    $($(`inner else`, false), `outer`);
  }
}
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
  const tmpCalleeParam = outer();
  $(tmpCalleeParam, `outer`);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 0 );
  if (a) {
    const b = $( "inner if", a );
    $( b, "outer" );
  }
  else {
    const c = $( "inner else", false );
    $( c, "outer" );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 'inner else', false
 - 3: 'inner else', 'outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

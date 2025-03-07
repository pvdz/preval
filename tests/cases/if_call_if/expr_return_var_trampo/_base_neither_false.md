# Preval test case

# _base_neither_false.md

> If call if > Expr return var trampo > Base neither false
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
    f();
    return;
  } else {
    x = false;
    f();
    return;
  }
}
if ($) $(outer(), 'outer');
`````

## Settled


`````js filename=intro
if ($) {
  const x /*:unknown*/ = $(0);
  if (x) {
    $(`inner if`, x);
  } else {
    $(`inner else`, false);
  }
  $(undefined, `outer`);
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  const x = $(0);
  if (x) {
    $(`inner if`, x);
  } else {
    $(`inner else`, false);
  }
  $(undefined, `outer`);
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
    f();
    return;
  } else {
    x = false;
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
    f();
    return undefined;
  } else {
    x = false;
    f();
    return undefined;
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

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 'inner else', false
 - 3: undefined, 'outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

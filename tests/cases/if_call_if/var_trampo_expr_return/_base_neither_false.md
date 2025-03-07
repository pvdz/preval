# Preval test case

# _base_neither_false.md

> If call if > Var trampo expr return > Base neither false
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
    const tmpReturnArg = f();
    return tmpReturnArg;
  } else {
    x = false;
    const tmpReturnArg$1 = f();
    return tmpReturnArg$1;
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

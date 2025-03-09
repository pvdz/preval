# Preval test case

# _base_neither_true.md

> If call if > Expr return expr return > Base neither true
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
  const x /*:unknown*/ = $(1);
  if (x) {
    $(`inner if`, x);
    $(undefined, `outer`);
  } else {
    $(`inner else`, false);
    $(undefined, `outer`);
  }
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  const x = $(1);
  if (x) {
    $(`inner if`, x);
    $(undefined, `outer`);
  } else {
    $(`inner else`, false);
    $(undefined, `outer`);
  }
}
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
  const a = $( 1 );
  if (a) {
    $( "inner if", a );
    $( undefined, "outer" );
  }
  else {
    $( "inner else", false );
    $( undefined, "outer" );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 'inner if', 1
 - 3: undefined, 'outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

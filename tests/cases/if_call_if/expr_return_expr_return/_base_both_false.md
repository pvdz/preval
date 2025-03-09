# Preval test case

# _base_both_false.md

> If call if > Expr return expr return > Base both false
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
    const tmpClusterSSA_x /*:unknown*/ = $(2);
    if (tmpClusterSSA_x) {
      $(`inner if`, tmpClusterSSA_x);
      $(undefined, `outer`);
    } else {
      $(`inner else`, tmpClusterSSA_x);
      $(undefined, `outer`);
    }
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
  if ($(0)) {
    const tmpClusterSSA_x = $(2);
    if (tmpClusterSSA_x) {
      $(`inner if`, tmpClusterSSA_x);
      $(undefined, `outer`);
    } else {
      $(`inner else`, tmpClusterSSA_x);
      $(undefined, `outer`);
    }
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
      $(`inner if`, x);
      return undefined;
    } else {
      $(`inner else`, x);
      return undefined;
    }
  };
  if (x) {
    x = $(2);
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
    const b = $( 2 );
    if (b) {
      $( "inner if", b );
      $( undefined, "outer" );
    }
    else {
      $( "inner else", b );
      $( undefined, "outer" );
    }
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
 - 1: 0
 - 2: 'inner else', false
 - 3: undefined, 'outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

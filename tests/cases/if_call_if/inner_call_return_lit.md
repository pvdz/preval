# Preval test case

# inner_call_return_lit.md

> If call if > Inner call return lit
>
> The inner returning a literal should be inlinable

## Input

`````js filename=intro
function f() {
  function g() {
    if (x) {
      $('a');
      return 500;
    } else {
      $('b');
      return 1000;
    }
  }
  let x = $(1);
  if (x) {
    x = true;
    return g();
  } else {
    x = $(0);
    return g();
  }
}
if ($) $(f());
`````

## Settled


`````js filename=intro
if ($) {
  let tmpCalleeParam /*:unknown*/ = 500;
  const x /*:unknown*/ = $(1);
  if (x) {
    $(`a`);
  } else {
    const tmpClusterSSA_x /*:unknown*/ = $(0);
    let tmpReturnArg$1 /*:number*/ = 500;
    if (tmpClusterSSA_x) {
      $(`a`);
    } else {
      $(`b`);
      tmpReturnArg$1 = 1000;
    }
    tmpCalleeParam = tmpReturnArg$1;
  }
  $(tmpCalleeParam);
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  let tmpCalleeParam = 500;
  if ($(1)) {
    $(`a`);
  } else {
    const tmpClusterSSA_x = $(0);
    let tmpReturnArg$1 = 500;
    if (tmpClusterSSA_x) {
      $(`a`);
    } else {
      $(`b`);
      tmpReturnArg$1 = 1000;
    }
    tmpCalleeParam = tmpReturnArg$1;
  }
  $(tmpCalleeParam);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    if (x) {
      $(`a`);
      return 500;
    } else {
      $(`b`);
      return 1000;
    }
  };
  let x = $(1);
  if (x) {
    x = true;
    return g();
  } else {
    x = $(0);
    return g();
  }
};
if ($) $(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    if (x) {
      $(`a`);
      return 500;
    } else {
      $(`b`);
      return 1000;
    }
  };
  let x = $(1);
  if (x) {
    x = true;
    const tmpReturnArg = g();
    return tmpReturnArg;
  } else {
    x = $(0);
    const tmpReturnArg$1 = g();
    return tmpReturnArg$1;
  }
};
if ($) {
  const tmpCalleeParam = f();
  $(tmpCalleeParam);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
if ($) {
  let a = 500;
  const b = $( 1 );
  if (b) {
    $( "a" );
  }
  else {
    const c = $( 0 );
    let d = 500;
    if (c) {
      $( "a" );
    }
    else {
      $( "b" );
      d = 1000;
    }
    a = d;
  }
  $( a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 'a'
 - 3: 500
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

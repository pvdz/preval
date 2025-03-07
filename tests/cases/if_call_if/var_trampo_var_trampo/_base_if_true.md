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

## Settled


`````js filename=intro
if ($) {
  const x /*:unknown*/ = $(1);
  if (x) {
    const tmpClusterSSA_x /*:unknown*/ = $(2);
    if (tmpClusterSSA_x) {
      const tmpReturnArg /*:unknown*/ = $(`inner if`, tmpClusterSSA_x);
      $(tmpReturnArg, `outer`);
    } else {
      const tmpReturnArg$1 /*:unknown*/ = $(`inner else`, tmpClusterSSA_x);
      $(tmpReturnArg$1, `outer`);
    }
  } else {
    const tmpReturnArg$5 /*:unknown*/ = $(`inner else`, x);
    $(tmpReturnArg$5, `outer`);
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
    const tmpClusterSSA_x = $(2);
    if (tmpClusterSSA_x) {
      $($(`inner if`, tmpClusterSSA_x), `outer`);
    } else {
      $($(`inner else`, tmpClusterSSA_x), `outer`);
    }
  } else {
    $($(`inner else`, x), `outer`);
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

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'inner if', 2
 - 4: 'inner if', 'outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

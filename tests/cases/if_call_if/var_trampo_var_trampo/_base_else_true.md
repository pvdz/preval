# Preval test case

# _base_else_true.md

> If call if > Var trampo var trampo > Base else true
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
    return f();
  } else {
    x = $(2);
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
    const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(`inner if`, x);
    $(tmpClusterSSA_tmpCalleeParam, `outer`);
  } else {
    const tmpClusterSSA_x /*:unknown*/ = $(2);
    if (tmpClusterSSA_x) {
      const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(`inner if`, tmpClusterSSA_x);
      $(tmpClusterSSA_tmpCalleeParam$1, `outer`);
    } else {
      const tmpClusterSSA_tmpCalleeParam$3 /*:unknown*/ = $(`inner else`, tmpClusterSSA_x);
      $(tmpClusterSSA_tmpCalleeParam$3, `outer`);
    }
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
    $($(`inner if`, x), `outer`);
  } else {
    const tmpClusterSSA_x = $(2);
    if (tmpClusterSSA_x) {
      $($(`inner if`, tmpClusterSSA_x), `outer`);
    } else {
      $($(`inner else`, tmpClusterSSA_x), `outer`);
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 1 );
  if (a) {
    const b = $( "inner if", a );
    $( b, "outer" );
  }
  else {
    const c = $( 2 );
    if (c) {
      const d = $( "inner if", c );
      $( d, "outer" );
    }
    else {
      const e = $( "inner else", c );
      $( e, "outer" );
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

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
    const tmpReturnArg$3 = f();
    return tmpReturnArg$3;
  } else {
    x = $(2);
    const tmpReturnArg$5 = f();
    return tmpReturnArg$5;
  }
};
if ($) {
  let tmpCalleeParam = outer();
  $(tmpCalleeParam, `outer`);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'inner if', 1
 - 3: 'inner if', 'outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

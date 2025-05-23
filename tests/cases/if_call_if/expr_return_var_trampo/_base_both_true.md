# Preval test case

# _base_both_true.md

> If call if > Expr return var trampo > Base both true
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
  if ($(1)) {
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


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 1 );
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
 - 2: 2
 - 3: 'inner if', 2
 - 4: undefined, 'outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

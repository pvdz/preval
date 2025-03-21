# Preval test case

# _base_both_false.md

> If call if > Var trampo var trampo > Base both false
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
    x = $(2);
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
    const tmpClusterSSA_x /*:unknown*/ = $(2);
    if (tmpClusterSSA_x) {
      const tmpReturnArg /*:unknown*/ = $(`inner if`, tmpClusterSSA_x);
      $(tmpReturnArg, `outer`);
    } else {
      const tmpReturnArg$1 /*:unknown*/ = $(`inner else`, tmpClusterSSA_x);
      $(tmpReturnArg$1, `outer`);
    }
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
  if ($(0)) {
    const tmpClusterSSA_x = $(2);
    if (tmpClusterSSA_x) {
      $($(`inner if`, tmpClusterSSA_x), `outer`);
    } else {
      $($(`inner else`, tmpClusterSSA_x), `outer`);
    }
  } else {
    $($(`inner else`, false), `outer`);
  }
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
      const c = $( "inner if", b );
      $( c, "outer" );
    }
    else {
      const d = $( "inner else", b );
      $( d, "outer" );
    }
  }
  else {
    const e = $( "inner else", false );
    $( e, "outer" );
  }
}
`````


## Todos triggered


None


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

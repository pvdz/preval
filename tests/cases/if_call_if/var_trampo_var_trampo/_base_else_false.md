# Preval test case

# _base_else_false.md

> If call if > Var trampo var trampo > Base else false
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
    x = $(2);
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
  const x = $(0);
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
  const a = $( 0 );
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


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 2
 - 3: 'inner if', 2
 - 4: 'inner if', 'outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

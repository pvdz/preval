# Preval test case

# _base_if_true.md

> If call if > Expr return expr return > Base if true
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
    x = $(2);
    f();
    return;
  } else {
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
    $(`inner else`, x);
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
    const tmpClusterSSA_x = $(2);
    if (tmpClusterSSA_x) {
      $(`inner if`, tmpClusterSSA_x);
      $(undefined, `outer`);
    } else {
      $(`inner else`, tmpClusterSSA_x);
      $(undefined, `outer`);
    }
  } else {
    $(`inner else`, x);
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
    $( "inner else", a );
    $( undefined, "outer" );
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
 - 4: undefined, 'outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

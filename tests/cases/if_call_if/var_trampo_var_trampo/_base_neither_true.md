# Preval test case

# _base_neither_true.md

> If call if > Var trampo var trampo > Base neither true
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
    x = false;
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
    const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(`inner else`, false);
    $(tmpClusterSSA_tmpCalleeParam$1, `outer`);
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
    $($(`inner else`, false), `outer`);
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
    const c = $( "inner else", false );
    $( c, "outer" );
  }
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

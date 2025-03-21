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
  const x /*:unknown*/ = $(1);
  if (x) {
    $(`a`);
    $(500);
  } else {
    const tmpClusterSSA_x /*:unknown*/ = $(0);
    if (tmpClusterSSA_x) {
      $(`a`);
      $(500);
    } else {
      $(`b`);
      $(1000);
    }
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  if ($(1)) {
    $(`a`);
    $(500);
  } else {
    if ($(0)) {
      $(`a`);
      $(500);
    } else {
      $(`b`);
      $(1000);
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
    $( "a" );
    $( 500 );
  }
  else {
    const b = $( 0 );
    if (b) {
      $( "a" );
      $( 500 );
    }
    else {
      $( "b" );
      $( 1000 );
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
 - 1: 1
 - 2: 'a'
 - 3: 500
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

# Preval test case

# outer_var_only_used_inside_multi_shared.md

> Let hoisting > Outer var only used inside multi shared
>
> A variable that is declared in an outer scope but only used inside a scope without using its initial value is not a closure at all.

If we can detect that every read is invariantly preceded by a write then the initial value is irrelevant.

This one tests a branch with one shared write and a read in both.

## Input

`````js filename=intro
function f() {
  let x = undefined;
  function g() {
    x = $(1, 'shared');
    if ($) {
      $(x, 'a');
    } else {
      $(x, 'b');
    }
  }
  if ($) g();
}
if ($) f();
`````


## Settled


`````js filename=intro
if ($) {
  const tmpClusterSSA_x /*:unknown*/ = $(1, `shared`);
  if ($) {
    $(tmpClusterSSA_x, `a`);
  } else {
    $(tmpClusterSSA_x, `b`);
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  const tmpClusterSSA_x = $(1, `shared`);
  if ($) {
    $(tmpClusterSSA_x, `a`);
  } else {
    $(tmpClusterSSA_x, `b`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 1, "shared" );
  if ($) {
    $( a, "a" );
  }
  else {
    $( a, "b" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    x = $(1, `shared`);
    if ($) {
      $(x, `a`);
      return undefined;
    } else {
      $(x, `b`);
      return undefined;
    }
  };
  let x = undefined;
  if ($) {
    g();
    return undefined;
  } else {
    return undefined;
  }
};
if ($) {
  f();
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 'shared'
 - 2: 1, 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

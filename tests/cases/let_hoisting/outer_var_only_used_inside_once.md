# Preval test case

# outer_var_only_used_inside_once.md

> Let hoisting > Outer var only used inside once
>
> A variable that is declared in an outer scope but only used inside a scope without using its initial value is not a closure at all.

If we can detect that every read is invariantly preceded by a write then the initial value is irrelevant.

## Input

`````js filename=intro
function f() {
  let x = undefined;
  function g() {
    if ($) {
      x = $(1, 'a');
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
  const tmpssa3_x /*:unknown*/ = $(1, `a`);
  $(tmpssa3_x, `b`);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $($(1, `a`), `b`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 1, "a" );
  $( a, "b" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    if ($) {
      x = $(1, `a`);
      $(x, `b`);
      return undefined;
    } else {
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
 - 1: 1, 'a'
 - 2: 1, 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

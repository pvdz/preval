# Preval test case

# outer_var_only_used_inside_multi_each.md

> Let hoisting > Outer var only used inside multi each
>
> A variable that is declared in an outer scope but only used inside a scope without using its initial value is not a closure at all.

If we can detect that every read is invariantly preceded by a write then the initial value is irrelevant.

This one two branches each with a write and a read.

## Input

`````js filename=intro
function f() {
  let x = undefined;
  function g() {
    if ($) {
      x = $(1, 'a');
      $(x, 'b');
    } else {
      x = $(2, 'c');
      $(x, 'd');
    }
  }
  if ($) g();
}
if ($) f();
`````


## Settled


`````js filename=intro
if ($) {
  const tmpClusterSSA_tmpssa2_x /*:unknown*/ = $(1, `a`);
  $(tmpClusterSSA_tmpssa2_x, `b`);
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

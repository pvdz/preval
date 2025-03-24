# Preval test case

# outer_var_only_used_inside_multi_siblings.md

> Let hoisting > Outer var only used inside multi siblings
>
> A variable that is declared in an outer scope but only used inside a scope without using its initial value is not a closure at all.

If we can detect that every read is invariantly preceded by a write then the initial value is irrelevant.

This one has two occurrences in the same scope. The test makes sure we don't accidentally create two vars in the same scope.

## Input

`````js filename=intro
function f() {
  let x = undefined;
  function g() {
    x = $(1, 'a');
    $(x, 'b');

    x = $(2, 'c');
    $(x, 'd');
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
  const tmpClusterSSA_tmpssa3_x /*:unknown*/ = $(2, `c`);
  $(tmpClusterSSA_tmpssa3_x, `d`);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $($(1, `a`), `b`);
  $($(2, `c`), `d`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 1, "a" );
  $( a, "b" );
  const b = $( 2, "c" );
  $( b, "d" );
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
 - 3: 2, 'c'
 - 4: 2, 'd'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

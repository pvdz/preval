# Preval test case

# var_branch_write_read.md

> Assigns > Var branch write read
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
var x; // This can be dropped
x = $(1, 'before'); // This can become a let
if ($(2, 'if')) {
  x = $(3, 'then'); // Do not change into a constant until we extrapolate branching models
}
$(x, 'final');
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1, `before`);
const tmpIfTest /*:unknown*/ = $(2, `if`);
if (tmpIfTest) {
  const tmpClusterSSA_x /*:unknown*/ = $(3, `then`);
  $(tmpClusterSSA_x, `final`);
} else {
  $(x, `final`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1, `before`);
if ($(2, `if`)) {
  $($(3, `then`), `final`);
} else {
  $(x, `final`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1, "before" );
const b = $( 2, "if" );
if (b) {
  const c = $( 3, "then" );
  $( c, "final" );
}
else {
  $( a, "final" );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 'before'
 - 2: 2, 'if'
 - 3: 3, 'then'
 - 4: 3, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

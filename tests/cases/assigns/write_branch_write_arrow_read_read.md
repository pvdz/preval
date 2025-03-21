# Preval test case

# write_branch_write_arrow_read_read.md

> Assigns > Write branch write arrow read read
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
let x = $(1); // This decl should be eliminated
if ($(1)) {
  x = $(2, 'branch'); // This should get SSA'd
  const f = () => $(x, 'arrow');
  $(f(), 'result');
}
x = $(3, 'after'); // This should get SSA'd
$(x, 'final');
`````


## Settled


`````js filename=intro
$(1);
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpClusterSSA_x /*:unknown*/ = $(2, `branch`);
  const tmpCalleeParam /*:unknown*/ = $(tmpClusterSSA_x, `arrow`);
  $(tmpCalleeParam, `result`);
} else {
}
const tmpClusterSSA_x$1 /*:unknown*/ = $(3, `after`);
$(tmpClusterSSA_x$1, `final`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
if ($(1)) {
  $($($(2, `branch`), `arrow`), `result`);
}
$($(3, `after`), `final`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 1 );
if (a) {
  const b = $( 2, "branch" );
  const c = $( b, "arrow" );
  $( c, "result" );
}
const d = $( 3, "after" );
$( d, "final" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2, 'branch'
 - 4: 2, 'arrow'
 - 5: 2, 'result'
 - 6: 3, 'after'
 - 7: 3, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

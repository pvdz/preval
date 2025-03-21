# Preval test case

# yes__outer_used_in_one_scope_or_actually_no.md

> Binding > Promote const > Yes  outer used in one scope or actually no
>
> Can we inline hoisted vars

This shows why x cannot safely be SSA'd here...

This one shadows the other to see what happens when the func doesn't close over x.

## Input

`````js filename=intro
var x;
function g() {
  x = $('oops');
}
function f() {
  $("something");
  x = 100;
  if (g(1)) {
    $(x);
  }
  $(x);
  return x;
}
f();
`````


## Settled


`````js filename=intro
$(`something`);
const tmpClusterSSA_x /*:unknown*/ = $(`oops`);
$(tmpClusterSSA_x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`something`);
$($(`oops`));
`````


## PST Settled
With rename=true

`````js filename=intro
$( "something" );
const a = $( "oops" );
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'something'
 - 2: 'oops'
 - 3: 'oops'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

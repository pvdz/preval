# Preval test case

# basic_else_alias.md

> Ternary alias > Ai silly contrived > Basic else alias
>
> Basic: alias in else branch should NOT be replaced

## Input

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
if (x) {} else { b = a; }
$(b);
// Expect: No change, because b can be either undefined or a depending on the branch; aliasing is only safe if b = a in all branches.
`````


## Settled


`````js filename=intro
$(true);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
if (x) {
  $(b);
} else {
  b = a;
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

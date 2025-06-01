# Preval test case

# assigned_in_both_branches.md

> Ternary alias > Ai silly contrived > Assigned in both branches
>
> b assigned in both branches: should NOT replace

## Input

`````js filename=intro
let x = true;
let a = undefined;
let b = undefined;
if (x) { b = 1; } else { b = a; }
$(b);
// Expect: No change, b is not a pure alias
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = true;
let a = undefined;
let b = undefined;
if (x) {
  b = 1;
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
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

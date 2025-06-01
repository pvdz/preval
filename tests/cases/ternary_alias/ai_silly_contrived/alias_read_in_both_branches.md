# Preval test case

# alias_read_in_both_branches.md

> Ternary alias > Ai silly contrived > Alias read in both branches
>
> Read occurs in both branches

## Input

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
if (x) { $(b); } else { b = a; $(a); }
// Expect: No change, read occurs before assignment in one branch
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

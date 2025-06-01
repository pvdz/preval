# Preval test case

# alias_assigned_in_nested_block.md

> Ternary alias > Ai silly contrived > Alias assigned in nested block
>
> b assigned in a nested block: should NOT replace

## Input

`````js filename=intro
let x = true;
let a = undefined;
let b = undefined;
if (x) { { b = a; } }
$(b);
// Expect: No change, assignment in nested block is not safe
`````


## Settled


`````js filename=intro
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = true;
let a = undefined;
let b = undefined;
if (x) {
  b = a;
  $(a);
} else {
  $(b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

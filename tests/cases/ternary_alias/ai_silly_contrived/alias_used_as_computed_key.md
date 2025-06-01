# Preval test case

# alias_used_as_computed_key.md

> Ternary alias > Ai silly contrived > Alias used as computed key
>
> b is used as a computed property key: should NOT replace

## Input

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
if (x) {} else { b = a; }
let obj = { [b]: 1 };
// Expect: No change, computed property key context is not safe
`````


## Settled


`````js filename=intro
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
if (x) {
} else {
  b = a;
}
let obj = { [b]: 1 };
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

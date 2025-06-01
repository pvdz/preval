# Preval test case

# alias_used_in_conditional_expr.md

> Ternary alias > Ai silly contrived > Alias used in conditional expr
>
> b is used in a conditional expression: should NOT replace

## Input

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
if (x) {} else { b = a; }
let c = b ? 1 : 2;
// Expect: No change, conditional expression context is not safe
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
let c = undefined;
if (b) {
  c = 1;
} else {
  c = 2;
}
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

# Preval test case

# alias_used_in_logical_expr.md

> Ternary alias > Ai silly contrived > Alias used in logical expr
>
> b is used in a logical expression: should NOT replace

## Input

`````js filename=intro
let x = true;
let a = undefined;
let b = undefined;
if (x) {} else { b = a; }
let c = b && 42;
$(a, b);
// Expect: No change, logical expression context is not safe
`````


## Settled


`````js filename=intro
$(undefined, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined, undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined, undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = true;
let a = undefined;
let b = undefined;
if (x) {
} else {
  b = a;
}
let c = b;
if (c) {
  c = 42;
  $(a, b);
} else {
  $(a, b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

# Preval test case

# aliased_var_reassigned_after_if.md

> Ternary alias > Ai silly contrived > Aliased var reassigned after if
>
> a is reassigned after the if: should NOT replace

## Input

`````js filename=intro
let x = true;
let a = undefined;
let b = undefined;
if (x) {} else { b = a; }
a = 42;
$(b);
// Expect: No change, a is not stable after the if
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
} else {
  b = a;
}
a = 42;
$(b);
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

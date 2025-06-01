# Preval test case

# read_before_if.md

> Ternary alias > Ai silly contrived > Read before if
>
> Alias, but b is read before the if: should NOT replace

## Input

`````js filename=intro
let a = undefined;
let b = undefined;
let x = true;
$(b);
if (x) {} else { b = a; }
$(b);
// Expect: No change, because b is read before the if
`````


## Settled


`````js filename=intro
$(undefined);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let b = undefined;
let x = true;
$(b);
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
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

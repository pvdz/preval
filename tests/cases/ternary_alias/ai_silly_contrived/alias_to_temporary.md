# Preval test case

# alias_to_temporary.md

> Ternary alias > Ai silly contrived > Alias to temporary
>
> b assigned to a temporary/SSA: should NOT replace

## Input

`````js filename=intro
let b = undefined;
let x = true; let tmpSSA$1 = 123;
if (x) {} else { b = tmpSSA$1; }
$(b);
// Expect: No change, a is a temporary/SSA
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
let b = undefined;
let x = true;
let tmpSSA$1 = 123;
if (x) {
  $(b);
} else {
  b = tmpSSA$1;
  $(tmpSSA$1);
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

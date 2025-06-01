# Preval test case

# alias_to_global.md

> Ternary alias > Ai silly contrived > Alias to global
>
> b assigned to a global: should NOT replace

## Input

`````js filename=intro
let x = true;
let b = undefined;
if (x) {} else { b = window; }
$(b);
// Expect: No change, b is not a local alias
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
let b = undefined;
if (x) {
  $(b);
} else {
  b = window;
  $(window);
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

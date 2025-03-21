# Preval test case

# unused.md

> Normalize > Function > Decl > Unused
>
> An unused func decl should be removed

## Input

`````js filename=intro
let x = 1; // This can not be inlined as long as function f exists... but it is not used!
function f() {
  x = 2;
}
$(x);
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

# Preval test case

# switch_case.md

> Normalize > Pattern > Assignment > Switch case
>
> Scope of a switch block is shared between all cases so bindings need to be hoisted above it

## Input

`````js filename=intro
switch (0) {
  case 0:
    let a = 10;
    let b = 20;
    [a, b] = [30, 40];
    $(a, b);
}
`````


## Settled


`````js filename=intro
$(30, 40);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(30, 40);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 30, 40 );
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) inline computed array property read


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30, 40
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

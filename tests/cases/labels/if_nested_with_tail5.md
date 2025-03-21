# Preval test case

# if_nested_with_tail5.md

> Labels > If nested with tail5
>
> Make sure the labeled `if` doesn't screw up transforms

Just debugging a missing ident

## Input

`````js filename=intro
const f = function (x) {
  label3: {
    break label3;
  }
  return $(x);
};
f(1);
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

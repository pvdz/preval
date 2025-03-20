# Preval test case

# cross_case_scoping.md

> Normalize > Switch > Cross case scoping
>
> Normalize switches

Bindings created in one case may be accessed by cases that follow it

## Input

`````js filename=intro
switch (1) {
  case 1: let a = 1;
  case 2: $(a);
}
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

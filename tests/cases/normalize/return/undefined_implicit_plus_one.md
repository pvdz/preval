# Preval test case

# undefined_implicit_plus_one.md

> Normalize > Return > Undefined implicit plus one
>
> Implicitly returning undefined as the last statement is not necessary

## Input

`````js filename=intro
function f() {
  $(1);
  return;
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

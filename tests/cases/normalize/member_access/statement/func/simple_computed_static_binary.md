# Preval test case

# simple_computed_static_binary.md

> Normalize > Member access > Statement > Func > Simple computed static binary
>
> Member expressions with literal keys should be inlined. When they are static expressions they should still be normalized after normalization.

## Input

`````js filename=intro
function f() {
  const obj = {foo: 10};
  obj['fo' + 'o'];
}
$(f());
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

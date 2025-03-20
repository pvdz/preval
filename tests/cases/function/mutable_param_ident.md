# Preval test case

# mutable_param_ident.md

> Function > Mutable param ident
>
> Param names can be written to

## Input

`````js filename=intro
function f(a) {
  a = $(10);
  return a;
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(10);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(10));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

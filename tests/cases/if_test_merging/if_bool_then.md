# Preval test case

# if_bool_then.md

> If test merging > If bool then
>
> The $(true) and $(false) Should become $(t)
> Source: cases/ret_bool_after_if/compare_return.md

## Input

`````js filename=intro
const x = $(100);
const t = x <= 100;
if (t) {
  $(true);
} else {
  $(false);
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(100);
const t /*:boolean*/ = x <= 100;
$(t);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100) <= 100);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = a <= 100;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(100);
const t = x <= 100;
if (t) {
  $(true);
} else {
  $(false);
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

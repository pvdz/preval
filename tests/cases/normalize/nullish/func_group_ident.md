# Preval test case

# func_group_ident.md

> Normalize > Nullish > Func group ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
function f() {
  const a = {x: 1}
  const y = (1, a)??x
  return $(y);
}
$(f());
`````


## Settled


`````js filename=intro
const y /*:object*/ = { x: 1 };
const tmpReturnArg /*:unknown*/ = $(y);
$(tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($({ x: 1 }));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

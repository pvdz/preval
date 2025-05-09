# Preval test case

# func_group_literal.md

> Normalize > Optional > Func group literal
>
> We shouldn't transform member expressions on group ending in a literal

## Input

`````js filename=intro
function f() {
  const y = (1, 2, 3)?.foo
  return $(y);
}
$(f());
`````


## Settled


`````js filename=intro
const y /*:unknown*/ = $Number_prototype.foo;
const tmpReturnArg /*:unknown*/ = $(y);
$(tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($($Number_prototype.foo));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype.foo;
const b = $( a );
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

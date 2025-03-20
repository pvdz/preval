# Preval test case

# func_nested2.md

> Normalize > Optional > Func nested2
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: 1};
  return $(obj?.a);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpReturnArg /*:unknown*/ = $(1);
$(tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

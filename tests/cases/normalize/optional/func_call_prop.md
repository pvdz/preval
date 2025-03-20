# Preval test case

# func_call_prop.md

> Normalize > Optional > Func call prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  return $(parseInt(15)?.foo);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpChainElementObject /*:unknown*/ = (15).foo;
const tmpReturnArg /*:unknown*/ = $(tmpChainElementObject);
$(tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($((15).foo));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 15.foo;
const b = $( a );
$( b );
`````


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

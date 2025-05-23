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
const tmpCalleeParam /*:unknown*/ = $Number_prototype.foo;
const tmpReturnArg /*:unknown*/ = $(tmpCalleeParam);
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

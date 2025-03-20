# Preval test case

# return_sequence_prop.md

> Normalize > Sequence > Return sequence prop
>
> Returning a member express on a sequence

## Input

`````js filename=intro
function f() {
  return ($(1), $(2)).foo
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
const tmpCompObj /*:unknown*/ = $(2);
const tmpReturnArg /*:unknown*/ = tmpCompObj.foo;
$(tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$($(2).foo);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
const b = a.foo;
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

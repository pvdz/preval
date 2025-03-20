# Preval test case

# func_ident.md

> Normalize > Nullish > Func ident
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  return $("foo"??foo);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpReturnArg /*:unknown*/ = $(`foo`);
$(tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`foo`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "foo" );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'foo'
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

# Preval test case

# return_string_tostring.md

> Function > Return string tostring
>
> A function that returns Date.now()

The function is assumed to be pure (no observable side effects) but still not inlinable, although Date.now() is probably insufficient to stop this.

## Input

`````js filename=intro
function f() {
  return String.toString();
}
$(f());
`````


## Settled


`````js filename=intro
$(`function String() { [native code] }`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`function String() { [native code] }`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "function String() { [native code] }" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'function() { [native code] }'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

# Preval test case

# coerce_array_flat.md

> Builtins cases > Coerce array flat
>
>

## Input

`````js filename=intro
const method = [].flat;
const x = $coerce(method, 'plustr')
$(x);
`````

## Settled


`````js filename=intro
$(`function flat() { [native code] }`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`function flat() { [native code] }`);
`````

## Pre Normal


`````js filename=intro
const method = [].flat;
const x = $coerce(method, `plustr`);
$(x);
`````

## Normalized


`````js filename=intro
const tmpCompObj = [];
const method = tmpCompObj.flat;
const x = $coerce(method, `plustr`);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "function flat() { [native code] }" );
`````

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

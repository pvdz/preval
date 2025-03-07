# Preval test case

# base_var.md

> Normalize > Export > Named > Base var
>
> Exporting declarations

## Input

`````js filename=intro
export var foo = 10;
$(foo);
`````

## Settled


`````js filename=intro
$(10);
const foo /*:number*/ = 10;
export { foo };
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
const foo = 10;
export { foo };
`````

## Pre Normal


`````js filename=intro
let foo = undefined;
foo = 10;
$(foo);
export { foo };
`````

## Normalized


`````js filename=intro
let foo = undefined;
foo = 10;
$(foo);
export { foo };
`````

## PST Settled
With rename=true

`````js filename=intro
$( 10 );
const a = 10;
export { a as foo };
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

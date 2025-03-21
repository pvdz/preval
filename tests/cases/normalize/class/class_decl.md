# Preval test case

# class_decl.md

> Normalize > Class > Class decl
>
> Class decls should become expressions

## Input

`````js filename=intro
class x {}
$(x);
`````

## Settled


`````js filename=intro
const x /*:class*/ = class {};
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(class {});
`````

## Pre Normal


`````js filename=intro
let x = class {};
$(x);
`````

## Normalized


`````js filename=intro
let x = class {};
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = class   {

};
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

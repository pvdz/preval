# Preval test case

# class_expr_stmt_extends.md

> Normalize > Class > Class expr stmt extends
>
> Class expression as a statement (possible as we can see here, not the same as a decl), should be dropped entirely.

## Input

`````js filename=intro
(class x extends $(Number) {});
`````

## Settled


`````js filename=intro
$(Number);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(Number);
`````

## Pre Normal


`````js filename=intro
(class x extends $(Number) {});
`````

## Normalized


`````js filename=intro
const tmpClassSuper = $(Number);
`````

## PST Settled
With rename=true

`````js filename=intro
$( Number );
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

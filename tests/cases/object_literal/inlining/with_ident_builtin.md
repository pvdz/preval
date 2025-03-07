# Preval test case

# with_ident_builtin.md

> Object literal > Inlining > With ident builtin
>
>

## Input

`````js filename=intro
const obj = {f: Array};
$(obj.f);
`````

## Settled


`````js filename=intro
$(Array);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(Array);
`````

## Pre Normal


`````js filename=intro
const obj = { f: Array };
$(obj.f);
`````

## Normalized


`````js filename=intro
const obj = { f: Array };
const tmpCalleeParam = obj.f;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( Array );
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

# Preval test case

# null_prop_reg.md

> Normalize > Static expressions > Statement > Null prop reg
>
> Property on null should cause the remainder to be DCE

## Input

`````js filename=intro
$(null.foo);
$('fail, DCE me');
`````

## Settled


`````js filename=intro
null.foo;
throw `[Preval]: Can not reach here`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
null.foo;
throw `[Preval]: Can not reach here`;
`````

## Pre Normal


`````js filename=intro
$(null.foo);
$(`fail, DCE me`);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = null.foo;
throw `[Preval]: Can not reach here`;
`````

## PST Settled
With rename=true

`````js filename=intro
null.foo;
throw "[Preval]: Can not reach here";
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

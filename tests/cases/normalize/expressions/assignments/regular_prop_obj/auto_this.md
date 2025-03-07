# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto this
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = this).a;
$(a);
`````

## Settled


`````js filename=intro
undefined.a;
throw `[Preval]: Can not reach here`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
undefined.a;
throw `[Preval]: Can not reach here`;
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = undefined).a;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
a = undefined;
let tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
undefined.a;
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

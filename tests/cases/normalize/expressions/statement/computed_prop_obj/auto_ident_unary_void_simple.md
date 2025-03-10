# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Statement > Computed prop obj > Auto ident unary void simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
let obj = {};
(void arg)["a"];
$(a, arg);
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
let arg = 1;
let a = { a: 999, b: 1000 };
let obj = {};
(void arg)[`a`];
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = undefined;
tmpCompObj.a;
$(a, arg);
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
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = void $(100))];
$(a);
`````

## Settled


`````js filename=intro
$(100);
$Object_prototype.undefined;
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$Object_prototype.undefined;
$(undefined);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = void $(100))];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
$(100);
a = undefined;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$Object_prototype.undefined;
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

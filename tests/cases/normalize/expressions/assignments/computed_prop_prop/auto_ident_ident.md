# Preval test case

# auto_ident_ident.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = b)];
$(a, b);
`````

## Settled


`````js filename=intro
const obj /*:object*/ = {};
obj[1];
$(1, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
({}[1]);
$(1, 1);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = b)];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
a = b;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {};
a[ 1 ];
$( 1, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

# Preval test case

# auto_ident_computed_simple_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident computed simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = b["c"])];
$(a, b);
`````

## Settled


`````js filename=intro
const obj /*:object*/ = {};
obj[1];
const b /*:object*/ = { c: 1 };
$(1, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
({}[1]);
$(1, { c: 1 });
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = b[`c`])];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
a = b.c;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {};
a[ 1 ];
const b = { c: 1 };
$( 1, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = !$(100))];
$(a);
`````

## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const obj /*:object*/ = {};
const a /*:boolean*/ = !tmpUnaryArg;
obj[a];
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
const obj = {};
const a = !tmpUnaryArg;
obj[a];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = !$(100))];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpUnaryArg = $(100);
a = !tmpUnaryArg;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = {};
const c = !a;
b[ c ];
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

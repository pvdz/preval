# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = $(b))];
$(a, b);
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
const obj /*:object*/ = {};
obj[a];
$(a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1);
({}[a]);
$(a, 1);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = $(b))];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
a = $(b);
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = {};
b[ a ];
$( a, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

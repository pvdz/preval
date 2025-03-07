# Preval test case

# auto_ident_unary_minus_simple.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto ident unary minus simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
let obj = {};
(a = -arg).a;
$(a, arg);
`````

## Settled


`````js filename=intro
(-1).a;
$(-1, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
(-1).a;
$(-1, 1);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let obj = {};
(a = -arg).a;
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let obj = {};
a = -arg;
let tmpCompObj = a;
tmpCompObj.a;
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
-1.a;
$( -1, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: -1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

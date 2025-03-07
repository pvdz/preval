# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto ident s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
let obj = {};
(a = ($(1), $(2), x)).a;
$(a, x);
`````

## Settled


`````js filename=intro
$(1);
$(2);
(1).a;
$(1, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
(1).a;
$(1, 1);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let obj = {};
(a = ($(1), $(2), x)).a;
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let obj = {};
$(1);
$(2);
a = x;
let tmpCompObj = a;
tmpCompObj.a;
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
1.a;
$( 1, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident unary excl simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = !arg)];
$(a, arg);
`````

## Settled


`````js filename=intro
$Object_prototype.false;
$(false, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$Object_prototype.false;
$(false, 1);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = !arg)];
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
a = !arg;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
$Object_prototype.false;
$( false, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: false, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

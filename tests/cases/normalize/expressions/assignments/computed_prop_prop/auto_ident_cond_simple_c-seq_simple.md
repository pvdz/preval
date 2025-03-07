# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident cond simple c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = 1 ? (40, 50, $(60)) : $($(100)))];
$(a);
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $(60);
const obj /*:object*/ = {};
obj[a];
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(60);
({}[a]);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = 1 ? (40, 50, $(60)) : $($(100)))];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
a = $(60);
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 60 );
const b = {};
b[ a ];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 60
 - 2: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

# Preval test case

# auto_ident_array_complex2.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident array complex2
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
const obj = {};
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const a = [ tmpArrElement, 2, tmpArrElement$3 ];
obj[a];
$(a);

`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(1);
const tmpArrElement$3 /*:unknown*/ = $(3);
const a /*:array*/ /*truthy*/ = [tmpArrElement, 2, tmpArrElement$3];
$coerce(a, `string`);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const a = [tmpArrElement, 2, tmpArrElement$3];
String(a);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = [ a, 2, b ];
$coerce( c, "string" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = {};
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const a = [tmpArrElement, 2, tmpArrElement$3];
obj[a];
$(a);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) what other ways do member expressions still appear? ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

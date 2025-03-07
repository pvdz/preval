# Preval test case

# computed_prop.md

> Expr order > Computed prop
>
> The object is evaluated before the computed property

## Input

`````js filename=intro
$(1)[$(2)];
`````

## Settled


`````js filename=intro
const tmpCompObj /*:unknown*/ = $(1);
const tmpCompProp /*:unknown*/ = $(2);
tmpCompObj[tmpCompProp];
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompObj = $(1);
const tmpCompProp = $(2);
tmpCompObj[tmpCompProp];
`````

## Pre Normal


`````js filename=intro
$(1)[$(2)];
`````

## Normalized


`````js filename=intro
const tmpCompObj = $(1);
const tmpCompProp = $(2);
tmpCompObj[tmpCompProp];
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
a[ b ];
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

# Preval test case

# group_literal.md

> Normalize > Member access > Call arg > Group literal
>
> We shouldn't transform member expressions on group ending in a literal

## Input

`````js filename=intro
$(($(1), 2).foo);
`````

## Settled


`````js filename=intro
$(1);
const tmpCalleeParam /*:unknown*/ = (2).foo;
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$((2).foo);
`````

## Pre Normal


`````js filename=intro
$(($(1), 2).foo);
`````

## Normalized


`````js filename=intro
$(1);
const tmpCompObj = 2;
const tmpCalleeParam = tmpCompObj.foo;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = 2.foo;
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

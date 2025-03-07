# Preval test case

# postfix_plus_unknown.md

> Normalize > Update > Postfix plus unknown
>
> Update expressions should be transformed to regular binary expression assignments

## Input

`````js filename=intro
let x = $(1);
$(x++);
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
x + 0;
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
x + 0;
$(x);
`````

## Pre Normal


`````js filename=intro
let x = $(1);
$(x++);
`````

## Normalized


`````js filename=intro
let x = $(1);
const tmpPostUpdArgIdent = x;
x = x + 1;
const tmpCalleeParam = tmpPostUpdArgIdent;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
a + 0;
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

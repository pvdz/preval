# Preval test case

# prefix_plus_unknown.md

> Normalize > Update > Prefix plus unknown
>
> Update expressions should be transformed to regular binary expression assignments

## Input

`````js filename=intro
let x = $(1);
$(++x);
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const tmpPostUpdArgIdent /*:number*/ = $coerce(x, `number`);
const tmpClusterSSA_x /*:number*/ = tmpPostUpdArgIdent + 1;
$(tmpClusterSSA_x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($coerce($(1), `number`) + 1);
`````

## Pre Normal


`````js filename=intro
let x = $(1);
$(++x);
`````

## Normalized


`````js filename=intro
let x = $(1);
const tmpPostUpdArgIdent = $coerce(x, `number`);
x = tmpPostUpdArgIdent + 1;
const tmpCalleeParam = x;
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $coerce( a, "number" );
const c = b + 1;
$( c );
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

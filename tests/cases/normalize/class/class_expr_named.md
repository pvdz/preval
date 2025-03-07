# Preval test case

# class_expr_named.md

> Normalize > Class > Class expr named
>
> Class expression base

## Input

`````js filename=intro
let a = class x {}
$(a, x);
`````

## Settled


`````js filename=intro
const a /*:class*/ = class x {};
$(a, x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(class x {}, x);
`````

## Pre Normal


`````js filename=intro
let a = class x {};
$(a, x);
`````

## Normalized


`````js filename=intro
let a = class x {};
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = class x  {

};
$( a, x );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

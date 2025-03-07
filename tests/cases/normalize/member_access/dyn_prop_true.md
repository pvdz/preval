# Preval test case

# dyn_prop_true.md

> Normalize > Member access > Dyn prop true
>
> Dynamic property access with ident-like string. This one is not an ident.

## Input

`````js filename=intro
const a = {};
$(a['true']);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $Object_prototype.true;
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Object_prototype.true);
`````

## Pre Normal


`````js filename=intro
const a = {};
$(a[`true`]);
`````

## Normalized


`````js filename=intro
const a = {};
const tmpCalleeParam = a.true;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.true;
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

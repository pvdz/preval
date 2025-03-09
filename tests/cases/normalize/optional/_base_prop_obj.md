# Preval test case

# _base_prop_obj.md

> Normalize > Optional > Base prop obj
>
> Simple example

## Input

`````js filename=intro
var f = {x: 10};
$(f?.x);
`````

## Settled


`````js filename=intro
$(10);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
`````

## Pre Normal


`````js filename=intro
let f = undefined;
f = { x: 10 };
$(f?.x);
`````

## Normalized


`````js filename=intro
let f = undefined;
f = { x: 10 };
let tmpCalleeParam = undefined;
const tmpChainRootProp = f;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpCalleeParam = tmpChainElementObject;
  $(tmpChainElementObject);
} else {
  $(tmpCalleeParam);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 10 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

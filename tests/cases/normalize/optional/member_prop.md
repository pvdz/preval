# Preval test case

# member_prop.md

> Normalize > Optional > Member prop
>
> Optional chaining fun

## Input

`````js filename=intro
const x = 10;
$(x?.length);
`````

## Settled


`````js filename=intro
const tmpChainElementObject /*:unknown*/ = (10).length;
$(tmpChainElementObject);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$((10).length);
`````

## Pre Normal


`````js filename=intro
const x = 10;
$(x?.length);
`````

## Normalized


`````js filename=intro
const x = 10;
let tmpCalleeParam = undefined;
const tmpChainRootProp = x;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.length;
  tmpCalleeParam = tmpChainElementObject;
} else {
}
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 10.length;
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

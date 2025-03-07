# Preval test case

# empty_string_prop.md

> Normalize > Optional > Empty string prop
>
> Empty string should make `?.` to return undefined.

## Input

`````js filename=intro
$(''?.length);
`````

## Settled


`````js filename=intro
$(0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````

## Pre Normal


`````js filename=intro
$(``?.length);
`````

## Normalized


`````js filename=intro
let tmpCalleeParam = undefined;
const tmpChainRootProp = ``;
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
$( 0 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

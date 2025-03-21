# Preval test case

# false_prop.md

> Normalize > Optional > False prop
>
> Empty string should make `?.` to return undefined.

## Input

`````js filename=intro
$(false?.toString());
`````

## Settled


`````js filename=intro
$(`false`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`false`);
`````

## Pre Normal


`````js filename=intro
$(false?.toString());
`````

## Normalized


`````js filename=intro
let tmpCalleeParam = undefined;
const tmpChainRootProp = false;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootProp.toString();
  tmpCalleeParam = tmpChainElementCall;
  $(tmpChainElementCall);
} else {
  $(tmpCalleeParam);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( "false" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'false'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

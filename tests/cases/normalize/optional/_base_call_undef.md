# Preval test case

# _base_call_undef.md

> Normalize > Optional > Base call undef
>
> Simple example

## Input

`````js filename=intro
var f = undefined;
$(f?.());
`````

## Settled


`````js filename=intro
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = undefined;
f = undefined;
$(f?.());
`````

## Normalized


`````js filename=intro
let f = undefined;
f = undefined;
let tmpCalleeParam = undefined;
const tmpChainRootCall = f;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall();
  tmpCalleeParam = tmpChainElementCall;
} else {
}
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
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

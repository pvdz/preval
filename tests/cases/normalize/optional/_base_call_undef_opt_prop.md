# Preval test case

# _base_call_undef_opt_prop.md

> Normalize > Optional > Base call undef opt prop
>
> Simple example

## Input

`````js filename=intro
var a = undefined;
$(a?.b());
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
let a = undefined;
a = undefined;
$(a?.b());
`````

## Normalized


`````js filename=intro
let a = undefined;
a = undefined;
let tmpCalleeParam = undefined;
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootProp.b();
  tmpCalleeParam = tmpChainElementCall;
  $(tmpChainElementCall);
} else {
  $(tmpCalleeParam);
}
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

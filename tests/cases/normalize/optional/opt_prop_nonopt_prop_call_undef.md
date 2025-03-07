# Preval test case

# opt_prop_nonopt_prop_call_undef.md

> Normalize > Optional > Opt prop nonopt prop call undef
>
> Make sure this works properly

## Input

`````js filename=intro
const a = undefined;
a?.b.c(1);
`````

## Settled


`````js filename=intro

`````

## Denormalized
(This ought to be the final result)

`````js filename=intro

`````

## Pre Normal


`````js filename=intro
const a = undefined;
a?.b.c(1);
`````

## Normalized


`````js filename=intro
const a = undefined;
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementCall = tmpChainElementObject.c(1);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro

`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

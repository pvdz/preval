# Preval test case

# opt_prop_nonopt_prop_pass.md

> Normalize > Optional > Opt prop nonopt prop pass
>
> Make sure this works properly

## Input

`````js filename=intro
const a = {b: {c: 100}};
$(a?.b.c);
`````

## Settled


`````js filename=intro
$(100);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
`````

## Pre Normal


`````js filename=intro
const a = { b: { c: 100 } };
$(a?.b.c);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { c: 100 };
const a = { b: tmpObjLitVal };
let tmpCalleeParam = undefined;
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  tmpCalleeParam = tmpChainElementObject$1;
  $(tmpChainElementObject$1);
} else {
  $(tmpCalleeParam);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 100 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

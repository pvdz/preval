# Preval test case

# opt_prop_nonopt_prop_undef_c.md

> Normalize > Optional > Opt prop nonopt prop undef c
>
> Make sure this works properly

## Input

`````js filename=intro
const a = {b: {}};
$(a?.b.c);
`````

## Settled


`````js filename=intro
const tmpChainElementObject$1 /*:unknown*/ = $Object_prototype.c;
$(tmpChainElementObject$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Object_prototype.c);
`````

## Pre Normal


`````js filename=intro
const a = { b: {} };
$(a?.b.c);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = {};
const a = { b: tmpObjLitVal };
let tmpCalleeParam = undefined;
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  tmpCalleeParam = tmpChainElementObject$1;
} else {
}
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.c;
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

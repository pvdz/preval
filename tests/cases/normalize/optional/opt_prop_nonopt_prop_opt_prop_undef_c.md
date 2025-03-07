# Preval test case

# opt_prop_nonopt_prop_opt_prop_undef_c.md

> Normalize > Optional > Opt prop nonopt prop opt prop undef c
>
> Make sure this works properly

## Input

`````js filename=intro
const a = {b: {}};
$(a?.b.c?.d);
`````

## Settled


`````js filename=intro
const tmpChainElementObject$1 /*:unknown*/ = $Object_prototype.c;
const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject$1 == null;
if (tmpIfTest$1) {
  $(undefined);
} else {
  const tmpChainElementObject$3 /*:unknown*/ = tmpChainElementObject$1.d;
  $(tmpChainElementObject$3);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementObject$1 = $Object_prototype.c;
if (tmpChainElementObject$1 == null) {
  $(undefined);
} else {
  $(tmpChainElementObject$1.d);
}
`````

## Pre Normal


`````js filename=intro
const a = { b: {} };
$(a?.b.c?.d);
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
  const tmpIfTest$1 = tmpChainElementObject$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$3 = tmpChainElementObject$1.d;
    tmpCalleeParam = tmpChainElementObject$3;
  } else {
  }
} else {
}
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.c;
const b = a == null;
if (b) {
  $( undefined );
}
else {
  const c = a.d;
  $( c );
}
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

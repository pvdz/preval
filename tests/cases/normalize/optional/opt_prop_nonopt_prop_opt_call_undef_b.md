# Preval test case

# opt_prop_nonopt_prop_opt_call_undef_b.md

> Normalize > Optional > Opt prop nonopt prop opt call undef b
>
> Make sure this works properly

## Input

`````js filename=intro
const a = {};
a?.b.c?.(1);
`````

## Settled


`````js filename=intro
const tmpChainElementObject /*:unknown*/ = $Object_prototype.b;
const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject.c;
const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject$1 == null;
if (tmpIfTest$1) {
} else {
  $dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementObject = $Object_prototype.b;
const tmpChainElementObject$1 = tmpChainElementObject.c;
if (!(tmpChainElementObject$1 == null)) {
  $dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 1);
}
`````

## Pre Normal


`````js filename=intro
const a = {};
a?.b.c?.(1);
`````

## Normalized


`````js filename=intro
const a = {};
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpIfTest$1 = tmpChainElementObject$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = $dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 1);
  } else {
  }
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.b;
const b = a.c;
const c = b == null;
if (c) {

}
else {
  $dotCall( b, a, "c", 1 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

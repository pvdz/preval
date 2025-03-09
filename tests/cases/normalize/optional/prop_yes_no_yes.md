# Preval test case

# prop_yes_no_yes.md

> Normalize > Optional > Prop yes no yes
>
> Mix optional with regular member expressions

This should crash because `a?.` will pass

And then `a.b.c` is an unconditional access of `c` on `undefined`.

## Input

`````js filename=intro
const a = {};
$(a?.b.c?.d);
`````

## Settled


`````js filename=intro
const tmpChainElementObject /*:unknown*/ = $Object_prototype.b;
const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject.c;
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
const tmpChainElementObject$1 = $Object_prototype.b.c;
if (tmpChainElementObject$1 == null) {
  $(undefined);
} else {
  $(tmpChainElementObject$1.d);
}
`````

## Pre Normal


`````js filename=intro
const a = {};
$(a?.b.c?.d);
`````

## Normalized


`````js filename=intro
const a = {};
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
    $(tmpChainElementObject$3);
  } else {
    $(tmpCalleeParam);
  }
} else {
  $(tmpCalleeParam);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.b;
const b = a.c;
const c = b == null;
if (c) {
  $( undefined );
}
else {
  const d = b.d;
  $( d );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

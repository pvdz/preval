# Preval test case

# prop_no_yes_yes.md

> Normalize > Optional > Prop no yes yes
>
> Mix optional with regular member expressions

## Input

`````js filename=intro
const a = {};
$(a.b?.c?.d);
`````

## Settled


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = undefined;
const tmpChainElementObject /*:unknown*/ = $Object_prototype.b;
const tmpIfTest /*:boolean*/ = tmpChainElementObject == null;
if (tmpIfTest) {
} else {
  const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject.c;
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject$1 == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainElementObject$3 /*:unknown*/ = tmpChainElementObject$1.d;
    tmpCalleeParam = tmpChainElementObject$3;
  }
}
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam = undefined;
const tmpChainElementObject = $Object_prototype.b;
if (!(tmpChainElementObject == null)) {
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  if (!(tmpChainElementObject$1 == null)) {
    tmpCalleeParam = tmpChainElementObject$1.d;
  }
}
$(tmpCalleeParam);
`````

## Pre Normal


`````js filename=intro
const a = {};
$(a.b?.c?.d);
`````

## Normalized


`````js filename=intro
const a = {};
let tmpCalleeParam = undefined;
const tmpChainRootProp = a;
const tmpChainElementObject = tmpChainRootProp.b;
const tmpIfTest = tmpChainElementObject != null;
if (tmpIfTest) {
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
let a = undefined;
const b = $Object_prototype.b;
const c = b == null;
if (c) {

}
else {
  const d = b.c;
  const e = d == null;
  if (e) {

  }
  else {
    const f = d.d;
    a = f;
  }
}
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

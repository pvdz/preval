# Preval test case

# prop_yes_yes_yes.md

> Normalize > Optional > Prop yes yes yes
>
> Mix optional with regular member expressions

## Input

`````js filename=intro
const a = {};
$(a?.b?.c?.d);
`````


## Settled


`````js filename=intro
const tmpChainElementObject /*:unknown*/ = $Object_prototype.b;
const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject == null;
if (tmpIfTest$1) {
  $(undefined);
} else {
  const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject.c;
  const tmpIfTest$3 /*:boolean*/ = tmpChainElementObject$1 == null;
  if (tmpIfTest$3) {
    $(undefined);
  } else {
    const tmpChainElementObject$3 /*:unknown*/ = tmpChainElementObject$1.d;
    $(tmpChainElementObject$3);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementObject = $Object_prototype.b;
if (tmpChainElementObject == null) {
  $(undefined);
} else {
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  if (tmpChainElementObject$1 == null) {
    $(undefined);
  } else {
    $(tmpChainElementObject$1.d);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.b;
const b = a == null;
if (b) {
  $( undefined );
}
else {
  const c = a.c;
  const d = c == null;
  if (d) {
    $( undefined );
  }
  else {
    const e = c.d;
    $( e );
  }
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

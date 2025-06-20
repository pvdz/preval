# Preval test case

# prop_yes_no_no.md

> Normalize > Optional > Prop yes no no
>
> Mix optional with regular member expressions

## Input

`````js filename=intro
const a = {};
$(a?.b.c.d);
`````


## Settled


`````js filename=intro
const tmpChainElementObject /*:unknown*/ = $Object_prototype.b;
const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject.c;
const tmpChainElementObject$3 /*:unknown*/ = tmpChainElementObject$1.d;
$(tmpChainElementObject$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Object_prototype.b.c.d);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.b;
const b = a.c;
const c = b.d;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = {};
let tmpCalleeParam = undefined;
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpChainElementObject$3 = tmpChainElementObject$1.d;
  tmpCalleeParam = tmpChainElementObject$3;
  $(tmpChainElementObject$3);
} else {
  $(tmpCalleeParam);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

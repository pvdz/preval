# Preval test case

# ignored_init_undefined.md

> Type tracked > Ignored init undefined
>
> Updating a binding such that the initial value isn't read allows for a trick that
> improves our internal typing information on that binding in some cases.

I actually don't know what side effect results in null that preval can't predict.

## Input

`````js filename=intro
let itooamanumberjack /*:primitive*/ = false;
if (imanumberandilovethrees) {
  itooamanumberjack = $(1)?.x; // null or undefined...
} else {
  itooamanumberjack = $(2)?.x;
}
if (itooamanumberjack) {
  $('a', itooamanumberjack);
} else {
  $('b', itooamanumberjack);
}
`````


## Settled


`````js filename=intro
imanumberandilovethrees;
let tmpClusterSSA_itooamanumberjack /*:unknown*/ /*ternaryConst*/ = undefined;
if (imanumberandilovethrees) {
  const tmpChainElementCall /*:unknown*/ = $(1);
  const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
  if (tmpIfTest) {
  } else {
    tmpClusterSSA_itooamanumberjack = tmpChainElementCall.x;
  }
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $(2);
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall$1 == null;
  if (tmpIfTest$1) {
  } else {
    tmpClusterSSA_itooamanumberjack = tmpChainElementCall$1.x;
  }
}
if (tmpClusterSSA_itooamanumberjack) {
  $(`a`, tmpClusterSSA_itooamanumberjack);
} else {
  $(`b`, tmpClusterSSA_itooamanumberjack);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
imanumberandilovethrees;
let tmpClusterSSA_itooamanumberjack = undefined;
if (imanumberandilovethrees) {
  const tmpChainElementCall = $(1);
  if (!(tmpChainElementCall == null)) {
    tmpClusterSSA_itooamanumberjack = tmpChainElementCall.x;
  }
} else {
  const tmpChainElementCall$1 = $(2);
  if (!(tmpChainElementCall$1 == null)) {
    tmpClusterSSA_itooamanumberjack = tmpChainElementCall$1.x;
  }
}
if (tmpClusterSSA_itooamanumberjack) {
  $(`a`, tmpClusterSSA_itooamanumberjack);
} else {
  $(`b`, tmpClusterSSA_itooamanumberjack);
}
`````


## PST Settled
With rename=true

`````js filename=intro
imanumberandilovethrees;
let a = undefined;
if (imanumberandilovethrees) {
  const b = $( 1 );
  const c = b == null;
  if (c) {

  }
  else {
    a = b.x;
  }
}
else {
  const d = $( 2 );
  const e = d == null;
  if (e) {

  }
  else {
    a = d.x;
  }
}
if (a) {
  $( "a", a );
}
else {
  $( "b", a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let itooamanumberjack = false;
if (imanumberandilovethrees) {
  itooamanumberjack = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = $(1);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainElementCall.x;
    itooamanumberjack = tmpChainElementObject;
  } else {
  }
} else {
  itooamanumberjack = undefined;
  const tmpChainRootCall$1 = $;
  const tmpChainElementCall$1 = $(2);
  const tmpIfTest$1 = tmpChainElementCall$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainElementCall$1.x;
    itooamanumberjack = tmpChainElementObject$1;
  } else {
  }
}
if (itooamanumberjack) {
  $(`a`, itooamanumberjack);
} else {
  $(`b`, itooamanumberjack);
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

imanumberandilovethrees


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

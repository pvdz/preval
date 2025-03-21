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
let itooamanumberjack /*:unknown*/ = undefined;
if (imanumberandilovethrees) {
  const tmpChainElementCall /*:unknown*/ = $(1);
  const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
  if (tmpIfTest) {
  } else {
    const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.x;
    itooamanumberjack = tmpChainElementObject;
  }
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $(2);
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall$1 == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementCall$1.x;
    itooamanumberjack = tmpChainElementObject$1;
  }
}
if (itooamanumberjack) {
  $(`a`, itooamanumberjack);
} else {
  $(`b`, itooamanumberjack);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let itooamanumberjack = undefined;
if (imanumberandilovethrees) {
  const tmpChainElementCall = $(1);
  if (!(tmpChainElementCall == null)) {
    itooamanumberjack = tmpChainElementCall.x;
  }
} else {
  const tmpChainElementCall$1 = $(2);
  if (!(tmpChainElementCall$1 == null)) {
    itooamanumberjack = tmpChainElementCall$1.x;
  }
}
if (itooamanumberjack) {
  $(`a`, itooamanumberjack);
} else {
  $(`b`, itooamanumberjack);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
if (imanumberandilovethrees) {
  const b = $( 1 );
  const c = b == null;
  if (c) {

  }
  else {
    const d = b.x;
    a = d;
  }
}
else {
  const e = $( 2 );
  const f = e == null;
  if (f) {

  }
  else {
    const g = e.x;
    a = g;
  }
}
if (a) {
  $( "a", a );
}
else {
  $( "b", a );
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

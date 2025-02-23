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

## Pre Normal


`````js filename=intro
let itooamanumberjack = false;
if (imanumberandilovethrees) {
  itooamanumberjack = $(1)?.x;
} else {
  itooamanumberjack = $(2)?.x;
}
if (itooamanumberjack) {
  $(`a`, itooamanumberjack);
} else {
  $(`b`, itooamanumberjack);
}
`````

## Normalized


`````js filename=intro
let itooamanumberjack = false;
if (imanumberandilovethrees) {
  itooamanumberjack = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(1);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainElementCall.x;
    itooamanumberjack = tmpChainElementObject;
  } else {
  }
} else {
  itooamanumberjack = undefined;
  const tmpChainRootCall$1 = $;
  const tmpChainElementCall$1 = tmpChainRootCall$1(2);
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

## Output


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

## PST Output

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

## Globals

BAD@! Found 1 implicit global bindings:

imanumberandilovethrees

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

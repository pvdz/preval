# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Statement > Logic and both > Auto ident opt c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
(1, 2, $(b))?.x && (1, 2, $(b))?.x;
$(a);
`````

## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainRootProp /*:unknown*/ = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainRootProp == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainRootProp.x;
  tmpIfTest = tmpChainElementObject;
}
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpChainRootProp$1 /*:unknown*/ = $(b);
  const tmpIfTest$3 /*:boolean*/ = tmpChainRootProp$1 == null;
  if (tmpIfTest$3) {
    $(a);
  } else {
    tmpChainRootProp$1.x;
    $(a);
  }
} else {
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = undefined;
const b = { x: 1 };
const tmpChainRootProp = $(b);
if (!(tmpChainRootProp == null)) {
  tmpIfTest = tmpChainRootProp.x;
}
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpChainRootProp$1 = $(b);
  if (tmpChainRootProp$1 == null) {
    $(a);
  } else {
    tmpChainRootProp$1.x;
    $(a);
  }
} else {
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
(1, 2, $(b))?.x && (1, 2, $(b))?.x;
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootProp = $(b);
const tmpIfTest$1 = tmpChainRootProp != null;
if (tmpIfTest$1) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpIfTest = tmpChainElementObject;
} else {
}
if (tmpIfTest) {
  const tmpChainRootProp$1 = $(b);
  const tmpIfTest$3 = tmpChainRootProp$1 != null;
  if (tmpIfTest$3) {
    const tmpChainElementObject$1 = tmpChainRootProp$1.x;
    $(a);
  } else {
    $(a);
  }
} else {
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const c = $( b );
const d = c == null;
if (d) {

}
else {
  const e = c.x;
  a = e;
}
const f = {
  a: 999,
  b: 1000,
};
if (a) {
  const g = $( b );
  const h = g == null;
  if (h) {
    $( f );
  }
  else {
    g.x;
    $( f );
  }
}
else {
  $( f );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

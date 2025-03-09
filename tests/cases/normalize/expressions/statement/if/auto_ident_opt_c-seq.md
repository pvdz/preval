# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Statement > If > Auto ident opt c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
if ((1, 2, $(b))?.x);
$(a);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpChainRootProp /*:unknown*/ = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainRootProp == null;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest$1) {
  $(a);
} else {
  tmpChainRootProp.x;
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainRootProp = $({ x: 1 });
const tmpIfTest$1 = tmpChainRootProp == null;
const a = { a: 999, b: 1000 };
if (tmpIfTest$1) {
  $(a);
} else {
  tmpChainRootProp.x;
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
if ((1, 2, $(b))?.x);
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
  $(a);
} else {
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = b == null;
const d = {
  a: 999,
  b: 1000,
};
if (c) {
  $( d );
}
else {
  b.x;
  $( d );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Statement > Ternary b > Auto ident opt c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(1) ? (1, 2, $(b))?.x : $(200);
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const b /*:object*/ = { x: 1 };
  const tmpChainRootProp /*:unknown*/ = $(b);
  const tmpIfTest$1 /*:boolean*/ = tmpChainRootProp == null;
  if (tmpIfTest$1) {
    $(a);
  } else {
    tmpChainRootProp.x;
    $(a);
  }
} else {
  $(200);
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpChainRootProp = $({ x: 1 });
  if (tmpChainRootProp == null) {
    $(a);
  } else {
    tmpChainRootProp.x;
    $(a);
  }
} else {
  $(200);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(1) ? (1, 2, $(b))?.x : $(200);
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpChainRootProp = $(b);
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.x;
    $(a);
  } else {
    $(a);
  }
} else {
  $(200);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  const c = { x: 1 };
  const d = $( c );
  const e = d == null;
  if (e) {
    $( b );
  }
  else {
    d.x;
    $( b );
  }
}
else {
  $( 200 );
  $( b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

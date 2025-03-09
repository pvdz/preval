# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Bindings > Switch case > Auto ident opt c-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: 1 };

    let a = (1, 2, $(b))?.x;
    $(a);
}
`````

## Settled


`````js filename=intro
const tmpClusterSSA_b /*:object*/ = { x: 1 };
const tmpChainRootProp /*:unknown*/ = $(tmpClusterSSA_b);
const tmpIfTest$1 /*:boolean*/ = tmpChainRootProp == null;
if (tmpIfTest$1) {
  $(undefined);
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainRootProp.x;
  $(tmpChainElementObject);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainRootProp = $({ x: 1 });
if (tmpChainRootProp == null) {
  $(undefined);
} else {
  $(tmpChainRootProp.x);
}
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let b;
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    b = { x: 1 };
    a = (1, 2, $(b))?.x;
    $(a);
  } else {
  }
}
`````

## Normalized


`````js filename=intro
let b = undefined;
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  b = { x: 1 };
  a = undefined;
  const tmpChainRootProp = $(b);
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.x;
    a = tmpChainElementObject;
    $(tmpChainElementObject);
  } else {
    $(a);
  }
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = b == null;
if (c) {
  $( undefined );
}
else {
  const d = b.x;
  $( d );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

# Preval test case

# auto_ident_opt_s-seq.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident opt s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ((a = (1, 2, b)?.x)) {
  default:
    $(100);
}
$(a);
`````

## Settled


`````js filename=intro
$(100);
$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(1);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = (1, 2, b)?.x);
  if (true) {
    $(100);
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
} else {
}
let tmpSwitchDisc = a;
$(100);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

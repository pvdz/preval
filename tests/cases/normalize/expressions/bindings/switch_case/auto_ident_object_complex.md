# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Bindings > Switch case > Auto ident object complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = { x: $(1), y: 2, z: $(3) };
    $(a);
}
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const tmpObjLitVal$3 /*:unknown*/ = $(3);
const a /*:object*/ = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$3 = $(3);
$({ x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 });
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    a = { x: $(1), y: 2, z: $(3) };
    $(a);
  } else {
  }
}
`````

## Normalized


`````js filename=intro
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  const tmpObjLitVal = $(1);
  const tmpObjLitVal$1 = 2;
  const tmpObjLitVal$3 = $(3);
  a = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
  $(a);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = {
  x: a,
  y: 2,
  z: b,
};
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

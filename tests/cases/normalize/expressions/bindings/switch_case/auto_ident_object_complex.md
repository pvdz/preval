# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Bindings > Switch case > Auto ident object complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = { x: $(1), y: 2, z: $(3) };
    $(a);
}
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

## Output


`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$3 = $(3);
const tmpClusterSSA_a = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = {
x: a,
y: 2,
z: b
;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

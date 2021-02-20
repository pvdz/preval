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

## Normalized

`````js filename=intro
let tmpObjLitVal;
let tmpObjLitVal$1;
let tmpObjLitVal$2;
let a;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  tmpObjLitVal = $(1);
  tmpObjLitVal$1 = 2;
  tmpObjLitVal$2 = $(3);
  a = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
  $(a);
}
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$2 = $(3);
const a = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$2 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

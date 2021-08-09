# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
switch (b?.c.d.e?.(1)) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = b?.c.d.e?.(1);
  if (true) {
    $(100);
  } else {
  }
}
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
let tmpSwitchDisc = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$3 = tmpChainElementObject$1.e;
  const tmpIfTest$1 = tmpChainElementObject$3 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, 1);
    tmpSwitchDisc = tmpChainElementCall;
  } else {
  }
} else {
}
$(100);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpIfTest$1 = $ == null;
if (tmpIfTest$1) {
} else {
  const tmpObjLitVal$1 = { e: $ };
  $dotCall($, tmpObjLitVal$1, 1);
}
$(100);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

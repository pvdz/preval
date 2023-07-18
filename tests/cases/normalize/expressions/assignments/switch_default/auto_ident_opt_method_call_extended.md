# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > Switch default > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = b?.c.d.e(1);
}
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    a = b?.c.d.e(1);
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
const tmpSwitchDisc = $(1);
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$3 = tmpChainElementObject$1.e;
  const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, 1);
  a = tmpChainElementCall;
} else {
}
$(a);
`````

## Output

`````js filename=intro
$(1);
const tmpObjLitVal$1 = { e: $ };
const tmpChainElementCall = $dotCall($, tmpObjLitVal$1, 1);
$(tmpChainElementCall);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = { e: $ };
const b = $dotCall( $, a, 1 );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

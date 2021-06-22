# Preval test case

# auto_ident_c-opt_simple_simple.md

> Normalize > Expressions > Statement > Arr element > Auto ident c-opt simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
b?.["x"] + b?.["x"];
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
b?.[`x`] + b?.[`x`];
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainRootComputed = `x`;
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  tmpBinBothLhs = tmpChainElementObject;
} else {
}
let tmpBinBothRhs = undefined;
const tmpChainRootProp$1 = b;
const tmpIfTest$1 = tmpChainRootProp$1 != null;
if (tmpIfTest$1) {
  const tmpChainRootComputed$1 = `x`;
  const tmpChainElementObject$1 = tmpChainRootProp$1[tmpChainRootComputed$1];
  tmpBinBothRhs = tmpChainElementObject$1;
} else {
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
const tmpIfTest = b == null;
if (tmpIfTest) {
} else {
  b.x;
}
const tmpIfTest$1 = b == null;
if (tmpIfTest$1) {
} else {
  b.x;
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

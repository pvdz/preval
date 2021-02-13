# Preval test case

# auto_ident_c-opt_simple_simple.md

> normalize > expressions > statement > logic_and_both > auto_ident_c-opt_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
b?.["x"] && b?.["x"];
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootProp = b;
const tmpIfTest$1 = tmpChainRootProp != null;
if (tmpIfTest$1) {
  const tmpChainRootComputed = 'x';
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  tmpIfTest = tmpChainElementObject;
}
if (tmpIfTest) {
  const tmpChainRootProp$1 = b;
  const tmpIfTest$2 = tmpChainRootProp$1 != null;
  if (tmpIfTest$2) {
    const tmpChainRootComputed$1 = 'x';
    const tmpChainElementObject$1 = tmpChainRootProp$1[tmpChainRootComputed$1];
  }
}
$(a);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootProp = b;
const tmpIfTest$1 = tmpChainRootProp != null;
if (tmpIfTest$1) {
  const tmpChainElementObject = tmpChainRootProp['x'];
  tmpIfTest = tmpChainElementObject;
}
if (tmpIfTest) {
  const tmpChainRootProp$1 = b;
  const tmpIfTest$2 = tmpChainRootProp$1 != null;
  if (tmpIfTest$2) {
    const tmpChainElementObject$1 = tmpChainRootProp$1['x'];
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

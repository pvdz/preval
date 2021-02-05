# Preval test case

# auto_ident_opt_s-seq.md

> normalize > expressions > statement > logic_and_both > auto_ident_opt_s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
(1, 2, b)?.x && (1, 2, b)?.x;
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
1;
2;
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpIfTest = tmpChainElementObject;
}
if (tmpIfTest) {
  1;
  2;
  const tmpChainRootProp$1 = b;
  if (tmpChainRootProp$1) {
    const tmpChainElementObject$1 = tmpChainRootProp$1.x;
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
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpIfTest = tmpChainElementObject;
}
if (tmpIfTest) {
  const tmpChainRootProp$1 = b;
  if (tmpChainRootProp$1) {
    tmpChainRootProp$1.x;
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

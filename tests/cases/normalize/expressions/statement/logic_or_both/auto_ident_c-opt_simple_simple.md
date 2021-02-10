# Preval test case

# auto_ident_c-opt_simple_simple.md

> normalize > expressions > statement > logic_or_both > auto_ident_c-opt_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
b?.["x"] || b?.["x"];
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainRootComputed = 'x';
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  tmpIfTest = tmpChainElementObject;
}
if (tmpIfTest) {
} else {
  const tmpChainRootProp$1 = b;
  if (tmpChainRootProp$1) {
    const tmpChainRootComputed$1 = 'x';
    const tmpChainElementObject$1 = tmpChainRootProp$1[tmpChainRootComputed$1];
  }
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined

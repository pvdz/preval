# Preval test case

# auto_ident_opt_method_call_simple.md

> normalize > expressions > statement > logic_and_both > auto_ident_opt_method_call_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
b?.c(1) && b?.c(1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementCall = tmpChainElementObject.call(tmpChainRootProp, 1);
  tmpIfTest = tmpChainElementCall;
}
if (tmpIfTest) {
  const tmpChainRootProp$1 = b;
  if (tmpChainRootProp$1) {
    const tmpChainElementObject$1 = tmpChainRootProp$1.c;
    const tmpChainElementCall$1 = tmpChainElementObject$1.call(tmpChainRootProp$1, 1);
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
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined

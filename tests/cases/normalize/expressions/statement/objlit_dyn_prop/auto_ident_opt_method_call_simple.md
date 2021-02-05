# Preval test case

# auto_ident_opt_method_call_simple.md

> normalize > expressions > statement > objlit_dyn_prop > auto_ident_opt_method_call_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
({ [b?.c(1)]: 10 });
$(a);
`````

## Normalized

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementCall = tmpChainElementObject.call(tmpChainRootProp, 1);
}
10;
$(a);
`````

## Output

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.c;
  tmpChainElementObject.call(tmpChainRootProp, 1);
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

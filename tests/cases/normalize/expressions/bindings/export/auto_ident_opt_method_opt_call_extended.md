# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> normalize > expressions > bindings > export > auto_ident_opt_method_opt_call_extended
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

export let a = b?.c.d.e?.(1);
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = undefined;
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$2 = tmpChainElementObject$1.e;
  if (tmpChainElementObject$2) {
    const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
    a = tmpChainElementCall;
  }
}
export { a };
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined

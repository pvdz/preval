# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Bindings > Export > Auto ident opt method opt call extended
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

export let a = b?.c.d.e?.(1);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = b?.c.d.e?.(1);
export { a };
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$2 = tmpChainElementObject$1.e;
  const tmpIfTest$1 = tmpChainElementObject$2 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
    a = tmpChainElementCall;
  }
}
export { a };
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
const b = { c: tmpObjLitVal };
let a = undefined;
const tmpIfTest = b != null;
if (tmpIfTest) {
  const tmpChainElementObject = b.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$2 = tmpChainElementObject$1.e;
  const tmpIfTest$1 = tmpChainElementObject$2 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
    a = tmpChainElementCall;
  }
}
export { a };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

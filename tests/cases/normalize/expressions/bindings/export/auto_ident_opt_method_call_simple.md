# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident opt method call simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

export let a = b?.c(1);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { c: $ };
let a = b?.c(1);
export { a };
$(a);
`````

## Normalized

`````js filename=intro
let b = { c: $ };
let a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, 1);
  a = tmpChainElementCall;
} else {
}
export { a };
$(a);
`````

## Output

`````js filename=intro
let a = undefined;
const b = { c: $ };
const tmpIfTest = b == null;
if (tmpIfTest) {
} else {
  const tmpChainElementObject = b.c;
  const tmpChainElementCall = $dotCall(tmpChainElementObject, b, 1);
  a = tmpChainElementCall;
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

# Preval test case

# auto_ident_c-opt_simple_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident c-opt simple simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

export let a = b?.["x"];
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = b?.[`x`];
export { a };
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainRootComputed = `x`;
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  a = tmpChainElementObject;
} else {
}
export { a };
$(a);
`````

## Output

`````js filename=intro
const a = 1;
export { a };
$(1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

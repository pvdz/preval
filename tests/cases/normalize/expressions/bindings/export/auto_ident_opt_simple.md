# Preval test case

# auto_ident_opt_simple.md

> normalize > expressions > bindings > export > auto_ident_opt_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

export let a = b?.x;
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = undefined;
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
}
export { a };
$(a);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = undefined;
const tmpChainRootProp = b;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
}
export { a };
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same

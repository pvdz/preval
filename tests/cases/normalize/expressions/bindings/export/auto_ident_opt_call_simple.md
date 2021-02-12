# Preval test case

# auto_ident_opt_call_simple.md

> normalize > expressions > bindings > export > auto_ident_opt_call_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = $?.(1);
$(a);
`````

## Normalized

`````js filename=intro
let a = undefined;
const tmpChainRootCall = $;
if (tmpChainRootCall) {
  const tmpChainElementCall = tmpChainRootCall(1);
  a = tmpChainElementCall;
}
export { a };
$(a);
`````

## Output

`````js filename=intro
let a = undefined;
if ($) {
  const tmpChainElementCall = $(1);
  a = tmpChainElementCall;
}
export { a };
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same

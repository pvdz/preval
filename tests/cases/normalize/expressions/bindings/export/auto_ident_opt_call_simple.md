# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident opt call simple
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
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
  a = tmpChainElementCall;
}
export { a };
$(a);
`````

## Output

`````js filename=intro
let a = undefined;
const tmpIfTest = $ != null;
if (tmpIfTest) {
  const tmpChainElementCall = $(1);
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

Normalized calls: Same

Final output calls: Same

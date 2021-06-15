# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident opt c-mem call complex complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

export let a = $(b)?.[$("$")]?.($(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = $(b)?.[$(`$`)]?.($(1));
export { a };
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $(`$`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpCallCallee = $dotCall;
    const tmpCalleeParam = tmpChainElementObject;
    const tmpCalleeParam$1 = tmpChainElementCall;
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
    a = tmpChainElementCall$1;
  } else {
  }
} else {
}
export { a };
$(a);
`````

## Output

`````js filename=intro
let a = undefined;
const b = { $: $ };
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed = $(`$`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject == null;
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, tmpChainElementCall, tmpCalleeParam$3);
    a = tmpChainElementCall$1;
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

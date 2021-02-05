# Preval test case

# ctxt_opt_abc_undef_a.md

> normalize > optional > ctxt_opt_abc_undef_a
>
> Ensure context is passed on properly in various optional chaining cases

#TODO

## Input

`````js filename=intro
const a = undefined;
$($(a)?.[$('b')]?.[$('c')]?.(100));
`````

## Normalized

`````js filename=intro
const a = undefined;
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
if (tmpChainElementCall) {
  const tmpChainRootComputed = $('b');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (tmpChainElementObject) {
    const tmpChainRootComputed$1 = $('c');
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    if (tmpChainElementObject$1) {
      const tmpChainElementCall$1 = tmpChainElementObject$1.call(tmpChainElementObject, 100);
      tmpCalleeParam = tmpChainElementCall$1;
    }
  }
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(undefined);
if (tmpChainElementCall) {
  const tmpChainRootComputed = $('b');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (tmpChainElementObject) {
    const tmpChainRootComputed$1 = $('c');
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    if (tmpChainElementObject$1) {
      const tmpChainElementCall$1 = tmpChainElementObject$1.call(tmpChainElementObject, 100);
      tmpCalleeParam = tmpChainElementCall$1;
    }
  }
}
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

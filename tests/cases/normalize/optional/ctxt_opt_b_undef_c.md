# Preval test case

# ctxt_opt_b_undef_c.md

> normalize > optional > ctxt_opt_b_undef_c
>
> Ensure context is passed on properly in various optional chaining cases

#TODO

## Input

`````js filename=intro
const a = {b: {}};
$($(a).b?.c(100));
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = {};
const a = { b: tmpObjLitVal };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
const tmpChainElementObject = tmpChainElementCall.b;
if (tmpChainElementObject) {
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpChainElementCall$1 = tmpChainElementObject$1.call(tmpChainElementObject, 100);
  tmpCalleeParam = tmpChainElementCall$1;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { b: '{}' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: BAD?!
 - 1: { b: '{}' }
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Final output calls: BAD!!
 - eval returned: undefined

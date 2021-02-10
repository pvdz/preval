# Preval test case

# ctxt_opt_c_undef_a.md

> normalize > optional > ctxt_opt_c_undef_a
>
> Ensure context is passed on properly in various optional chaining cases

#TODO

## Input

`````js filename=intro
const a = undefined;
$($(a).b.c?.(100));
`````

## Normalized

`````js filename=intro
const a = undefined;
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
const tmpChainElementObject = tmpChainElementCall.b;
const tmpChainElementObject$1 = tmpChainElementObject.c;
if (tmpChainElementObject$1) {
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
 - 1: undefined
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined

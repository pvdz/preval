# Preval test case

# ctxt_opt_ab_undef_b.md

> normalize > optional > ctxt_opt_ab_undef_b
>
> Ensure context is passed on properly in various optional chaining cases

#TODO

## Input

`````js filename=intro
const a = {};
$($(a)?.b?.c(100));
`````

## Normalized

`````js filename=intro
const a = {};
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
if (tmpChainElementCall) {
  const tmpChainElementObject = tmpChainElementCall.b;
  if (tmpChainElementObject) {
    const tmpChainElementObject$1 = tmpChainElementObject.c;
    const tmpChainElementCall$1 = tmpChainElementObject$1.call(tmpChainElementObject, 100);
    tmpCalleeParam = tmpChainElementCall$1;
  }
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: {}
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined

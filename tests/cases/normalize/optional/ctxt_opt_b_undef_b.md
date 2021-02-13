# Preval test case

# ctxt_opt_b_undef_b.md

> normalize > optional > ctxt_opt_b_undef_b
>
> Ensure context is passed on properly in various optional chaining cases

#TODO

## Input

`````js filename=intro
const a = {};
$($(a).b?.c(100));
`````

## Normalized

`````js filename=intro
const a = {};
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
const a = {};
let tmpCalleeParam = undefined;
const tmpChainElementCall = $(a);
const tmpChainElementObject = tmpChainElementCall.b;
if (tmpChainElementObject) {
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpChainElementCall$1 = tmpChainElementObject$1.call(tmpChainElementObject, 100);
  tmpCalleeParam = tmpChainElementCall$1;
}
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: {}
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
# Preval test case

# ctxt_opt_c_undef_b.md

> Normalize > Optional > Ctxt opt c undef b
>
> Ensure context is passed on properly in various optional chaining cases

#TODO

## Input

`````js filename=intro
const a = {};
$($(a).b.c?.(100));
`````

## Pre Normal

`````js filename=intro
const a = {};
$($(a).b.c?.(100));
`````

## Normalized

`````js filename=intro
const a = {};
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
const tmpChainElementObject = tmpChainElementCall.b;
const tmpChainElementObject$1 = tmpChainElementObject.c;
const tmpIfTest = tmpChainElementObject$1 != null;
if (tmpIfTest) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, 100);
  tmpCalleeParam = tmpChainElementCall$1;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let tmpCalleeParam = undefined;
const a = {};
const tmpChainElementCall = $(a);
const tmpChainElementObject = tmpChainElementCall.b;
const tmpChainElementObject$1 = tmpChainElementObject.c;
const tmpIfTest = tmpChainElementObject$1 == null;
if (tmpIfTest) {
} else {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, 100);
  tmpCalleeParam = tmpChainElementCall$1;
}
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

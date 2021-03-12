# Preval test case

# ctxt_opt_a_undef_a.md

> Normalize > Optional > Ctxt opt a undef a
>
> Ensure context is passed on properly in various optional chaining cases

#TODO

## Input

`````js filename=intro
const a = undefined;
$($(a)?.b.c(100));
`````

## Pre Normal

`````js filename=intro
const a = undefined;
$($(a)?.b.c(100));
`````

## Normalized

`````js filename=intro
const a = undefined;
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpChainElementCall$1 = tmpChainElementObject$1.call(tmpChainElementObject, 100);
  tmpCalleeParam = tmpChainElementCall$1;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let tmpCalleeParam = undefined;
const tmpChainElementCall = $(undefined);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpChainElementCall$1 = tmpChainElementObject$1.call(tmpChainElementObject, 100);
  tmpCalleeParam = tmpChainElementCall$1;
}
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

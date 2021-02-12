# Preval test case

# _base_call_undef.md

> normalize > optional > _base_call_undef
>
> Simple example

#TODO

## Input

`````js filename=intro
var f = undefined;
$(f?.());
`````

## Normalized

`````js filename=intro
var f;
f = undefined;
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = f;
if (tmpChainRootCall) {
  const tmpChainElementCall = tmpChainRootCall();
  tmpCalleeParam = tmpChainElementCall;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
var f;
f = undefined;
let tmpCalleeParam = undefined;
const tmpChainRootCall = f;
if (tmpChainRootCall) {
  const tmpChainElementCall = tmpChainRootCall();
  tmpCalleeParam = tmpChainElementCall;
}
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

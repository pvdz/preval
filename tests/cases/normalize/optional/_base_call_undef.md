# Preval test case

# _base_call_undef.md

> Normalize > Optional > Base call undef
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
let f = undefined;
f = undefined;
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = f;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall();
  tmpCalleeParam = tmpChainElementCall;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

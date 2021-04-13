# Preval test case

# _base_call_undef_opt_prop.md

> Normalize > Optional > Base call undef opt prop
>
> Simple example

#TODO

## Input

`````js filename=intro
var a = undefined;
$(a?.b());
`````

## Pre Normal

`````js filename=intro
let a = undefined;
a = undefined;
$(a?.b());
`````

## Normalized

`````js filename=intro
let a = undefined;
a = undefined;
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementCall = tmpChainElementObject.call(tmpChainRootProp);
  tmpCalleeParam = tmpChainElementCall;
} else {
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

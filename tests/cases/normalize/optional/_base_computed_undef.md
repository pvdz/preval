# Preval test case

# _base_computed_undef.md

> normalize > optional > _base_computed_undef
>
> Simple example

#TODO

## Input

`````js filename=intro
var f = undefined;
var x = 10;
$(f?.[x]);
`````

## Normalized

`````js filename=intro
var f;
var x;
f = undefined;
x = 10;
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = f;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainRootComputed = x;
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  tmpCalleeParam = tmpChainElementObject;
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

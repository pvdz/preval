# Preval test case

# _base_computed_obj.md

> normalize > optional > _base_computed_obj
>
> Simple example

#TODO

## Input

`````js filename=intro
var f = {10: 20};
var x = 10;
$(f?.[x]);
`````

## Normalized

`````js filename=intro
var f;
var x;
f = { 10: 20 };
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
const f = { 10: 20 };
let tmpCalleeParam = undefined;
const tmpIfTest = f != null;
if (tmpIfTest) {
  const tmpChainElementObject = f[10];
  tmpCalleeParam = tmpChainElementObject;
}
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 20
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

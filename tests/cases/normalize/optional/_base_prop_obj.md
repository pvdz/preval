# Preval test case

# _base_prop_obj.md

> Normalize > Optional > Base prop obj
>
> Simple example

#TODO

## Input

`````js filename=intro
var f = {x: 10};
$(f?.x);
`````

## Normalized

`````js filename=intro
let f = undefined;
f = { x: 10 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = f;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpCalleeParam = tmpChainElementObject;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const SSA_f = { x: 10 };
let tmpCalleeParam = undefined;
const tmpIfTest = SSA_f != null;
if (tmpIfTest) {
  const tmpChainElementObject = SSA_f.x;
  tmpCalleeParam = tmpChainElementObject;
}
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

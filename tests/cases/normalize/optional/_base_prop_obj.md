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

## Pre Normal

`````js filename=intro
let f = undefined;
f = { x: 10 };
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
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = { x: 10 };
const tmpIfTest = f == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementObject = f.x;
  $(tmpChainElementObject);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

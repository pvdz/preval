# Preval test case

# _base_computed_obj.md

> Normalize > Optional > Base computed obj
>
> Simple example

#TODO

## Input

`````js filename=intro
var f = {10: 20};
var x = 10;
$(f?.[x]);
`````

## Pre Normal

`````js filename=intro
let f = undefined;
let x = undefined;
f = { 10: 20 };
x = 10;
$(f?.[x]);
`````

## Normalized

`````js filename=intro
let f = undefined;
let x = undefined;
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
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = { 10: 20 };
const tmpChainElementObject = f[10];
$(tmpChainElementObject);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

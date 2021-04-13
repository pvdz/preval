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
const tmpSSA_f = { 10: 20 };
let tmpCalleeParam = undefined;
const tmpIfTest = tmpSSA_f != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpSSA_f[10];
  tmpCalleeParam = tmpChainElementObject;
} else {
}
$(tmpCalleeParam);
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

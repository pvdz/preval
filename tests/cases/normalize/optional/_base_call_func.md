# Preval test case

# _base_call_func.md

> Normalize > Optional > Base call func
>
> Simple example

#TODO

## Input

`````js filename=intro
function f(...args){ $('f', args); }
$(f?.(1, 2, 3));
`````

## Pre Normal

`````js filename=intro
let f = function (...$$0) {
  let args = $$0;
  debugger;
  $('f', args);
};
$(f?.(1, 2, 3));
`````

## Normalized

`````js filename=intro
let f = function (...$$0) {
  let args = $$0;
  debugger;
  $('f', args);
  return undefined;
};
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = f;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1, 2, 3);
  tmpCalleeParam = tmpChainElementCall;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (...$$0) {
  const args = $$0;
  debugger;
  $('f', args);
  return undefined;
};
let tmpCalleeParam = undefined;
const tmpIfTest = f != null;
if (tmpIfTest) {
  const tmpChainElementCall = f(1, 2, 3);
  tmpCalleeParam = tmpChainElementCall;
} else {
}
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'f', [1, 2, 3]
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

# Preval test case

# _base_call_func.md

> normalize > optional > _base_call_func
>
> Simple example

#TODO

## Input

`````js filename=intro
function f(...args){ $('f', args); }
$(f?.(1, 2, 3));
`````

## Normalized

`````js filename=intro
function f(...args) {
  $('f', args);
}
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = f;
if (tmpChainRootCall) {
  const tmpChainElementCall = tmpChainRootCall(1, 2, 3);
  tmpCalleeParam = tmpChainElementCall;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(...args) {
  $('f', args);
}
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = f;
if (tmpChainRootCall) {
  const tmpChainElementCall = tmpChainRootCall(1, 2, 3);
  tmpCalleeParam = tmpChainElementCall;
}
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 'f', [1, 2, 3]
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

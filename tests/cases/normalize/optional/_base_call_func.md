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
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
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
let tmpCalleeParam = undefined;
const tmpIfTest = f != null;
if (tmpIfTest) {
  const tmpChainElementCall = f(1, 2, 3);
  tmpCalleeParam = tmpChainElementCall;
}
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 'f', [1, 2, 3]
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

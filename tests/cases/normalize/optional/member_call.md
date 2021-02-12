# Preval test case

# member_call.md

> normalize > optional > member_call
>
> Optional chaining fun

#TODO

## Input

`````js filename=intro
function f(){ return 10; }
$(f?.());
`````

## Normalized

`````js filename=intro
function f() {
  return 10;
}
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = f;
if (tmpChainRootCall) {
  const tmpChainElementCall = tmpChainRootCall();
  tmpCalleeParam = tmpChainElementCall;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  return 10;
}
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = f;
if (tmpChainRootCall) {
  const tmpChainElementCall = tmpChainRootCall();
  tmpCalleeParam = tmpChainElementCall;
}
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

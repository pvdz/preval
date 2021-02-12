# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
function f() {
  const y = (1, 2, $())?.()
  return $(y);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let y = undefined;
  const tmpChainRootCall = $();
  if (tmpChainRootCall) {
    const tmpChainElementCall = tmpChainRootCall();
    y = tmpChainElementCall;
  }
  const tmpReturnArg = $(y);
  return tmpReturnArg;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let y = undefined;
  const tmpChainRootCall = $();
  if (tmpChainRootCall) {
    const tmpChainElementCall = tmpChainRootCall();
    y = tmpChainElementCall;
  }
  const tmpReturnArg = $(y);
  return tmpReturnArg;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

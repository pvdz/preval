# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  const a = 10,
        b = $(2)?.toString,
        c = b?.length
  return $(c);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const a = 10;
  let b = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(2);
  if (tmpChainElementCall) {
    const tmpChainElementObject = tmpChainElementCall.toString;
    b = tmpChainElementObject;
  }
  let c = undefined;
  const tmpChainRootProp = b;
  if (tmpChainRootProp) {
    const tmpChainElementObject$1 = tmpChainRootProp.length;
    c = tmpChainElementObject$1;
  }
  const tmpReturnArg = $(c);
  return tmpReturnArg;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let b = undefined;
  const tmpChainElementCall = $(2);
  if (tmpChainElementCall) {
    const tmpChainElementObject = tmpChainElementCall.toString;
    b = tmpChainElementObject;
  }
  let c = undefined;
  const tmpChainRootProp = b;
  if (tmpChainRootProp) {
    const tmpChainElementObject$1 = tmpChainRootProp.length;
    c = tmpChainElementObject$1;
  }
  const tmpReturnArg = $(c);
  return tmpReturnArg;
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 1
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

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
        b = (a, $(2))?.toString,
        c = (1, b)?.length
  return $(c);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const a = 10;
  let b = undefined;
  const tmpChainRootProp = $(2);
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.toString;
    b = tmpChainElementObject;
  }
  let c = undefined;
  1;
  const tmpChainRootProp$1 = b;
  if (tmpChainRootProp$1) {
    const tmpChainElementObject$1 = tmpChainRootProp$1.length;
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
  const tmpChainRootProp = $(2);
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.toString;
    b = tmpChainElementObject;
  }
  let c = undefined;
  const tmpChainRootProp$1 = b;
  if (tmpChainRootProp$1) {
    const tmpChainElementObject$1 = tmpChainRootProp$1.length;
    c = tmpChainElementObject$1;
  }
  const tmpReturnArg = $(c);
  return tmpReturnArg;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 1
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

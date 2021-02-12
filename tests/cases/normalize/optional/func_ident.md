# Preval test case

# global_ident.md

> normalize > member_access > global_ident
>
> Ident property access should not be changed

#TODO

## Input

`````js filename=intro
function f() {
  return $(global?.foo);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpCallCallee = $;
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = global;
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.foo;
    tmpCalleeParam = tmpChainElementObject;
  }
  const tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  return tmpReturnArg;
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
function f() {
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = global;
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.foo;
    tmpCalleeParam = tmpChainElementObject;
  }
  const tmpReturnArg = $(tmpCalleeParam);
  return tmpReturnArg;
}
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

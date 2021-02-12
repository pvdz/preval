# Preval test case

# global_ident.md

> normalize > member_access > global_ident
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
function f() {
  return $('foo'?.length);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpCallCallee = $;
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = 'foo';
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.length;
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
  const tmpCallCallee = $;
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = 'foo';
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.length;
    tmpCalleeParam = tmpChainElementObject;
  }
  const tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  return tmpReturnArg;
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: 3
 - 2: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

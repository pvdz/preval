# Preval test case

# func_nested2.md

> Normalize > Optional > Func nested2
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: 1};
  return $(obj?.a);
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const obj = { a: 1 };
  const tmpCallCallee = $;
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = obj;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.a;
    tmpCalleeParam = tmpChainElementObject;
  }
  const tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  return tmpReturnArg;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  const obj = { a: 1 };
  let tmpCalleeParam = undefined;
  const tmpIfTest = obj != null;
  if (tmpIfTest) {
    const tmpChainElementObject = obj.a;
    tmpCalleeParam = tmpChainElementObject;
  }
  const tmpReturnArg = $(tmpCalleeParam);
  return tmpReturnArg;
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

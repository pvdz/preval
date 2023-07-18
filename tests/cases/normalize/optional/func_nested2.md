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

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const obj = { a: 1 };
  return $(obj?.a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const obj = { a: 1 };
  const tmpCallCallee = $;
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = obj;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.a;
    tmpCalleeParam = tmpChainElementObject;
  } else {
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
const tmpReturnArg = $(1);
$(tmpReturnArg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

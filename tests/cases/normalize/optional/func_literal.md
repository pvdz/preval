# Preval test case

# func_literal.md

> Normalize > Optional > Func literal
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

## Pre Normal

`````js filename=intro
let f = function () {
  return $('foo'?.length);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpCallCallee = $;
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = 'foo';
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function (tmpCallCallee$1, tmpCalleeParam$1, tmpChainRootProp$1, tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainRootProp$1.length;
    tmpCalleeParam$1 = tmpChainElementObject$1;
    const tmpReturnArg$2 = tmpBranchingC(tmpCallCallee$1, tmpCalleeParam$1, tmpChainRootProp$1, tmpIfTest$1);
    return tmpReturnArg$2;
  };
  const tmpBranchingB = function (tmpCallCallee$2, tmpCalleeParam$2, tmpChainRootProp$2, tmpIfTest$2) {
    const tmpReturnArg$3 = tmpBranchingC(tmpCallCallee$2, tmpCalleeParam$2, tmpChainRootProp$2, tmpIfTest$2);
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function (tmpCallCallee$3, tmpCalleeParam$3, tmpChainRootProp$3, tmpIfTest$3) {
    const tmpReturnArg$1 = tmpCallCallee$3(tmpCalleeParam$3);
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$4 = tmpBranchingA(tmpCallCallee, tmpCalleeParam, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$4;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpCallCallee, tmpCalleeParam, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$5;
  }
};
const tmpCallCallee$4 = $;
const tmpCalleeParam$4 = f();
tmpCallCallee$4(tmpCalleeParam$4);
`````

## Output

`````js filename=intro
const tmpCalleeParam$4 = $(3);
$(tmpCalleeParam$4);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

# Preval test case

# func_double_nested.md

> Normalize > Optional > Func double nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: {c: $()}}};
  return $(obj?.a?.b?.c);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const obj = { a: { b: { c: $() } } };
  return $(obj?.a?.b?.c);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpObjLitVal$3 = $();
  const tmpObjLitVal$1 = { c: tmpObjLitVal$3 };
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpCallCallee = $;
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = obj;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function () {
    debugger;
    const tmpChainElementObject$5 = tmpChainRootProp.a;
    const tmpIfTest$5 = tmpChainElementObject$5 != null;
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpChainElementObject$11 = tmpChainElementObject$5.b;
      const tmpIfTest$9 = tmpChainElementObject$11 != null;
      const tmpBranchingA$3 = function () {
        debugger;
        const tmpChainElementObject$15 = tmpChainElementObject$11.c;
        tmpCalleeParam = tmpChainElementObject$15;
        const tmpReturnArg$1 = tmpBranchingC$3();
        return tmpReturnArg$1;
      };
      const tmpBranchingB$3 = function () {
        debugger;
        const tmpReturnArg$3 = tmpBranchingC$3();
        return tmpReturnArg$3;
      };
      const tmpBranchingC$3 = function () {
        debugger;
        const tmpReturnArg$5 = tmpBranchingC$1();
        return tmpReturnArg$5;
      };
      if (tmpIfTest$9) {
        const tmpReturnArg$7 = tmpBranchingA$3();
        return tmpReturnArg$7;
      } else {
        const tmpReturnArg$9 = tmpBranchingB$3();
        return tmpReturnArg$9;
      }
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpReturnArg$11 = tmpBranchingC$1();
      return tmpReturnArg$11;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$13 = tmpBranchingC();
      return tmpReturnArg$13;
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$15 = tmpBranchingA$1();
      return tmpReturnArg$15;
    } else {
      const tmpReturnArg$17 = tmpBranchingB$1();
      return tmpReturnArg$17;
    }
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$19 = tmpBranchingC();
    return tmpReturnArg$19;
  };
  const tmpBranchingC = function () {
    debugger;
    tmpReturnArg = tmpCallCallee(tmpCalleeParam);
    return tmpReturnArg;
  };
  let tmpReturnArg = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$21 = tmpBranchingA();
    return tmpReturnArg$21;
  } else {
    const tmpReturnArg$23 = tmpBranchingB();
    return tmpReturnArg$23;
  }
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpObjLitVal$3 = $();
  const tmpObjLitVal$1 = { c: tmpObjLitVal$3 };
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  let tmpCalleeParam = undefined;
  const tmpIfTest = obj != null;
  const tmpBranchingA = function () {
    debugger;
    const tmpChainElementObject$5 = obj.a;
    const tmpIfTest$5 = tmpChainElementObject$5 != null;
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpChainElementObject$11 = tmpChainElementObject$5.b;
      const tmpIfTest$9 = tmpChainElementObject$11 != null;
      if (tmpIfTest$9) {
        const tmpChainElementObject$15 = tmpChainElementObject$11.c;
        tmpCalleeParam = tmpChainElementObject$15;
        const tmpReturnArg$1 = tmpBranchingC();
        return tmpReturnArg$1;
      } else {
        const tmpReturnArg$9 = tmpBranchingC();
        return tmpReturnArg$9;
      }
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$15 = tmpBranchingA$1();
      return tmpReturnArg$15;
    } else {
      const tmpReturnArg$17 = tmpBranchingC();
      return tmpReturnArg$17;
    }
  };
  const tmpBranchingC = function () {
    debugger;
    tmpReturnArg = $(tmpCalleeParam);
    return tmpReturnArg;
  };
  let tmpReturnArg = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$21 = tmpBranchingA();
    return tmpReturnArg$21;
  } else {
    const tmpReturnArg$23 = tmpBranchingC();
    return tmpReturnArg$23;
  }
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

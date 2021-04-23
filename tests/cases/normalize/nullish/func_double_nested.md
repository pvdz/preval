# Preval test case

# func_double_nested.md

> Normalize > Nullish > Func double nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const a = $(1), b = $(2), c = $(3);
function f() {
  const obj = {a: {b: {c: $()}}};
  return $(obj??a??b??c);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const obj = { a: { b: { c: $() } } };
  return $(obj ?? a ?? b ?? c);
};
const a = $(1),
  b = $(2),
  c = $(3);
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
  let tmpCalleeParam = obj;
  const tmpIfTest = tmpCalleeParam == null;
  const tmpBranchingA = function () {
    debugger;
    tmpCalleeParam = a;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$3 = tmpBranchingC();
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function () {
    debugger;
    const tmpIfTest$1 = tmpCalleeParam == null;
    const tmpBranchingA$1 = function () {
      debugger;
      tmpCalleeParam = b;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpReturnArg$7 = tmpBranchingC$1();
      return tmpReturnArg$7;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpIfTest$3 = tmpCalleeParam == null;
      const tmpBranchingA$3 = function () {
        debugger;
        tmpCalleeParam = c;
        const tmpReturnArg$9 = tmpBranchingC$3();
        return tmpReturnArg$9;
      };
      const tmpBranchingB$3 = function () {
        debugger;
        const tmpReturnArg$11 = tmpBranchingC$3();
        return tmpReturnArg$11;
      };
      const tmpBranchingC$3 = function () {
        debugger;
        tmpReturnArg = tmpCallCallee(tmpCalleeParam);
        return tmpReturnArg;
      };
      if (tmpIfTest$3) {
        const tmpReturnArg$13 = tmpBranchingA$3();
        return tmpReturnArg$13;
      } else {
        const tmpReturnArg$15 = tmpBranchingB$3();
        return tmpReturnArg$15;
      }
    };
    if (tmpIfTest$1) {
      const tmpReturnArg$17 = tmpBranchingA$1();
      return tmpReturnArg$17;
    } else {
      const tmpReturnArg$19 = tmpBranchingB$1();
      return tmpReturnArg$19;
    }
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
const a = $(1);
const b = $(2);
const c = $(3);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpBranchingC$1 = function () {
    debugger;
    const tmpIfTest$3 = tmpCalleeParam == null;
    if (tmpIfTest$3) {
      tmpCalleeParam = c;
      const tmpReturnArg$9 = $(tmpCalleeParam);
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$15 = $(tmpCalleeParam);
      return tmpReturnArg$15;
    }
  };
  const tmpObjLitVal$3 = $();
  const tmpObjLitVal$1 = { c: tmpObjLitVal$3 };
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  let tmpCalleeParam = obj;
  const tmpIfTest = tmpCalleeParam == null;
  const tmpBranchingC = function () {
    debugger;
    const tmpIfTest$1 = tmpCalleeParam == null;
    if (tmpIfTest$1) {
      tmpCalleeParam = b;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$19 = tmpBranchingC$1();
      return tmpReturnArg$19;
    }
  };
  if (tmpIfTest) {
    tmpCalleeParam = a;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  } else {
    const tmpReturnArg$23 = tmpBranchingC();
    return tmpReturnArg$23;
  }
};
const a = $(1);
const b = $(2);
const c = $(3);
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 
 - 5: { a: '{"b":"{\\"c\\":\\"undefined\\"}"}' }
 - 6: { a: '{"b":"{\\"c\\":\\"undefined\\"}"}' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

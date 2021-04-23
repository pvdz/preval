# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
function f() {
  return (a = $(b)?.[$("x")]?.[$("y")]);
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (a = $(b)?.[$('x')]?.[$('y')]);
};
let b = { x: { y: 1 } };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function () {
    debugger;
    const tmpChainRootComputed$3 = $('x');
    const tmpChainElementObject$3 = tmpChainElementCall[tmpChainRootComputed$3];
    const tmpIfTest$3 = tmpChainElementObject$3 != null;
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpChainRootComputed$7 = $('y');
      const tmpChainElementObject$7 = tmpChainElementObject$3[tmpChainRootComputed$7];
      a = tmpChainElementObject$7;
      const tmpReturnArg$1 = tmpBranchingC$1();
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$5 = tmpBranchingC();
      return tmpReturnArg$5;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$7 = tmpBranchingA$1();
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1();
      return tmpReturnArg$9;
    }
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$11 = tmpBranchingC();
    return tmpReturnArg$11;
  };
  const tmpBranchingC = function () {
    debugger;
    tmpReturnArg = a;
    return tmpReturnArg;
  };
  let tmpReturnArg = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$13 = tmpBranchingA();
    return tmpReturnArg$13;
  } else {
    const tmpReturnArg$15 = tmpBranchingB();
    return tmpReturnArg$15;
  }
};
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  a = undefined;
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function () {
    debugger;
    const tmpChainRootComputed$3 = $('x');
    const tmpChainElementObject$3 = tmpChainElementCall[tmpChainRootComputed$3];
    const tmpIfTest$3 = tmpChainElementObject$3 != null;
    if (tmpIfTest$3) {
      const tmpChainRootComputed$7 = $('y');
      const tmpChainElementObject$7 = tmpChainElementObject$3[tmpChainRootComputed$7];
      a = tmpChainElementObject$7;
      return a;
    } else {
      return a;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$13 = tmpBranchingA();
    return tmpReturnArg$13;
  } else {
    return a;
  }
};
const tmpObjLitVal = { y: 1 };
const b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: 1
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > Param default > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
function f(p = b?.c.d.e?.(1)) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? b?.c.d.e?.(1) : tmpParamDefault;
};
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, p$1, tmpIfTest$3) {
    p$1 = undefined;
    const tmpChainRootProp$1 = b;
    const tmpIfTest$4 = tmpChainRootProp$1 != null;
    const tmpBranchingA$1 = function (tmpParamDefault$4, p$4, tmpIfTest$8, tmpChainRootProp$2, tmpIfTest$9) {
      const tmpChainElementObject$6 = tmpChainRootProp$2.c;
      const tmpChainElementObject$7 = tmpChainElementObject$6.d;
      const tmpChainElementObject$8 = tmpChainElementObject$7.e;
      const tmpIfTest$10 = tmpChainElementObject$8 != null;
      const tmpBranchingA$2 = function (
        tmpParamDefault$7,
        p$7,
        tmpIfTest$15,
        tmpChainRootProp$5,
        tmpIfTest$16,
        tmpChainElementObject$9,
        tmpChainElementObject$10,
        tmpChainElementObject$11,
        tmpIfTest$17,
      ) {
        const tmpChainElementCall$3 = tmpChainElementObject$11.call(tmpChainElementObject$10, 1);
        p$7 = tmpChainElementCall$3;
        const tmpReturnArg = tmpBranchingC$2(
          tmpParamDefault$7,
          p$7,
          tmpIfTest$15,
          tmpChainRootProp$5,
          tmpIfTest$16,
          tmpChainElementObject$9,
          tmpChainElementObject$10,
          tmpChainElementObject$11,
          tmpIfTest$17,
        );
        return tmpReturnArg;
      };
      const tmpBranchingB$2 = function (
        tmpParamDefault$8,
        p$8,
        tmpIfTest$18,
        tmpChainRootProp$6,
        tmpIfTest$19,
        tmpChainElementObject$12,
        tmpChainElementObject$13,
        tmpChainElementObject$14,
        tmpIfTest$20,
      ) {
        const tmpReturnArg$1 = tmpBranchingC$2(
          tmpParamDefault$8,
          p$8,
          tmpIfTest$18,
          tmpChainRootProp$6,
          tmpIfTest$19,
          tmpChainElementObject$12,
          tmpChainElementObject$13,
          tmpChainElementObject$14,
          tmpIfTest$20,
        );
        return tmpReturnArg$1;
      };
      const tmpBranchingC$2 = function (
        tmpParamDefault$9,
        p$9,
        tmpIfTest$21,
        tmpChainRootProp$7,
        tmpIfTest$22,
        tmpChainElementObject$15,
        tmpChainElementObject$16,
        tmpChainElementObject$17,
        tmpIfTest$23,
      ) {
        const tmpReturnArg$2 = tmpBranchingC$1(tmpParamDefault$9, p$9, tmpIfTest$21, tmpChainRootProp$7, tmpIfTest$22);
        return tmpReturnArg$2;
      };
      if (tmpIfTest$10) {
        const tmpReturnArg$3 = tmpBranchingA$2(
          tmpParamDefault$4,
          p$4,
          tmpIfTest$8,
          tmpChainRootProp$2,
          tmpIfTest$9,
          tmpChainElementObject$6,
          tmpChainElementObject$7,
          tmpChainElementObject$8,
          tmpIfTest$10,
        );
        return tmpReturnArg$3;
      } else {
        const tmpReturnArg$4 = tmpBranchingB$2(
          tmpParamDefault$4,
          p$4,
          tmpIfTest$8,
          tmpChainRootProp$2,
          tmpIfTest$9,
          tmpChainElementObject$6,
          tmpChainElementObject$7,
          tmpChainElementObject$8,
          tmpIfTest$10,
        );
        return tmpReturnArg$4;
      }
    };
    const tmpBranchingB$1 = function (tmpParamDefault$5, p$5, tmpIfTest$11, tmpChainRootProp$3, tmpIfTest$12) {
      const tmpReturnArg$5 = tmpBranchingC$1(tmpParamDefault$5, p$5, tmpIfTest$11, tmpChainRootProp$3, tmpIfTest$12);
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function (tmpParamDefault$6, p$6, tmpIfTest$13, tmpChainRootProp$4, tmpIfTest$14) {
      const tmpReturnArg$6 = tmpBranchingC(tmpParamDefault$6, p$6, tmpIfTest$13);
      return tmpReturnArg$6;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$7 = tmpBranchingA$1(tmpParamDefault$1, p$1, tmpIfTest$3, tmpChainRootProp$1, tmpIfTest$4);
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$8 = tmpBranchingB$1(tmpParamDefault$1, p$1, tmpIfTest$3, tmpChainRootProp$1, tmpIfTest$4);
      return tmpReturnArg$8;
    }
  };
  const tmpBranchingB = function (tmpParamDefault$2, p$2, tmpIfTest$6) {
    p$2 = tmpParamDefault$2;
    const tmpReturnArg$9 = tmpBranchingC(tmpParamDefault$2, p$2, tmpIfTest$6);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function (tmpParamDefault$3, p$3, tmpIfTest$7) {};
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA(tmpParamDefault, p, tmpIfTest);
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(tmpParamDefault, p, tmpIfTest);
    return tmpReturnArg$11;
  }
};
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function () {
    const tmpIfTest$4 = b != null;
    const tmpBranchingA$1 = function (tmpChainRootProp$2) {
      const tmpChainElementObject$6 = tmpChainRootProp$2.c;
      const tmpChainElementObject$7 = tmpChainElementObject$6.d;
      const tmpChainElementObject$8 = tmpChainElementObject$7.e;
      const tmpIfTest$10 = tmpChainElementObject$8 != null;
      if (tmpIfTest$10) {
        tmpChainElementObject$8.call(tmpChainElementObject$7, 1);
        return undefined;
      } else {
        return undefined;
      }
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$7 = tmpBranchingA$1(b);
      return tmpReturnArg$7;
    } else {
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA();
    return tmpReturnArg$10;
  } else {
    return undefined;
  }
};
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
const b = { c: tmpObjLitVal };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

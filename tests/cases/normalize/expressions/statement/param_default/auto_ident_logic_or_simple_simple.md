# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Statement > Param default > Auto ident logic or simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = 0 || 2) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? 0 || 2 : tmpParamDefault;
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, p$1, tmpIfTest$1) {
    p$1 = 0;
    const tmpBranchingA$1 = function (tmpParamDefault$4, p$4, tmpIfTest$4) {
      const tmpReturnArg = tmpBranchingC$1(tmpParamDefault$4, p$4, tmpIfTest$4);
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function (tmpParamDefault$5, p$5, tmpIfTest$5) {
      p$5 = 2;
      const tmpReturnArg$1 = tmpBranchingC$1(tmpParamDefault$5, p$5, tmpIfTest$5);
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function (tmpParamDefault$6, p$6, tmpIfTest$6) {
      const tmpReturnArg$2 = tmpBranchingC(tmpParamDefault$6, p$6, tmpIfTest$6);
      return tmpReturnArg$2;
    };
    if (p$1) {
      const tmpReturnArg$3 = tmpBranchingA$1(tmpParamDefault$1, p$1, tmpIfTest$1);
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$4 = tmpBranchingB$1(tmpParamDefault$1, p$1, tmpIfTest$1);
      return tmpReturnArg$4;
    }
  };
  const tmpBranchingB = function (tmpParamDefault$2, p$2, tmpIfTest$2) {
    p$2 = tmpParamDefault$2;
    const tmpReturnArg$5 = tmpBranchingC(tmpParamDefault$2, p$2, tmpIfTest$2);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function (tmpParamDefault$3, p$3, tmpIfTest$3) {};
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpParamDefault, p, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpParamDefault, p, tmpIfTest);
    return tmpReturnArg$7;
  }
};
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
  if (tmpIfTest) {
    return undefined;
  } else {
    return undefined;
  }
};
const a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

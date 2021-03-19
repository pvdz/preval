# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Statement > Param default > Auto ident cond complex s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = $(1) ? (40, 50, 60) : $($(100))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? ($(1) ? (40, 50, 60) : $($(100))) : tmpParamDefault;
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
  const tmpBranchingA = function (tmpParamDefault$1, p$1, tmpIfTest$2) {
    const tmpIfTest$3 = $(1);
    const tmpBranchingA$1 = function (tmpParamDefault$4, p$4, tmpIfTest$6, tmpIfTest$7) {
      p$4 = 60;
      const tmpReturnArg = tmpBranchingC$1(tmpParamDefault$4, p$4, tmpIfTest$6, tmpIfTest$7);
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function (tmpParamDefault$5, p$5, tmpIfTest$8, tmpIfTest$9) {
      const tmpCallCallee$2 = $;
      const tmpCalleeParam$2 = $(100);
      p$5 = tmpCallCallee$2(tmpCalleeParam$2);
      const tmpReturnArg$1 = tmpBranchingC$1(tmpParamDefault$5, p$5, tmpIfTest$8, tmpIfTest$9);
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function (tmpParamDefault$6, p$6, tmpIfTest$10, tmpIfTest$11) {
      const tmpReturnArg$2 = tmpBranchingC(tmpParamDefault$6, p$6, tmpIfTest$10);
      return tmpReturnArg$2;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$3 = tmpBranchingA$1(tmpParamDefault$1, p$1, tmpIfTest$2, tmpIfTest$3);
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$4 = tmpBranchingB$1(tmpParamDefault$1, p$1, tmpIfTest$2, tmpIfTest$3);
      return tmpReturnArg$4;
    }
  };
  const tmpBranchingB = function (tmpParamDefault$2, p$2, tmpIfTest$4) {
    p$2 = tmpParamDefault$2;
    const tmpReturnArg$5 = tmpBranchingC(tmpParamDefault$2, p$2, tmpIfTest$4);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function (tmpParamDefault$3, p$3, tmpIfTest$5) {};
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpParamDefault, p, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpParamDefault, p, tmpIfTest);
    return tmpReturnArg$7;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$3(tmpCalleeParam$3);
$(a);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function () {
    const tmpIfTest$3 = $(1);
    if (tmpIfTest$3) {
      return undefined;
    } else {
      const tmpCalleeParam$2 = $(100);
      $(tmpCalleeParam$2);
      return undefined;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA();
    return tmpReturnArg$6;
  } else {
    return undefined;
  }
};
const a = { a: 999, b: 1000 };
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
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

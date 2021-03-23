# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
function f(p = (a = $(b)?.[$("x")]?.[$("y")])) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = $(b)?.[$('x')]?.[$('y')]) : tmpParamBare;
};
let b = { x: { y: 1 } };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpParamBare$1 = $$0;
    let p$1 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    let tmpNestedComplexRhs$1 = undefined;
    const tmpChainRootCall$1 = $;
    const tmpChainElementCall$1 = tmpChainRootCall$1(b);
    const tmpIfTest$4 = tmpChainElementCall$1 != null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$4 = $$0;
      let p$4 = $$1;
      let tmpIfTest$8 = $$2;
      let tmpNestedComplexRhs$2 = $$3;
      let tmpChainRootCall$2 = $$4;
      let tmpChainElementCall$2 = $$5;
      let tmpIfTest$9 = $$6;
      debugger;
      const tmpChainRootComputed$4 = $('x');
      const tmpChainElementObject$4 = tmpChainElementCall$2[tmpChainRootComputed$4];
      const tmpIfTest$10 = tmpChainElementObject$4 != null;
      const tmpBranchingA$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let tmpParamBare$7 = $$0;
        let p$7 = $$1;
        let tmpIfTest$15 = $$2;
        let tmpNestedComplexRhs$5 = $$3;
        let tmpChainRootCall$5 = $$4;
        let tmpChainElementCall$5 = $$5;
        let tmpIfTest$16 = $$6;
        let tmpChainRootComputed$6 = $$7;
        let tmpChainElementObject$6 = $$8;
        let tmpIfTest$17 = $$9;
        debugger;
        const tmpChainRootComputed$7 = $('y');
        const tmpChainElementObject$7 = tmpChainElementObject$6[tmpChainRootComputed$7];
        tmpNestedComplexRhs$5 = tmpChainElementObject$7;
        const tmpReturnArg = tmpBranchingC$2(
          tmpParamBare$7,
          p$7,
          tmpIfTest$15,
          tmpNestedComplexRhs$5,
          tmpChainRootCall$5,
          tmpChainElementCall$5,
          tmpIfTest$16,
          tmpChainRootComputed$6,
          tmpChainElementObject$6,
          tmpIfTest$17,
        );
        return tmpReturnArg;
      };
      const tmpBranchingB$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let tmpParamBare$8 = $$0;
        let p$8 = $$1;
        let tmpIfTest$18 = $$2;
        let tmpNestedComplexRhs$6 = $$3;
        let tmpChainRootCall$6 = $$4;
        let tmpChainElementCall$6 = $$5;
        let tmpIfTest$19 = $$6;
        let tmpChainRootComputed$8 = $$7;
        let tmpChainElementObject$8 = $$8;
        let tmpIfTest$20 = $$9;
        debugger;
        const tmpReturnArg$1 = tmpBranchingC$2(
          tmpParamBare$8,
          p$8,
          tmpIfTest$18,
          tmpNestedComplexRhs$6,
          tmpChainRootCall$6,
          tmpChainElementCall$6,
          tmpIfTest$19,
          tmpChainRootComputed$8,
          tmpChainElementObject$8,
          tmpIfTest$20,
        );
        return tmpReturnArg$1;
      };
      const tmpBranchingC$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let tmpParamBare$9 = $$0;
        let p$9 = $$1;
        let tmpIfTest$21 = $$2;
        let tmpNestedComplexRhs$7 = $$3;
        let tmpChainRootCall$7 = $$4;
        let tmpChainElementCall$7 = $$5;
        let tmpIfTest$22 = $$6;
        let tmpChainRootComputed$9 = $$7;
        let tmpChainElementObject$9 = $$8;
        let tmpIfTest$23 = $$9;
        debugger;
        const tmpReturnArg$2 = tmpBranchingC$1(
          tmpParamBare$9,
          p$9,
          tmpIfTest$21,
          tmpNestedComplexRhs$7,
          tmpChainRootCall$7,
          tmpChainElementCall$7,
          tmpIfTest$22,
        );
        return tmpReturnArg$2;
      };
      if (tmpIfTest$10) {
        const tmpReturnArg$3 = tmpBranchingA$2(
          tmpParamBare$4,
          p$4,
          tmpIfTest$8,
          tmpNestedComplexRhs$2,
          tmpChainRootCall$2,
          tmpChainElementCall$2,
          tmpIfTest$9,
          tmpChainRootComputed$4,
          tmpChainElementObject$4,
          tmpIfTest$10,
        );
        return tmpReturnArg$3;
      } else {
        const tmpReturnArg$4 = tmpBranchingB$2(
          tmpParamBare$4,
          p$4,
          tmpIfTest$8,
          tmpNestedComplexRhs$2,
          tmpChainRootCall$2,
          tmpChainElementCall$2,
          tmpIfTest$9,
          tmpChainRootComputed$4,
          tmpChainElementObject$4,
          tmpIfTest$10,
        );
        return tmpReturnArg$4;
      }
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$5 = $$0;
      let p$5 = $$1;
      let tmpIfTest$11 = $$2;
      let tmpNestedComplexRhs$3 = $$3;
      let tmpChainRootCall$3 = $$4;
      let tmpChainElementCall$3 = $$5;
      let tmpIfTest$12 = $$6;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpParamBare$5,
        p$5,
        tmpIfTest$11,
        tmpNestedComplexRhs$3,
        tmpChainRootCall$3,
        tmpChainElementCall$3,
        tmpIfTest$12,
      );
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
      let tmpParamBare$6 = $$0;
      let p$6 = $$1;
      let tmpIfTest$13 = $$2;
      let tmpNestedComplexRhs$4 = $$3;
      let tmpChainRootCall$4 = $$4;
      let tmpChainElementCall$4 = $$5;
      let tmpIfTest$14 = $$6;
      debugger;
      a = tmpNestedComplexRhs$4;
      p$6 = tmpNestedComplexRhs$4;
      const tmpReturnArg$6 = tmpBranchingC(tmpParamBare$6, p$6, tmpIfTest$13);
      return tmpReturnArg$6;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$7 = tmpBranchingA$1(
        tmpParamBare$1,
        p$1,
        tmpIfTest$3,
        tmpNestedComplexRhs$1,
        tmpChainRootCall$1,
        tmpChainElementCall$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$8 = tmpBranchingB$1(
        tmpParamBare$1,
        p$1,
        tmpIfTest$3,
        tmpNestedComplexRhs$1,
        tmpChainRootCall$1,
        tmpChainElementCall$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$8;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$2 = $$0;
    let p$2 = $$1;
    let tmpIfTest$6 = $$2;
    debugger;
    p$2 = tmpParamBare$2;
    const tmpReturnArg$9 = tmpBranchingC(tmpParamBare$2, p$2, tmpIfTest$6);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let p$3 = $$1;
    let tmpIfTest$7 = $$2;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA(tmpParamBare, p, tmpIfTest);
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(tmpParamBare, p, tmpIfTest);
    return tmpReturnArg$11;
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
  const tmpChainElementCall$1 = $(b);
  const tmpIfTest$4 = tmpChainElementCall$1 != null;
  const tmpBranchingA$1 = function ($$0) {
    const tmpChainElementCall$2 = $$0;
    debugger;
    const tmpChainRootComputed$4 = $('x');
    const tmpChainElementObject$4 = tmpChainElementCall$2[tmpChainRootComputed$4];
    const tmpIfTest$10 = tmpChainElementObject$4 != null;
    if (tmpIfTest$10) {
      const tmpChainRootComputed$7 = $('y');
      const tmpChainElementObject$7 = tmpChainElementObject$4[tmpChainRootComputed$7];
      a = tmpChainElementObject$7;
      return undefined;
    } else {
      a = undefined;
      return undefined;
    }
  };
  if (tmpIfTest$4) {
    const tmpReturnArg = tmpBranchingA$1(tmpChainElementCall$1);
    return tmpReturnArg;
  } else {
    a = undefined;
    return undefined;
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
 - 4: undefined
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

# Preval test case

# if_nested_with_tail4.md

> Labels > If nested with tail4
>
> Make sure the labeled `if` doesn't screw up transforms

Contrived example for breaking past one level of label inside a trivial if-else structure.

#TODO

## Input

`````js filename=intro
function f() {
  $(100);
  label1: 
    if ($(0)) {
      label2:
        if ($(0)) {
          label3:
            if ($(0)) {
              break label2;
            } else {
              break label3;
            }
          $('tail3'); // DCE me
        } else {
          break label1;
        }
      $('tail2'); // do not DCE me
    }
    $('tail1'); // do not DCE me
  $('end');
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  $(100);
  label1: if ($(0)) {
    label2: if ($(0)) {
      label3: if ($(0)) {
        break label2;
      } else {
        break label3;
      }
      $('tail3');
    } else {
      break label1;
    }
    $('tail2');
  }
  $('tail1');
  $('end');
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  $(100);
  const tmpLabeledBlockFunc = function () {
    debugger;
    const tmpIfTest$3 = $(0);
    const tmpBranchingA = function ($$0) {
      let tmpIfTest$6 = $$0;
      debugger;
      const tmpLabeledBlockFunc$1 = function ($$0) {
        let tmpIfTest$12 = $$0;
        debugger;
        const tmpIfTest$13 = $(0);
        const tmpBranchingA$1 = function ($$0, $$1) {
          let tmpIfTest$15 = $$0;
          let tmpIfTest$16 = $$1;
          debugger;
          const tmpLabeledBlockFunc$2 = function ($$0, $$1) {
            let tmpIfTest$24 = $$0;
            let tmpIfTest$25 = $$1;
            debugger;
            const tmpIfTest$26 = $(0);
            const tmpBranchingA$2 = function ($$0, $$1, $$2) {
              let tmpIfTest$27 = $$0;
              let tmpIfTest$28 = $$1;
              let tmpIfTest$29 = $$2;
              debugger;
              const tmpReturnArg$8 = tmpAfterLabel$1(tmpIfTest$27);
              return tmpReturnArg$8;
            };
            const tmpBranchingB$2 = function ($$0, $$1, $$2) {
              let tmpIfTest$30 = $$0;
              let tmpIfTest$31 = $$1;
              let tmpIfTest$32 = $$2;
              debugger;
              const tmpReturnArg$9 = tmpAfterLabel$2(tmpIfTest$30, tmpIfTest$31);
              return tmpReturnArg$9;
            };
            const tmpBranchingC$2 = function ($$0, $$1, $$2) {
              let tmpIfTest$33 = $$0;
              let tmpIfTest$34 = $$1;
              let tmpIfTest$35 = $$2;
              debugger;
              const tmpReturnArg$10 = tmpAfterLabel$2(tmpIfTest$33, tmpIfTest$34);
              return tmpReturnArg$10;
            };
            if (tmpIfTest$26) {
              const tmpReturnArg$11 = tmpBranchingA$2(tmpIfTest$24, tmpIfTest$25, tmpIfTest$26);
              return tmpReturnArg$11;
            } else {
              const tmpReturnArg$12 = tmpBranchingB$2(tmpIfTest$24, tmpIfTest$25, tmpIfTest$26);
              return tmpReturnArg$12;
            }
          };
          const tmpAfterLabel$2 = function ($$0, $$1) {
            let tmpIfTest$22 = $$0;
            let tmpIfTest$23 = $$1;
            debugger;
            $('tail3');
            const tmpReturnArg$13 = tmpBranchingC$1(tmpIfTest$22, tmpIfTest$23);
            return tmpReturnArg$13;
          };
          const tmpReturnArg$14 = tmpLabeledBlockFunc$2(tmpIfTest$15, tmpIfTest$16);
          return tmpReturnArg$14;
        };
        const tmpBranchingB$1 = function ($$0, $$1) {
          let tmpIfTest$18 = $$0;
          let tmpIfTest$19 = $$1;
          debugger;
          const tmpReturnArg$5 = tmpAfterLabel();
          return tmpReturnArg$5;
        };
        const tmpBranchingC$1 = function ($$0, $$1) {
          let tmpIfTest$20 = $$0;
          let tmpIfTest$21 = $$1;
          debugger;
          const tmpReturnArg$15 = tmpAfterLabel$1(tmpIfTest$20);
          return tmpReturnArg$15;
        };
        if (tmpIfTest$13) {
          const tmpReturnArg$16 = tmpBranchingA$1(tmpIfTest$12, tmpIfTest$13);
          return tmpReturnArg$16;
        } else {
          const tmpReturnArg$17 = tmpBranchingB$1(tmpIfTest$12, tmpIfTest$13);
          return tmpReturnArg$17;
        }
      };
      const tmpAfterLabel$1 = function ($$0) {
        let tmpIfTest$11 = $$0;
        debugger;
        $('tail2');
        const tmpReturnArg$18 = tmpBranchingC(tmpIfTest$11);
        return tmpReturnArg$18;
      };
      const tmpReturnArg$19 = tmpLabeledBlockFunc$1(tmpIfTest$6);
      return tmpReturnArg$19;
    };
    const tmpBranchingB = function ($$0) {
      let tmpIfTest$9 = $$0;
      debugger;
      const tmpReturnArg$20 = tmpBranchingC(tmpIfTest$9);
      return tmpReturnArg$20;
    };
    const tmpBranchingC = function ($$0) {
      let tmpIfTest$10 = $$0;
      debugger;
      const tmpReturnArg$21 = tmpAfterLabel();
      return tmpReturnArg$21;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$22 = tmpBranchingA(tmpIfTest$3);
      return tmpReturnArg$22;
    } else {
      const tmpReturnArg$23 = tmpBranchingB(tmpIfTest$3);
      return tmpReturnArg$23;
    }
  };
  const tmpAfterLabel = function () {
    debugger;
    $('tail1');
    $('end');
  };
  const tmpReturnArg$24 = tmpLabeledBlockFunc();
  return tmpReturnArg$24;
};
f();
`````

## Output

`````js filename=intro
$(100);
const tmpAfterLabel = function () {
  debugger;
  $('tail1');
  $('end');
};
const tmpIfTest$3 = $(0);
if (tmpIfTest$3) {
  const tmpLabeledBlockFunc$1 = function () {
    debugger;
    const tmpIfTest$13 = $(0);
    if (tmpIfTest$13) {
      const tmpLabeledBlockFunc$2 = function () {
        debugger;
        const tmpIfTest$26 = $(0);
        if (tmpIfTest$26) {
          const tmpReturnArg$11 = tmpAfterLabel$1();
          return tmpReturnArg$11;
        } else {
          $('tail3');
          const tmpReturnArg$13 = tmpAfterLabel$1();
          return tmpReturnArg$13;
        }
      };
      const tmpReturnArg$14 = tmpLabeledBlockFunc$2();
      return tmpReturnArg$14;
    } else {
      const tmpReturnArg$17 = tmpAfterLabel();
      return tmpReturnArg$17;
    }
  };
  const tmpAfterLabel$1 = function () {
    debugger;
    $('tail2');
    const tmpReturnArg$18 = tmpAfterLabel();
    return tmpReturnArg$18;
  };
  tmpLabeledBlockFunc$1();
} else {
  tmpAfterLabel();
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 0
 - 3: 'tail1'
 - 4: 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

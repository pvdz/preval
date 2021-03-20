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
  const tmpBranchingC = function () {
    $('tail1');
    $('end');
  };
  const tmpLabeledBlockFunc = function () {
    $(100);
    const tmpIfTest$3 = $(0);
    const tmpBranchingA = function (tmpIfTest$6) {
      const tmpBranchingC$2 = function (tmpIfTest$11) {
        $('tail2');
        const tmpReturnArg$3 = tmpBranchingC$1(tmpIfTest$11);
        return tmpReturnArg$3;
      };
      const tmpLabeledBlockFunc$1 = function (tmpIfTest$12) {
        const tmpIfTest$13 = $(0);
        const tmpBranchingA$1 = function (tmpIfTest$15, tmpIfTest$16) {
          const tmpBranchingC$4 = function (tmpIfTest$22, tmpIfTest$23) {
            $('tail3');
            const tmpReturnArg$8 = tmpBranchingC$3(tmpIfTest$22, tmpIfTest$23);
            return tmpReturnArg$8;
          };
          const tmpLabeledBlockFunc$2 = function (tmpIfTest$24, tmpIfTest$25) {
            const tmpIfTest$26 = $(0);
            const tmpBranchingA$2 = function (tmpIfTest$27, tmpIfTest$28, tmpIfTest$29) {
              const tmpReturnArg$10 = tmpBranchingC$2(tmpIfTest$27);
              return tmpReturnArg$10;
            };
            const tmpBranchingB$2 = function (tmpIfTest$30, tmpIfTest$31, tmpIfTest$32) {
              const tmpReturnArg$11 = tmpBranchingC$4(tmpIfTest$30, tmpIfTest$31);
              return tmpReturnArg$11;
            };
            const tmpBranchingC$5 = function (tmpIfTest$33, tmpIfTest$34, tmpIfTest$35) {
              const tmpReturnArg$12 = tmpBranchingC$4(tmpIfTest$33, tmpIfTest$34);
              return tmpReturnArg$12;
            };
            if (tmpIfTest$26) {
              const tmpReturnArg$13 = tmpBranchingA$2(tmpIfTest$24, tmpIfTest$25, tmpIfTest$26);
              return tmpReturnArg$13;
            } else {
              const tmpReturnArg$14 = tmpBranchingB$2(tmpIfTest$24, tmpIfTest$25, tmpIfTest$26);
              return tmpReturnArg$14;
            }
          };
          const tmpReturnArg$15 = tmpLabeledBlockFunc$2(tmpIfTest$15, tmpIfTest$16);
          return tmpReturnArg$15;
        };
        const tmpBranchingB$1 = function (tmpIfTest$18, tmpIfTest$19) {
          const tmpReturnArg$6 = tmpBranchingC();
          return tmpReturnArg$6;
        };
        const tmpBranchingC$3 = function (tmpIfTest$20, tmpIfTest$21) {
          const tmpReturnArg$16 = tmpBranchingC$2(tmpIfTest$20);
          return tmpReturnArg$16;
        };
        if (tmpIfTest$13) {
          const tmpReturnArg$17 = tmpBranchingA$1(tmpIfTest$12, tmpIfTest$13);
          return tmpReturnArg$17;
        } else {
          const tmpReturnArg$18 = tmpBranchingB$1(tmpIfTest$12, tmpIfTest$13);
          return tmpReturnArg$18;
        }
      };
      const tmpReturnArg$19 = tmpLabeledBlockFunc$1(tmpIfTest$6);
      return tmpReturnArg$19;
    };
    const tmpBranchingB = function (tmpIfTest$9) {
      const tmpReturnArg$20 = tmpBranchingC$1(tmpIfTest$9);
      return tmpReturnArg$20;
    };
    const tmpBranchingC$1 = function (tmpIfTest$10) {
      const tmpReturnArg$21 = tmpBranchingC();
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
  const tmpReturnArg$24 = tmpLabeledBlockFunc();
  return tmpReturnArg$24;
};
f();
`````

## Output

`````js filename=intro
const tmpBranchingC = function () {
  $('tail1');
  $('end');
};
$(100);
const tmpIfTest$3 = $(0);
if (tmpIfTest$3) {
  const tmpBranchingC$2 = function () {
    $('tail2');
    const tmpReturnArg$3 = tmpBranchingC();
    return tmpReturnArg$3;
  };
  const tmpLabeledBlockFunc$1 = function () {
    const tmpIfTest$13 = $(0);
    if (tmpIfTest$13) {
      const tmpLabeledBlockFunc$2 = function () {
        const tmpIfTest$26 = $(0);
        if (tmpIfTest$26) {
          const tmpReturnArg$13 = tmpBranchingC$2();
          return tmpReturnArg$13;
        } else {
          $('tail3');
          const tmpReturnArg$8 = tmpBranchingC$2();
          return tmpReturnArg$8;
        }
      };
      const tmpReturnArg$15 = tmpLabeledBlockFunc$2();
      return tmpReturnArg$15;
    } else {
      const tmpReturnArg$18 = tmpBranchingC();
      return tmpReturnArg$18;
    }
  };
  tmpLabeledBlockFunc$1();
} else {
  tmpBranchingC();
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

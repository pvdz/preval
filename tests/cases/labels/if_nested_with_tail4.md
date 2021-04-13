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
    const tmpIfTest$5 = $(0);
    const tmpBranchingA = function () {
      debugger;
      const tmpLabeledBlockFunc$1 = function () {
        debugger;
        const tmpIfTest$15 = $(0);
        const tmpBranchingA$1 = function () {
          debugger;
          const tmpLabeledBlockFunc$3 = function () {
            debugger;
            const tmpIfTest$21 = $(0);
            const tmpBranchingA$3 = function () {
              debugger;
              const tmpReturnArg$15 = tmpAfterLabel$1();
              return tmpReturnArg$15;
            };
            const tmpBranchingB$3 = function () {
              debugger;
              const tmpReturnArg$17 = tmpAfterLabel$3();
              return tmpReturnArg$17;
            };
            const tmpBranchingC$3 = function () {
              debugger;
              const tmpReturnArg$19 = tmpAfterLabel$3();
              return tmpReturnArg$19;
            };
            if (tmpIfTest$21) {
              const tmpReturnArg$21 = tmpBranchingA$3();
              return tmpReturnArg$21;
            } else {
              const tmpReturnArg$23 = tmpBranchingB$3();
              return tmpReturnArg$23;
            }
          };
          const tmpAfterLabel$3 = function () {
            debugger;
            $('tail3');
            const tmpReturnArg$25 = tmpBranchingC$1();
            return tmpReturnArg$25;
          };
          const tmpReturnArg$27 = tmpLabeledBlockFunc$3();
          return tmpReturnArg$27;
        };
        const tmpBranchingB$1 = function () {
          debugger;
          const tmpReturnArg$9 = tmpAfterLabel();
          return tmpReturnArg$9;
        };
        const tmpBranchingC$1 = function () {
          debugger;
          const tmpReturnArg$29 = tmpAfterLabel$1();
          return tmpReturnArg$29;
        };
        if (tmpIfTest$15) {
          const tmpReturnArg$31 = tmpBranchingA$1();
          return tmpReturnArg$31;
        } else {
          const tmpReturnArg$33 = tmpBranchingB$1();
          return tmpReturnArg$33;
        }
      };
      const tmpAfterLabel$1 = function () {
        debugger;
        $('tail2');
        const tmpReturnArg$35 = tmpBranchingC();
        return tmpReturnArg$35;
      };
      const tmpReturnArg$37 = tmpLabeledBlockFunc$1();
      return tmpReturnArg$37;
    };
    const tmpBranchingB = function () {
      debugger;
      const tmpReturnArg$39 = tmpBranchingC();
      return tmpReturnArg$39;
    };
    const tmpBranchingC = function () {
      debugger;
      const tmpReturnArg$41 = tmpAfterLabel();
      return tmpReturnArg$41;
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$43 = tmpBranchingA();
      return tmpReturnArg$43;
    } else {
      const tmpReturnArg$45 = tmpBranchingB();
      return tmpReturnArg$45;
    }
  };
  const tmpAfterLabel = function () {
    debugger;
    $('tail1');
    $('end');
    return undefined;
  };
  const tmpReturnArg$47 = tmpLabeledBlockFunc();
  return tmpReturnArg$47;
};
f();
`````

## Output

`````js filename=intro
const tmpLabeledBlockFunc$1 = function () {
  debugger;
  const tmpIfTest$15 = $(0);
  if (tmpIfTest$15) {
    const tmpReturnArg$27 = tmpLabeledBlockFunc$3();
    return tmpReturnArg$27;
  } else {
    const tmpReturnArg$33 = tmpAfterLabel();
    return tmpReturnArg$33;
  }
};
const tmpLabeledBlockFunc$3 = function () {
  debugger;
  const tmpIfTest$21 = $(0);
  if (tmpIfTest$21) {
    const tmpReturnArg$21 = tmpAfterLabel$1();
    return tmpReturnArg$21;
  } else {
    $('tail3');
    const tmpReturnArg$25 = tmpAfterLabel$1();
    return tmpReturnArg$25;
  }
};
const tmpAfterLabel$1 = function () {
  debugger;
  $('tail2');
  const tmpReturnArg$35 = tmpAfterLabel();
  return tmpReturnArg$35;
};
$(100);
const tmpAfterLabel = function () {
  debugger;
  $('tail1');
  $('end');
  return undefined;
};
const tmpIfTest$5 = $(0);
if (tmpIfTest$5) {
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

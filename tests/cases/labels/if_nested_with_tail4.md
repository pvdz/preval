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
    const tmpBranchingA = function ($$0) {
      let tmpIfTest$11 = $$0;
      debugger;
      const tmpLabeledBlockFunc$1 = function ($$0) {
        let tmpIfTest$23 = $$0;
        debugger;
        const tmpIfTest$25 = $(0);
        const tmpBranchingA$1 = function ($$0, $$1) {
          let tmpIfTest$29 = $$0;
          let tmpIfTest$31 = $$1;
          debugger;
          const tmpLabeledBlockFunc$3 = function ($$0, $$1) {
            let tmpIfTest$47 = $$0;
            let tmpIfTest$49 = $$1;
            debugger;
            const tmpIfTest$51 = $(0);
            const tmpBranchingA$3 = function ($$0, $$1, $$2) {
              let tmpIfTest$53 = $$0;
              let tmpIfTest$55 = $$1;
              let tmpIfTest$57 = $$2;
              debugger;
              const tmpReturnArg$15 = tmpAfterLabel$1(tmpIfTest$53);
              return tmpReturnArg$15;
            };
            const tmpBranchingB$3 = function ($$0, $$1, $$2) {
              let tmpIfTest$59 = $$0;
              let tmpIfTest$61 = $$1;
              let tmpIfTest$63 = $$2;
              debugger;
              const tmpReturnArg$17 = tmpAfterLabel$3(tmpIfTest$59, tmpIfTest$61);
              return tmpReturnArg$17;
            };
            const tmpBranchingC$3 = function ($$0, $$1, $$2) {
              let tmpIfTest$65 = $$0;
              let tmpIfTest$67 = $$1;
              let tmpIfTest$69 = $$2;
              debugger;
              const tmpReturnArg$19 = tmpAfterLabel$3(tmpIfTest$65, tmpIfTest$67);
              return tmpReturnArg$19;
            };
            if (tmpIfTest$51) {
              const tmpReturnArg$21 = tmpBranchingA$3(tmpIfTest$47, tmpIfTest$49, tmpIfTest$51);
              return tmpReturnArg$21;
            } else {
              const tmpReturnArg$23 = tmpBranchingB$3(tmpIfTest$47, tmpIfTest$49, tmpIfTest$51);
              return tmpReturnArg$23;
            }
          };
          const tmpAfterLabel$3 = function ($$0, $$1) {
            let tmpIfTest$43 = $$0;
            let tmpIfTest$45 = $$1;
            debugger;
            $('tail3');
            const tmpReturnArg$25 = tmpBranchingC$1(tmpIfTest$43, tmpIfTest$45);
            return tmpReturnArg$25;
          };
          const tmpReturnArg$27 = tmpLabeledBlockFunc$3(tmpIfTest$29, tmpIfTest$31);
          return tmpReturnArg$27;
        };
        const tmpBranchingB$1 = function ($$0, $$1) {
          let tmpIfTest$35 = $$0;
          let tmpIfTest$37 = $$1;
          debugger;
          const tmpReturnArg$9 = tmpAfterLabel();
          return tmpReturnArg$9;
        };
        const tmpBranchingC$1 = function ($$0, $$1) {
          let tmpIfTest$39 = $$0;
          let tmpIfTest$41 = $$1;
          debugger;
          const tmpReturnArg$29 = tmpAfterLabel$1(tmpIfTest$39);
          return tmpReturnArg$29;
        };
        if (tmpIfTest$25) {
          const tmpReturnArg$31 = tmpBranchingA$1(tmpIfTest$23, tmpIfTest$25);
          return tmpReturnArg$31;
        } else {
          const tmpReturnArg$33 = tmpBranchingB$1(tmpIfTest$23, tmpIfTest$25);
          return tmpReturnArg$33;
        }
      };
      const tmpAfterLabel$1 = function ($$0) {
        let tmpIfTest$21 = $$0;
        debugger;
        $('tail2');
        const tmpReturnArg$35 = tmpBranchingC(tmpIfTest$21);
        return tmpReturnArg$35;
      };
      const tmpReturnArg$37 = tmpLabeledBlockFunc$1(tmpIfTest$11);
      return tmpReturnArg$37;
    };
    const tmpBranchingB = function ($$0) {
      let tmpIfTest$17 = $$0;
      debugger;
      const tmpReturnArg$39 = tmpBranchingC(tmpIfTest$17);
      return tmpReturnArg$39;
    };
    const tmpBranchingC = function ($$0) {
      let tmpIfTest$19 = $$0;
      debugger;
      const tmpReturnArg$41 = tmpAfterLabel();
      return tmpReturnArg$41;
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$43 = tmpBranchingA(tmpIfTest$5);
      return tmpReturnArg$43;
    } else {
      const tmpReturnArg$45 = tmpBranchingB(tmpIfTest$5);
      return tmpReturnArg$45;
    }
  };
  const tmpAfterLabel = function () {
    debugger;
    $('tail1');
    $('end');
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
  const tmpIfTest$25 = $(0);
  if (tmpIfTest$25) {
    const tmpReturnArg$27 = tmpLabeledBlockFunc$3();
    return tmpReturnArg$27;
  } else {
    const tmpReturnArg$33 = tmpAfterLabel();
    return tmpReturnArg$33;
  }
};
const tmpLabeledBlockFunc$3 = function () {
  debugger;
  const tmpIfTest$51 = $(0);
  if (tmpIfTest$51) {
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

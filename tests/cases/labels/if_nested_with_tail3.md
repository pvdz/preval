# Preval test case

# if_nested_with_tail3.md

> Labels > If nested with tail3
>
> Make sure the labeled `if` doesn't screw up transforms

Contrived example for breaking past one level of label inside a trivial if-else structure.

#TODO

## Input

`````js filename=intro
function f() {
  $(0);
  label1: 
    if ($(1)) {
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
  $(0);
  label1: if ($(1)) {
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
    $(0);
    const tmpIfTest$3 = $(1);
    if (tmpIfTest$3) {
      label2: {
        const tmpIfTest$4 = $(0);
        if (tmpIfTest$4) {
          label3: {
            const tmpIfTest$5 = $(0);
            if (tmpIfTest$5) {
              break label2;
            } else {
              break label3;
            }
          }
          $('tail3');
        } else {
          const tmpReturnArg = tmpBranchingC();
          return tmpReturnArg;
        }
      }
      $('tail2');
    }
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpReturnArg$2 = tmpLabeledBlockFunc();
  return tmpReturnArg$2;
};
f();
`````

## Output

`````js filename=intro
const tmpBranchingC = function () {
  $('tail1');
  $('end');
};
const tmpLabeledBlockFunc = function () {
  $(0);
  const tmpIfTest$3 = $(1);
  if (tmpIfTest$3) {
    label2: {
      const tmpIfTest$4 = $(0);
      if (tmpIfTest$4) {
        label3: {
          const tmpIfTest$5 = $(0);
          if (tmpIfTest$5) {
            break label2;
          } else {
            break label3;
          }
        }
        $('tail3');
      } else {
        const tmpReturnArg = tmpBranchingC();
        return tmpReturnArg;
      }
    }
    $('tail2');
  }
  const tmpReturnArg$1 = tmpBranchingC();
  return tmpReturnArg$1;
};
tmpLabeledBlockFunc();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 0
 - 4: 'tail1'
 - 5: 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

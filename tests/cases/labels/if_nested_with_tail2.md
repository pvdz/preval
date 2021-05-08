# Preval test case

# if_nested_with_tail2.md

> Labels > If nested with tail2
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
        if ($(2)) {
          label3:
            if ($(0)) {
              break label2;
            } else {
              break label3;
            }
          $('tail3'); // Do not DCE me
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
  $(0);
  label1: if ($(1)) {
    label2: if ($(2)) {
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
  $(0);
  const tmpLabeledBlockFunc = function () {
    debugger;
    const tmpIfTest$5 = $(1);
    if (tmpIfTest$5) {
      label2$1: {
        const tmpIfTest$7 = $(2);
        if (tmpIfTest$7) {
          label3$1: {
            const tmpIfTest$9 = $(0);
            if (tmpIfTest$9) {
              break label2$1;
            } else {
              break label3$1;
            }
          }
          $('tail3');
        } else {
          const tmpReturnArg = tmpAfterLabel();
          return tmpReturnArg;
        }
      }
      $('tail2');
    } else {
    }
    const tmpReturnArg$1 = tmpAfterLabel();
    return tmpReturnArg$1;
  };
  const tmpAfterLabel = function () {
    debugger;
    $('tail1');
    $('end');
    return undefined;
  };
  const tmpReturnArg$3 = tmpLabeledBlockFunc();
  return tmpReturnArg$3;
};
f();
`````

## Output

`````js filename=intro
const tmpAfterLabel = function () {
  debugger;
  $('tail1');
  $('end');
  return undefined;
};
const f = function () {
  debugger;
  $(0);
  const tmpIfTest$5 = $(1);
  if (tmpIfTest$5) {
    label2$1: {
      const tmpIfTest$7 = $(2);
      if (tmpIfTest$7) {
        label3$1: {
          const tmpIfTest$9 = $(0);
          if (tmpIfTest$9) {
            break label2$1;
          } else {
            break label3$1;
          }
        }
        $('tail3');
      } else {
        tmpAfterLabel();
        return undefined;
      }
    }
    $('tail2');
  } else {
  }
  tmpAfterLabel();
  return undefined;
};
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 2
 - 4: 0
 - 5: 'tail3'
 - 6: 'tail2'
 - 7: 'tail1'
 - 8: 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

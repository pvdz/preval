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
      $(`tail3`);
    } else {
      break label1;
    }
    $(`tail2`);
  }
  $(`tail1`);
  $(`end`);
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
    if (tmpIfTest$5) {
      label2$1: {
        const tmpIfTest$7 = $(0);
        if (tmpIfTest$7) {
          label3$1: {
            const tmpIfTest$9 = $(0);
            if (tmpIfTest$9) {
              break label2$1;
            } else {
              break label3$1;
            }
          }
          $(`tail3`);
        } else {
          const tmpReturnArg = tmpAfterLabel();
          return tmpReturnArg;
        }
      }
      $(`tail2`);
    } else {
    }
    const tmpReturnArg$1 = tmpAfterLabel();
    return tmpReturnArg$1;
  };
  const tmpAfterLabel = function () {
    debugger;
    $(`tail1`);
    $(`end`);
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
  $(`tail1`);
  $(`end`);
  return undefined;
};
const f = function () {
  debugger;
  $(100);
  const tmpIfTest$5 = $(0);
  if (tmpIfTest$5) {
    const tmpIfTest$7 = $(0);
    if (tmpIfTest$7) {
      const tmpIfTest$9 = $(0);
      if (tmpIfTest$9) {
      } else {
        $(`tail3`);
      }
      $(`tail2`);
    } else {
      tmpAfterLabel();
      return undefined;
    }
  } else {
  }
  tmpAfterLabel();
  return undefined;
};
f();
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "tail1" );
  $( "end" );
  return undefined;
};
const b = function() {
  debugger;
  $( 100 );
  const c = $( 0 );
  if (c) {
    const d = $( 0 );
    if (d) {
      const e = $( 0 );
      if (e) {

      }
      else {
        $( "tail3" );
      }
      $( "tail2" );
    }
    else {
      a();
      return undefined;
    }
  }
  a();
  return undefined;
};
b();
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

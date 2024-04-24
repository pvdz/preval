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
  debugger;
  $(0);
  label1: if ($(1)) {
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
  const tmpAfterLabel = function () {
    debugger;
    $(`tail1`);
    $(`end`);
    return undefined;
  };
  $(0);
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    label2: {
      const tmpIfTest$1 = $(0);
      if (tmpIfTest$1) {
        label3: {
          const tmpIfTest$3 = $(0);
          if (tmpIfTest$3) {
            break label2;
          } else {
            break label3;
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
  $(0);
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(0);
    if (tmpIfTest$1) {
      const tmpIfTest$3 = $(0);
      if (tmpIfTest$3) {
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
  $( 0 );
  const c = $( 1 );
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
 - 1: 0
 - 2: 1
 - 3: 0
 - 4: 'tail1'
 - 5: 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

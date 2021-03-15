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
  $(100);
  label1: {
    const tmpIfTest = $(0);
    if (tmpIfTest) {
      label2: {
        const tmpIfTest$1 = $(0);
        if (tmpIfTest$1) {
          label3: {
            const tmpIfTest$2 = $(0);
            if (tmpIfTest$2) {
              break label2;
            } else {
              break label3;
            }
          }
          $('tail3');
        } else {
          break label1;
        }
      }
      $('tail2');
    }
  }
  $('tail1');
  $('end');
};
f();
`````

## Output

`````js filename=intro
const f = function () {
  $(100);
  label1: {
    const tmpIfTest = $(0);
    if (tmpIfTest) {
      label2: {
        const tmpIfTest$1 = $(0);
        if (tmpIfTest$1) {
          label3: {
            const tmpIfTest$2 = $(0);
            if (tmpIfTest$2) {
              break label2;
            } else {
              break label3;
            }
          }
          $('tail3');
        } else {
          break label1;
        }
      }
      $('tail2');
    }
  }
  $('tail1');
  $('end');
};
f();
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

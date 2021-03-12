# Preval test case

# if_nested_with_tail.md

> Labels > If nested with tail
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
            if ($(3)) {
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

## Normalized

`````js filename=intro
let f = function () {
  $(0);
  label1: {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      label2: {
        const tmpIfTest$1 = $(2);
        if (tmpIfTest$1) {
          label3: {
            const tmpIfTest$2 = $(3);
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
  $(0);
  label1: {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      label2: {
        const tmpIfTest$1 = $(2);
        if (tmpIfTest$1) {
          label3: {
            const tmpIfTest$2 = $(3);
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
 - 1: 0
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 'tail2'
 - 6: 'tail1'
 - 7: 'end'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
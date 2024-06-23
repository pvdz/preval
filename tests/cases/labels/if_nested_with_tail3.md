# Preval test case

# if_nested_with_tail3.md

> Labels > If nested with tail3
>
> Make sure the labeled `if` doesn't screw up transforms

Contrived example for breaking past one level of label inside a trivial if-else structure.

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
  label1: {
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
          break label1;
        }
      }
      $(`tail2`);
    } else {
    }
  }
  $(`tail1`);
  $(`end`);
  return undefined;
};
f();
`````

## Output


`````js filename=intro
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
  }
} else {
}
$(`tail1`);
$(`end`);
`````

## PST Output

With rename=true

`````js filename=intro
$( 0 );
const a = $( 1 );
if (a) {
  const b = $( 0 );
  if (b) {
    const c = $( 0 );
    if (c) {

    }
    else {
      $( "tail3" );
    }
    $( "tail2" );
  }
}
$( "tail1" );
$( "end" );
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

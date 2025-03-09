# Preval test case

# if_nested_with_tail4.md

> Labels > If nested with tail4
>
> Make sure the labeled `if` doesn't screw up transforms

Contrived example for breaking past one level of label inside a trivial if-else structure.

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

## Settled


`````js filename=intro
$(100);
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(0);
  if (tmpIfTest$1) {
    const tmpIfTest$3 /*:unknown*/ = $(0);
    if (tmpIfTest$3) {
      $(`tail2`);
      $(`tail1`);
      $(`end`);
    } else {
      $(`tail3`);
      $(`tail2`);
      $(`tail1`);
      $(`end`);
    }
  } else {
    $(`tail1`);
    $(`end`);
  }
} else {
  $(`tail1`);
  $(`end`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
if ($(0)) {
  if ($(0)) {
    if ($(0)) {
      $(`tail2`);
      $(`tail1`);
      $(`end`);
    } else {
      $(`tail3`);
      $(`tail2`);
      $(`tail1`);
      $(`end`);
    }
  } else {
    $(`tail1`);
    $(`end`);
  }
} else {
  $(`tail1`);
  $(`end`);
}
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
  label1: {
    $(100);
    const tmpIfTest = $(0);
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

## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = $( 0 );
if (a) {
  const b = $( 0 );
  if (b) {
    const c = $( 0 );
    if (c) {
      $( "tail2" );
      $( "tail1" );
      $( "end" );
    }
    else {
      $( "tail3" );
      $( "tail2" );
      $( "tail1" );
      $( "end" );
    }
  }
  else {
    $( "tail1" );
    $( "end" );
  }
}
else {
  $( "tail1" );
  $( "end" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 0
 - 3: 'tail1'
 - 4: 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

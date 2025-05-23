# Preval test case

# if_nested_with_tail2.md

> Labels > If nested with tail2
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


## Settled


`````js filename=intro
$(0);
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(2);
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
$(0);
if ($(1)) {
  if ($(2)) {
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


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
const a = $( 1 );
if (a) {
  const b = $( 2 );
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  label1: {
    $(0);
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      label2: {
        const tmpIfTest$1 = $(2);
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


## Todos triggered


None


## Globals


None


## Runtime Outcome


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

Post settled calls: Same

Denormalized calls: Same

# Preval test case

# if_nested_with_tail.md

> Labels > If nested with tail
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


## Settled


`````js filename=intro
$(0);
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(2);
  if (tmpIfTest$1) {
    const tmpIfTest$3 /*:unknown*/ = $(3);
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
    if ($(3)) {
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
    const c = $( 3 );
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


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 'tail2'
 - 6: 'tail1'
 - 7: 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

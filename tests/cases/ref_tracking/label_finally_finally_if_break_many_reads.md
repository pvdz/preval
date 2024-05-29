# Preval test case

# label_finally_finally_if_break_many_reads.md

> Ref tracking > Label finally finally if break many reads
> 
> A break that travels through two finally nodes before reaching its label.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
back: {
  try {
    $('try1', x);          // x=1
    x = 2;
  } finally {
    $('final1', x);        // x=1 2
    x = 3;
    try {
      $('try2', x);        // x=3
      x = 4;
      if ($1) {
        $('if', x);        // x=4
        x = 5;
        break back;
      }
      $('post-if', x);     // x=4
      x = 6;
    } finally {
      $('final2', x);      // x=3 4 5 6
      x = 7;
    }
    $('post-final2', x);   // x=7
    x = 8;
  }
  $('post-final1', x);     // x=8
  x = 9;
}
$('end', x);               // x=7 9
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
back___7__: /*8*/ {
  try /*10*/ {
    $(`try1`, x___16__);
    x___20__ = 2;
  } finally /*21*/ {
    $(`final1`, x___27__);
    x___31__ = 3;
    try /*33*/ {
      $(`try2`, x___39__);
      x___43__ = 4;
      if ($1) {
        /*46*/ $(`if`, x___52__);
        x___56__ = 5;
        break back___58__;
      } /*59*/ else {
        $(`post-if`, x___65__);
        x___69__ = 6;
      }
    } finally /*70*/ {
      $(`final2`, x___76__);
      x___80__ = 7;
    }
    $(`post-final2`, x___86__);
    x___90__ = 8;
  }
  $(`post-final1`, x___96__);
  x___100__ = 9;
}
$(`end`, x___106__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 16,27       | none           | 20,31
  - r @16      | 4
  - w @20      | ########## | 27          | 4              | 31
  - r @27      | 4,20
  - w @31      | ########## | 39,76       | 4,20           | 43,80
  - r @39      | 31
  - w @43      | ########## | 52,65,76    | 31             | 56,69,80
  - r @52      | 43
  - w @56      | ########## | 76          | 43             | 80
  - r @65      | 43
  - w @69      | ########## | 76          | 43             | 80
  - r @76      | 31,43,56,69
  - w @80      | ########## | 86,106      | 31,43,56,69    | 90
  - r @86      | 80
  - w @90      | ########## | 96          | 80             | 100
  - r @96      | 90
  - w @100     | ########## | 106         | 90             | none
  - r @106     | 80,100

# Preval test case

# label_finally_finally_if_break_finally_read.md

> Ref tracking > Label finally finally if break finally read
> 
> A break that travels through two finally nodes before reaching its label.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;             // overwritten by x=2 and x=3
back: {
  try {
    x = 2;             // overwritten by x=3 (not x=9 because that's only possible by a throw in the finally, which would skip x=9)
  } finally {
    $();
    x = 3;
    try {
      x = 4;
      if ($()) {
        x = 5;
        break back;
      }
      x = 6;
    } finally {
      $('final', x);   // x=3 4 5 6
      x = 7;
    }
    x = 8;
  }
  x = 9;
}
$(x);                  // x=7 9 (8 is overwritten by 9 but 7 may jump over it) 
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
back___7__: /*8*/ {
  try /*10*/ {
    x___14__ = 2;
  } finally /*15*/ {
    $();
    x___22__ = 3;
    try /*24*/ {
      x___28__ = 4;
      const tmpIfTest___31__ = $();
      if (tmpIfTest___35__) {
        /*36*/ x___40__ = 5;
        break back___42__;
      } /*43*/ else {
        x___47__ = 6;
      }
    } finally /*48*/ {
      $(`final`, x___54__);
      x___58__ = 7;
    }
    x___62__ = 8;
  }
  x___66__ = 9;
}
$(x___70__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 14,22
  - w @14      | ########## | not read    | 4              | 22
  - w @22      | ########## | 54          | 4,14           | 28,58
  - w @28      | ########## | 54          | 22             | 40,47,58
  - w @40      | ########## | 54          | 28             | 58
  - w @47      | ########## | 54          | 28             | 58
  - r @54      | 22,28,40,47
  - w @58      | ########## | 70          | 22,28,40,47    | 62
  - w @62      | ########## | not read    | 58             | 66
  - w @66      | ########## | 70          | 62             | none
  - r @70      | 58,66

tmpIfTest:
  - w @31      | ########## | 35          | none           | none
  - r @35      | 31

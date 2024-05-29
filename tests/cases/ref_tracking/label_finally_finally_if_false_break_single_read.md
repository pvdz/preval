# Preval test case

# label_finally_finally_if_false_break_single_read.md

> Ref tracking > Label finally finally if false break single read
> 
> A break that travels through two finally nodes before reaching its label.
> 
> This was actually a regression as the whole thing was collapsed, eliminating the label and if completely so the condition was ignored.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
back: {
  try {
    x = 2;
  } finally {
    x = 3;
    try {
      x = 4;
      if ($(false)) {
        x = 5;
        break back;
      }
      x = 6;
    } finally {
      x = 7;
    }
    x = 8;
  }
  x = 9;
}
$(x); // x=7 9 (the 7 jumps over the x=9, 9 overwrites everything else)
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
back___7__: /*8*/ {
  try /*10*/ {
    x___14__ = 2;
  } finally /*15*/ {
    x___19__ = 3;
    try /*21*/ {
      x___25__ = 4;
      const tmpIfTest___28__ = $(false);
      if (tmpIfTest___33__) {
        /*34*/ x___38__ = 5;
        break back___40__;
      } /*41*/ else {
        x___45__ = 6;
      }
    } finally /*46*/ {
      x___50__ = 7;
    }
    x___54__ = 8;
  }
  x___58__ = 9;
}
$(x___62__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 14,19
  - w @14      | ########## | not read    | 4              | 19
  - w @19      | ########## | not read    | 4,14           | 25,50
  - w @25      | ########## | not read    | 19             | 38,45,50
  - w @38      | ########## | not read    | 25             | 50
  - w @45      | ########## | not read    | 25             | 50
  - w @50      | ########## | 62          | 19,25,38,45    | 54
  - w @54      | ########## | not read    | 50             | 58
  - w @58      | ########## | 62          | 54             | none
  - r @62      | 50,58

tmpIfTest:
  - w @28      | ########## | 33          | none           | none
  - r @33      | 28

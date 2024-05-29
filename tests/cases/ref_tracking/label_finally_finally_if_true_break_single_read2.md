# Preval test case

# label_finally_finally_if_true_break_single_read2.md

> Ref tracking > Label finally finally if true break single read2
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
  x = 3;
  try {
    x = 4;
    if ($(true)) {
      x = 5;
      break back;
    }
    x = 6;
  } finally {
    x = 7;
  }
  x = 8;
}
$(x); // x=7 8
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
back___7__: /*8*/ {
  x___12__ = 3;
  try /*14*/ {
    x___18__ = 4;
    const tmpIfTest___21__ = $(true);
    if (tmpIfTest___26__) {
      /*27*/ x___31__ = 5;
      break back___33__;
    } /*34*/ else {
      x___38__ = 6;
    }
  } finally /*39*/ {
    x___43__ = 7;
  }
  x___47__ = 8;
}
$(x___51__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 12
  - w @12      | ########## | not read    | 4              | 18,43
  - w @18      | ########## | not read    | 12             | 31,38,43
  - w @31      | ########## | not read    | 18             | 43
  - w @38      | ########## | not read    | 18             | 43
  - w @43      | ########## | 51          | 12,18,31,38    | 47
  - w @47      | ########## | 51          | 43             | none
  - r @51      | 43,47

tmpIfTest:
  - w @21      | ########## | 26          | none           | none
  - r @26      | 21

# Preval test case

# try_break_goto7.md

> Ref tracking > Tofix > Try break goto7
>
> The entryReads and entryWrites for a Try must be propagated which is relevant for loops.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
$(x);
A: {
  while (true) {
    $(x);   // x=1 (while does not loop)
    x = 2;
    break;
  }
  break A;
}
$(x);         // x=2
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
$(x___9__);
A___11__: /*12*/ {
  while (true) {
    /*15*/ $(x___19__);
    x___23__ = 2;
    break;
  }
  break A___26__;
}
$(x___30__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,19        | none           | 23
  - r @9       | 4
  - r @19      | 4
  - w @23      | ########## | 30          | 4              | none
  - r @30      | 23

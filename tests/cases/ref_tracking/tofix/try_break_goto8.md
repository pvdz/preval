# Preval test case

# try_break_goto8.md

> Ref tracking > Tofix > Try break goto8
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
    $finally: {
      try {
        $(x); // x=1 (while does not loop)
        x = 2;
        break $finally;
      } catch (_) {
      }
    }
    $(x);     // x=1 2 (may never reach x=2)
    if ($) {
      x = 3;
      break A;
    }
  }
  $(x);       // unreachable
  x = 4;      // unreachable
}
$(x);         // x=3 (loop can only break after x=3)
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
$(x___9__);
A___11__: /*12*/ {
  while (true) {
    /*15*/ $finally___17__: /*18*/ {
      try /*20*/ {
        $(x___24__);
        x___28__ = 2;
        break $finally___30__;
      } catch (____32__) /*33*/ {}
    }
    $(x___37__);
    if ($) {
      /*40*/ x___44__ = 3;
      break A___46__;
    } /*47*/ else {
    }
  }
  $(x___51__);
  x___55__ = 4;
}
$(x___59__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,24,37     | none           | 28,44
  - r @9       | 4
  - r @24      | 4,28
  - w @28      | ########## | 24,37       | 4,28           | 28,44
  - r @37      | 4,28
  - w @44      | ########## | 59          | 4,28           | none
  - r @51      | none (unreachable?)
  - w @55      | ########## | 59          | none           | none
  - r @59      | 44,55

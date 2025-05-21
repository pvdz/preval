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
while (true) {
  /*12*/ $finally___14__: /*15*/ {
    try /*17*/ {
      $(x___21__);
      x___25__ = 2;
      break $finally___27__;
    } catch (____29__) /*30*/ {}
  }
  $(x___34__);
  if ($) {
    /*37*/ x___41__ = 3;
    break;
  } /*43*/ else {
  }
}
$(x___47__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,21,34     | none           | 25,41
  - r @9       | 4
  - r @21      | 4,25
  - w @25      | ########## | 21,34       | 4,25           | 25,41
  - r @34      | 4,25
  - w @41      | ########## | 47          | 4,25           | none
  - r @47      | 41

_:
  - w @29      | ########## | not read    | none           | none

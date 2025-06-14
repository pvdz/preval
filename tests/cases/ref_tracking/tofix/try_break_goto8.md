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
let /*___4__*/ x = 1;
$(/*___9__*/ x);
while (true) {
  /*12~43*/ /*___14__*/ $finally: /*15~30*/ {
    try /*17~27*/ {
      $(/*___21__*/ x);
      /*___25__*/ x = 2;
      break /*___27__*/ $finally;
    } catch (/*___29__*/ _) /*30~30*/ {}
  }
  $(/*___34__*/ x);
  if ($) {
    /*37~42*/ /*___41__*/ x = 3;
    break;
  } /*43~43*/ else {
  }
}
$(/*___47__*/ x);
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

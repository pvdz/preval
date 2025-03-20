# Preval test case

# try_break_goto4.md

> Ref tracking > Tofix > Try break goto4
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
    $(x);     // x=1 2 (may never reach x=2 and then x=1)
    x = 3;
    break A;
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
$finally___7__: /*8*/ {
  $(x___12__);
  try /*14*/ {
    $(x___18__);
    x___22__ = 2;
    break $finally___24__;
  } catch (____26__) /*27*/ {}
}
$(x___31__);
x___35__ = 3;
$(x___39__);
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12,18,31    | none           | 22,35
  - r @12      | 4
  - r @18      | 4
  - w @22      | ########## | 31          | 4              | 35
  - r @31      | 4,22
  - w @35      | ########## | 39          | 4,22           | none
  - r @39      | 35

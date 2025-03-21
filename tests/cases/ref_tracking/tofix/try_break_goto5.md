# Preval test case

# try_break_goto5.md

> Ref tracking > Tofix > Try break goto5
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
    try {
      $(x);   // x=1 (while does not loop)
      x = 2;
    } catch (_) {
    }
    $(x);     // x=1 2 (may never reach x=2 and then x=1)
    x = 3;
    break A;
  }
}
$(x);         // x=3
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
$(x___9__);
try /*11*/ {
  $(x___15__);
  x___19__ = 2;
} catch (____21__) /*22*/ {}
$(x___26__);
x___30__ = 3;
$(x___34__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,15,26     | none           | 19,30
  - r @9       | 4
  - r @15      | 4
  - w @19      | ########## | 26          | 4              | 30
  - r @26      | 4,19
  - w @30      | ########## | 34          | 4,19           | none
  - r @34      | 30

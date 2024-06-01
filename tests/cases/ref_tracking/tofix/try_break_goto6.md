# Preval test case

# try_break_goto6.md

> Ref tracking > Tofix > Try break goto6
>
> The entryReads and entryWrites for a Try must be propagated which is relevant for loops.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
$(x);
while (true) {
  try {
    $(x);   // x=1 (while does not loop)
    x = 2;
  } catch (_) {
  }
  $(x);     // x=1 2 (may never reach x=2 and then x=1)
  x = 3;
  break;
}
$(x);         // x=3
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
$(x___9__);
while (true) {
  /*12*/ try /*14*/ {
    $(x___18__);
    x___22__ = 2;
  } catch (____24__) /*25*/ {}
  $(x___29__);
  x___33__ = 3;
  break;
}
$(x___38__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,18,29     | none           | 22,33
  - r @9       | 4
  - r @18      | 4
  - w @22      | ########## | 29          | 4              | 33
  - r @29      | 4,22
  - w @33      | ########## | 38          | 4,22           | none
  - r @38      | 33

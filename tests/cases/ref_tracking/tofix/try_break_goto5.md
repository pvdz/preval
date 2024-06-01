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
A___11__: /*12*/ {
  while (true) {
    /*15*/ try /*17*/ {
      $(x___21__);
      x___25__ = 2;
    } catch (____27__) /*28*/ {}
    $(x___32__);
    x___36__ = 3;
    break A___38__;
  }
}
$(x___42__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,21,32,42  | none           | 25,36
  - r @9       | 4
  - r @21      | 4
  - w @25      | ########## | 32          | 4              | 36
  - r @32      | 4,25
  - w @36      | ########## | 42          | 4,25           | none
  - r @42      | 4,36

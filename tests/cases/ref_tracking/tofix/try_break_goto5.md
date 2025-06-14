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
let /*___4__*/ x = 1;
$(/*___9__*/ x);
try /*11~19*/ {
  $(/*___15__*/ x);
  /*___19__*/ x = 2;
} catch (/*___21__*/ _) /*22~22*/ {}
$(/*___26__*/ x);
/*___30__*/ x = 3;
$(/*___34__*/ x);
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

_:
  - w @21      | ########## | not read    | none           | none

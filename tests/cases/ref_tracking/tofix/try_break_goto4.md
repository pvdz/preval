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
let /*___4__*/ x = 1;
/*___7__*/ $finally: /*8~27*/ {
  $(/*___12__*/ x);
  try /*14~24*/ {
    $(/*___18__*/ x);
    /*___22__*/ x = 2;
    break /*___24__*/ $finally;
  } catch (/*___26__*/ _) /*27~27*/ {}
}
$(/*___31__*/ x);
/*___35__*/ x = 3;
$(/*___39__*/ x);
`````


## Todos triggered


None


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

_:
  - w @26      | ########## | not read    | none           | none

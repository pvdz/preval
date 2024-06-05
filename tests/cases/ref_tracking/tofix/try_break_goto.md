# Preval test case

# try_break_goto.md

> Ref tracking > Tofix > Try break goto
>
> The entryReads and entryWrites for a Try must be propagated which is relevant for loops.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x);         // x=1
  A: {
    while (true) {
      try {
        $(x);   // x=1
        x = 2;
        break;  // This would schedule a continuation to after the while
      } finally {
        $(x);   // x=1 2
        x = 3;  // Not visible to the next read
        break A; // This re (!) schedules the continuation to after A instead
      }
    }
    $(x);       // unreachable
    x = 4;      // unreachable
  }
  $(x);         // x=3
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
$(x___9__);
let $implicitThrow___12__ = false;
let $finalStep___16__ = false;
let $finalCatchArg___20__ = undefined___21__;
$finally___23__: /*24*/ {
  try /*26*/ {
    $(x___30__);
    x___34__ = 2;
    $finalStep___38__ = true;
    break $finally___40__;
  } catch ($finalImplicit___42__) /*43*/ {
    $implicitThrow___47__ = true;
    $finalCatchArg___51__ = $finalImplicit___50__;
  }
}
$(x___55__);
x___59__ = 3;
$(x___63__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,30,55     | none           | 34,59
  - r @9       | 4
  - r @30      | 4
  - w @34      | ########## | 55          | 4              | 59
  - r @55      | 4,34
  - w @59      | ########## | 63          | 4,34           | none
  - r @63      | 59

$implicitThrow:
  - w @12          | ########## | not read    | none           | 47
  - w @47          | ########## | not read    | 12             | none

$finalStep:
  - w @16          | ########## | not read    | none           | 38
  - w @38          | ########## | not read    | 16             | none

$finalCatchArg:
  - w @20          | ########## | not read    | none           | 51
  - w @51          | ########## | not read    | 20             | none

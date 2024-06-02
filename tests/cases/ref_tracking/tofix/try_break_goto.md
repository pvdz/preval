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
A___11__: /*12*/ {
  while (true) {
    /*15*/ let $implicitThrow___18__ = false;
    let $finalStep___22__ = false;
    let $finalCatchArg___26__ = undefined___27__;
    $finally___29__: /*30*/ {
      try /*32*/ {
        $(x___36__);
        x___40__ = 2;
        $finalStep___44__ = true;
        break $finally___46__;
      } catch ($finalImplicit___48__) /*49*/ {
        $implicitThrow___53__ = true;
        $finalCatchArg___57__ = $finalImplicit___56__;
      }
    }
    $(x___61__);
    x___65__ = 3;
    break A___67__;
  }
  $(x___71__);
  x___75__ = 4;
}
$(x___79__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,36,61     | none           | 40,65
  - r @9       | 4
  - r @36      | 4
  - w @40      | ########## | 61          | 4              | 65
  - r @61      | 4,40
  - w @65      | ########## | 79          | 4,40           | none
  - r @71      | none (unreachable?)
  - w @75      | ########## | 79          | none           | none
  - r @79      | 65,75

$implicitThrow:
  - w @18          | ########## | not read    | none           | 53
  - w @53          | ########## | not read    | 18             | none

$finalStep:
  - w @22          | ########## | not read    | none           | 44
  - w @44          | ########## | not read    | 22             | none

$finalCatchArg:
  - w @26          | ########## | not read    | none           | 57
  - w @57          | ########## | not read    | 26             | none

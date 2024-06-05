# Preval test case

# try_loop_entry1.md

> Ref tracking > Tofix > Try loop entry1
>
> The entryReads and entryWrites for a Try must be propagated which is relevant for loops.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x);       // x=1
  while (true) {
    try {
      $(x);   // x=1
    } finally {
      $(x);   // x=1
      x = 2;  // Does not overwrite itself because it does not loop
      break;
    }
  }
  $(x);       // x=2
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
$(x___9__);
let $implicitThrow___12__ = false;
let $finalCatchArg___16__ = undefined___17__;
try /*19*/ {
  $(x___23__);
} catch ($finalImplicit___25__) /*26*/ {
  $implicitThrow___30__ = true;
  $finalCatchArg___34__ = $finalImplicit___33__;
}
$(x___38__);
x___42__ = 2;
$(x___46__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,23,38     | none           | 42
  - r @9       | 4
  - r @23      | 4
  - r @38      | 4
  - w @42      | ########## | 46          | 4              | none
  - r @46      | 42

$implicitThrow:
  - w @12          | ########## | not read    | none           | 30
  - w @30          | ########## | not read    | 12             | none

$finalCatchArg:
  - w @16          | ########## | not read    | none           | 34
  - w @34          | ########## | not read    | 16             | none

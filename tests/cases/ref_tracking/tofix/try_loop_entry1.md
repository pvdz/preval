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
let /*___6__*/ x = 1;
$(/*___11__*/ x);
let /*___13__*/ $implicitThrow = false;
let /*___16__*/ $finalCatchArg = /*___17__*/ undefined;
try /*19~23*/ {
  $(/*___23__*/ x);
} catch (/*___25__*/ $finalImplicit) /*26~34*/ {
  /*___30__*/ $implicitThrow = true;
  /*___34__*/ $finalCatchArg = /*___33__*/ $finalImplicit;
}
$(/*___38__*/ x);
/*___42__*/ x = 2;
$(/*___46__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @6       | ########## | 11,23,38    | none           | 42
  - r @11      | 6
  - r @23      | 6
  - r @38      | 6
  - w @42      | ########## | 46          | 6              | none
  - r @46      | 42

$implicitThrow:
  - w @13          | ########## | not read    | none           | 30
  - w @30          | ########## | not read    | 13             | none

$finalCatchArg:
  - w @16          | ########## | not read    | none           | 34
  - w @34          | ########## | not read    | 16             | none

$finalImplicit:
  - w @25          | ########## | 33          | none           | none
  - r @33          | 25

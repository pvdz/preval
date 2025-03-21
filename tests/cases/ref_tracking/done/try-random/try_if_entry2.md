# Preval test case

# try_if_entry2.md

> Ref tracking > Done > Try-random > Try if entry2
>
> The entryReads and entryWrites for a Try must be propagated which is relevant for loops.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x); // x=1
  while (true) {
    try {
      if ($) {
        $(x);
        x = 2; // Does overwrite itself
      }
    } catch {
      
    }
  }
  $(x); // unreachable
}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
$(x___9__);
while (true) {
  /*12*/ try /*14*/ {
    if ($) {
      /*17*/ $(x___21__);
      x___25__ = 2;
    } /*26*/ else {
    }
  } catch (e___28__) /*29*/ {}
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,21        | none           | 25
  - r @9       | 4
  - r @21      | 4,25
  - w @25      | ########## | 21          | 4,25           | 25

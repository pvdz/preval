# Preval test case

# try_if_entry4.md

> Ref tracking > Done > Try-random > Try if entry4
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
      $(x);
    } catch {
      if ($) {
        $(x);
        x = 2; // Does overwrite itself
      }
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
    $(x___18__);
  } catch (e___20__) /*21*/ {
    if ($) {
      /*24*/ $(x___28__);
      x___32__ = 2;
    } /*33*/ else {
    }
  }
}
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,18,28     | none           | 32
  - r @9       | 4
  - r @18      | 4,32
  - r @28      | 4,32
  - w @32      | ########## | 18,28       | 4,32           | 32

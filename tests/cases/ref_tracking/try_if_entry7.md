# Preval test case

# try_if_entry7.md

> Ref tracking > Try if entry7
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
    x = 2;
    try {
      $(x);
    } finally {
      if ($) {
        $(x);
        x = 3; // Does not overwrite itself
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
  /*12*/ x___16__ = 2;
  try /*18*/ {
    $(x___22__);
  } finally /*23*/ {
    if ($) {
      /*26*/ $(x___30__);
      x___34__ = 3;
    } /*35*/ else {
    }
  }
}
$(x___39__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,39        | none           | 16
  - r @9       | 4
  - w @16      | ########## | 22,30       | 4,16,34        | 16,34
  - r @22      | 16
  - r @30      | 16
  - w @34      | ########## | not read    | 16             | 16
  - r @39      | 4

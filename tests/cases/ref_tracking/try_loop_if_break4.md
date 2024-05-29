# Preval test case

# try_loop_if_break4.md

> Ref tracking > Try loop if break4
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
      if ($1) {
        break;
      }
      x = 2;  // Does not overwrite itself because it does not loop
      $(x);   // x=2
      break;
    }
  }
  $(x);       // x=1 2
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
  } finally /*19*/ {
    $(x___23__);
    if ($1) {
      /*26*/ break;
    } /*28*/ else {
      x___32__ = 2;
      $(x___36__);
      break;
    }
  }
}
$(x___41__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,18,23,41  | none           | 32
  - r @9       | 4
  - r @18      | 4
  - r @23      | 4
  - w @32      | ########## | 36,41       | 4              | none
  - r @36      | 32
  - r @41      | 4,32

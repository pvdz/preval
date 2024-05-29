# Preval test case

# try_loop_if_break1.md

> Ref tracking > Try loop if break1
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
        x = 2;  // Does not overwrite itself because it does not loop
        break;
      }
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
while (true) {
  /*12*/ try /*14*/ {
    $(x___18__);
  } finally /*19*/ {
    $(x___23__);
    if ($1) {
      /*26*/ x___30__ = 2;
      break;
    } /*32*/ else {
    }
  }
}
$(x___36__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,18,23     | none           | 30
  - r @9       | 4
  - r @18      | 4
  - r @23      | 4
  - w @30      | ########## | 36          | 4              | none
  - r @36      | 30

# Preval test case

# try_loop_entry4.md

> Ref tracking > Try loop entry4
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
      x = 2;  // Does not overwrite itself because it does not loop
      break;
    } finally {
      $(x);   // x=1 2
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
    x___22__ = 2;
    break;
  } finally /*24*/ {
    $(x___28__);
  }
}
$(x___32__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,18,28     | none           | 22
  - r @9       | 4
  - r @18      | 4
  - w @22      | ########## | 28,32       | 4              | none
  - r @28      | 4,22
  - r @32      | 22

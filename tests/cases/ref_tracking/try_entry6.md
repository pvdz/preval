# Preval test case

# try_entry6.md

> Ref tracking > Try entry6
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
      x = 2; // Does overwrite itself
    } finally {
      $(x);
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
    x___22__ = 2;
  } finally /*23*/ {
    $(x___27__);
  }
}
$(x___31__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,18,27,31  | none           | 22
  - r @9       | 4
  - r @18      | 4,22
  - w @22      | ########## | 18,27       | 4,22           | 22
  - r @27      | 4,22
  - r @31      | 4

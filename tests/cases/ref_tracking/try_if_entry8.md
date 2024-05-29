# Preval test case

# try_if_entry8.md

> Ref tracking > Try if entry8
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
    } finally {
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
  } finally /*19*/ {
    if ($) {
      /*22*/ $(x___26__);
      x___30__ = 2;
    } /*31*/ else {
    }
  }
}
$(x___35__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,18,26,35  | none           | 30
  - r @9       | 4
  - r @18      | 4,30
  - r @26      | 4,30
  - w @30      | ########## | 18,26       | 4,30           | 30
  - r @35      | 4

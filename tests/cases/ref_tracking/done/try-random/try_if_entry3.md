# Preval test case

# try_if_entry3.md

> Ref tracking > Done > Try-random > Try if entry3
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
    } catch {
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
  } catch (e___24__) /*25*/ {
    if ($) {
      /*28*/ $(x___32__);
      x___36__ = 3;
    } /*37*/ else {
    }
  }
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9           | none           | 16
  - r @9       | 4
  - w @16      | ########## | 22,32       | 4,16,36        | 16,36
  - r @22      | 16
  - r @32      | 16
  - w @36      | ########## | not read    | 16             | 16

e:
  - w @24      | ########## | not read    | none           | none

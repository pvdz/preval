# Preval test case

# try_entry2.md

> Ref tracking > Done > Try-random > Try entry2
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
    } catch {
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
  } catch (e___24__) /*25*/ {
    $(x___29__);
  }
}
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,18,29     | none           | 22
  - r @9       | 4
  - r @18      | 4,22
  - w @22      | ########## | 18,29       | 4,22           | 22
  - r @29      | 4,22

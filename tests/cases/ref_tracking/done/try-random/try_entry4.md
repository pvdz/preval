# Preval test case

# try_entry4.md

> Ref tracking > Done > Try-random > Try entry4
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
      $(x);
      x = 2; // Does overwrite itself
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
    $(x___25__);
    x___29__ = 2;
  }
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,18,25     | none           | 29
  - r @9       | 4
  - r @18      | 4,29
  - r @25      | 4,29
  - w @29      | ########## | 18,25       | 4,29           | 29

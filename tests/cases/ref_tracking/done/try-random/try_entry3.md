# Preval test case

# try_entry3.md

> Ref tracking > Done > Try-random > Try entry3
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
      $(x);
      x = 3; // Does not overwrite itself
    }
  }
  $(x); // unreachable
}
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
$(/*___9__*/ x);
while (true) {
  /*12~33*/ /*___16__*/ x = 2;
  try /*18~22*/ {
    $(/*___22__*/ x);
  } catch (/*___24__*/ e) /*25~33*/ {
    $(/*___29__*/ x);
    /*___33__*/ x = 3;
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
  - w @16      | ########## | 22,29       | 4,16,33        | 16,33
  - r @22      | 16
  - r @29      | 16
  - w @33      | ########## | not read    | 16             | 16

e:
  - w @24      | ########## | not read    | none           | none

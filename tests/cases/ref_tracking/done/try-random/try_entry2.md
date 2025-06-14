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
let /*___4__*/ x = 1;
$(/*___9__*/ x);
while (true) {
  /*12~29*/ try /*14~22*/ {
    $(/*___18__*/ x);
    /*___22__*/ x = 2;
  } catch (/*___24__*/ e) /*25~29*/ {
    $(/*___29__*/ x);
  }
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,18,29     | none           | 22
  - r @9       | 4
  - r @18      | 4,22
  - w @22      | ########## | 18,29       | 4,22           | 22
  - r @29      | 4,22

e:
  - w @24      | ########## | not read    | none           | none

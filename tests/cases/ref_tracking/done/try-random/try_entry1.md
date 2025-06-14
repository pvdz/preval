# Preval test case

# try_entry1.md

> Ref tracking > Done > Try-random > Try entry1
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
      x = 3; // Does not overwrite itself
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
  /*12~33*/ /*___16__*/ x = 2;
  try /*18~26*/ {
    $(/*___22__*/ x);
    /*___26__*/ x = 3;
  } catch (/*___28__*/ e) /*29~33*/ {
    $(/*___33__*/ x);
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
  - w @16      | ########## | 22,33       | 4,16,26        | 16,26
  - r @22      | 16
  - w @26      | ########## | 33          | 16             | 16
  - r @33      | 16,26

e:
  - w @28      | ########## | not read    | none           | none

# Preval test case

# try_if_entry1.md

> Ref tracking > Done > Try-random > Try if entry1
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
      if ($) {
        $(x);
        x = 3; // Does not overwrite itself
      }
    } catch {
      
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
    if ($) {
      /*21*/ $(x___25__);
      x___29__ = 3;
    } /*30*/ else {
    }
  } catch (e___32__) /*33*/ {}
}
$(x___37__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9           | none           | 16
  - r @9       | 4
  - w @16      | ########## | 25          | 4,16,29        | 16,29
  - r @25      | 16
  - w @29      | ########## | not read    | 16             | 16
  - r @37      | none (unreachable?)

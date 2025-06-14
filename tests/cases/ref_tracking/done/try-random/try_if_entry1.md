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
let /*___4__*/ x = 1;
$(/*___9__*/ x);
while (true) {
  /*12~33*/ /*___16__*/ x = 2;
  try /*18~30*/ {
    if ($) {
      /*21~29*/ $(/*___25__*/ x);
      /*___29__*/ x = 3;
    } /*30~30*/ else {
    }
  } catch (/*___32__*/ e) /*33~33*/ {}
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9           | none           | 16
  - r @9       | 4
  - w @16      | ########## | 25          | 4,16,29        | 16,29
  - r @25      | 16
  - w @29      | ########## | not read    | 16             | 16

e:
  - w @32      | ########## | not read    | none           | none

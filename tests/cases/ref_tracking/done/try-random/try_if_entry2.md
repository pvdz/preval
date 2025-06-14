# Preval test case

# try_if_entry2.md

> Ref tracking > Done > Try-random > Try if entry2
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
      if ($) {
        $(x);
        x = 2; // Does overwrite itself
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
  /*12~29*/ try /*14~26*/ {
    if ($) {
      /*17~25*/ $(/*___21__*/ x);
      /*___25__*/ x = 2;
    } /*26~26*/ else {
    }
  } catch (/*___28__*/ e) /*29~29*/ {}
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,21        | none           | 25
  - r @9       | 4
  - r @21      | 4,25
  - w @25      | ########## | 21          | 4,25           | 25

e:
  - w @28      | ########## | not read    | none           | none

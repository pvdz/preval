# Preval test case

# try_if_entry4.md

> Ref tracking > Done > Try-random > Try if entry4
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
let /*___4__*/ x = 1;
$(/*___9__*/ x);
while (true) {
  /*12~33*/ try /*14~18*/ {
    $(/*___18__*/ x);
  } catch (/*___20__*/ e) /*21~33*/ {
    if ($) {
      /*24~32*/ $(/*___28__*/ x);
      /*___32__*/ x = 2;
    } /*33~33*/ else {
    }
  }
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,18,28     | none           | 32
  - r @9       | 4
  - r @18      | 4,32
  - r @28      | 4,32
  - w @32      | ########## | 18,28       | 4,32           | 32

e:
  - w @20      | ########## | not read    | none           | none

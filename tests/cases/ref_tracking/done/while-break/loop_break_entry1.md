# Preval test case

# loop_break_entry1.md

> Ref tracking > Done > While-break > Loop break entry1
>
> The entryReads and entryWrites for a Try must be propagated which is relevant for loops.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x);       // x=1
  while (true) {
    if ($) {
      $(x);   // x=1
      x = 2;  // Does not overwrite itself because it does not loop
      break;
    }
  }
  $(x);       // x=2
}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
$(x___9__);
while (true) {
  /*12*/ if ($) {
    /*15*/ $(x___19__);
    x___23__ = 2;
    break;
  } /*25*/ else {
  }
}
$(x___29__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,19        | none           | 23
  - r @9       | 4
  - r @19      | 4
  - w @23      | ########## | 29          | 4              | none
  - r @29      | 23

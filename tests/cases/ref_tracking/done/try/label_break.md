# Preval test case

# label_break.md

> Ref tracking > Done > Try > Label break
>
> The break goes through a finally so the last write

## Options

- refTest

## Input

`````js filename=intro
{
  let x = $(1);
  here: {
    $(x);              // x=1
    x = $(2);
    if ($) {
      $(x);            // x=2
      x = $(3);
      break here;
    }
    $(x);              // x=2
  }
  $(x);                // x=2 3
}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = $(1);
here___9__: /*10*/ {
  $(x___14__);
  x___20__ = $(2);
  if ($) {
    /*23*/ $(x___27__);
    x___33__ = $(3);
    break here___35__;
  } /*36*/ else {
    $(x___40__);
  }
}
$(x___44__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 14          | none           | 20
  - r @14      | 4
  - w @20      | ########## | 27,40,44    | 4              | 33
  - r @27      | 20
  - w @33      | ########## | 44          | 20             | none
  - r @40      | 20
  - r @44      | 20,33

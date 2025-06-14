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
let /*___4__*/ x = $(1);
/*___9__*/ here: /*10~40*/ {
  $(/*___14__*/ x);
  /*___20__*/ x = $(2);
  if ($) {
    /*23~35*/ $(/*___27__*/ x);
    /*___33__*/ x = $(3);
    break /*___35__*/ here;
  } /*36~40*/ else {
    $(/*___40__*/ x);
  }
}
$(/*___44__*/ x);
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

# Preval test case

# if4.md

> Ref tracking > Done > If-pure > If4
>
> base

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  if ($) {
  } else {
  }
  x = 4;
  $(x);
}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
x___9__ = 4;
$(x___13__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 9
  - w @9       | ########## | 13          | 4              | none
  - r @13      | 9

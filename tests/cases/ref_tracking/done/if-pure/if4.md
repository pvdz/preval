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
let /*___4__*/ x = 1;
/*___9__*/ x = 4;
$(/*___13__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 9
  - w @9       | ########## | 13          | 4              | none
  - r @13      | 9

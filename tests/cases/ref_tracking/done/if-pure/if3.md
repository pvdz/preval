# Preval test case

# if3.md

> Ref tracking > Done > If-pure > If3
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
    $(x, 3);
  }
  x = 4;
  $(x);
}
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
if ($) {
  /*8~8*/
} /*9~14*/ else {
  $(/*___13__*/ x, 3);
}
/*___18__*/ x = 4;
$(/*___22__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 13          | none           | 18
  - r @13      | 4
  - w @18      | ########## | 22          | 4              | none
  - r @22      | 18

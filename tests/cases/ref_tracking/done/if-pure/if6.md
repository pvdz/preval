# Preval test case

# if6.md

> Ref tracking > Done > If-pure > If6
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
    $(x, 2);
    x = 10;
    $(x, 3);
  }
  x = 4;
  $(x);
}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
if ($) {
  /*8*/
} /*9*/ else {
  $(x___13__, 2);
  x___18__ = 10;
  $(x___22__, 3);
}
x___27__ = 4;
$(x___31__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 13          | none           | 18,27
  - r @13      | 4
  - w @18      | ########## | 22          | 4              | 27
  - r @22      | 18
  - w @27      | ########## | 31          | 4,18           | none
  - r @31      | 27

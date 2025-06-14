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
let /*___4__*/ x = 1;
if ($) {
  /*8~8*/
} /*9~23*/ else {
  $(/*___13__*/ x, 2);
  /*___18__*/ x = 10;
  $(/*___22__*/ x, 3);
}
/*___27__*/ x = 4;
$(/*___31__*/ x);
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

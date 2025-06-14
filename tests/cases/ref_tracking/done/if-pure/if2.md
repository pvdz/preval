# Preval test case

# if2.md

> Ref tracking > Done > If-pure > If2
>
> base

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  if ($) {
    $(x, 2);
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
if ($) {
  /*8~13*/ $(/*___12__*/ x, 2);
} /*14~14*/ else {
}
/*___18__*/ x = 4;
$(/*___22__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12          | none           | 18
  - r @12      | 4
  - w @18      | ########## | 22          | 4              | none
  - r @22      | 18

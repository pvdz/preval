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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ if ($) {
  /*8~8*/
} /*9~14*/ else {
  /* stmt(10): */ $(/*___13__*/ x, 3);
}
/* stmt(15): */ /*___18__*/ x = 4;
/* stmt(19): */ $(/*___22__*/ x);
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

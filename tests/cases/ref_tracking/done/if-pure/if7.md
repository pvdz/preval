# Preval test case

# if7.md

> Ref tracking > Done > If-pure > If7
>
> base

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  if ($(1)) {
    $(x, 2);
    x = 10;
    $(x, 3);
  } else {
    $(x, 4);
    x = 10;
    $(x, 5);
  }
  x = 4;
  $(x);
}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___5__ = 1;
const tmpIfTest___8__ = $(1);
if (tmpIfTest___13__) {
  /*14*/ $(x___18__, 2);
  x___23__ = 10;
  $(x___27__, 3);
} /*29*/ else {
  $(x___33__, 4);
  x___38__ = 10;
  $(x___42__, 5);
}
x___47__ = 4;
$(x___51__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @5       | ########## | 18,33       | none           | 23,38
  - r @18      | 5
  - w @23      | ########## | 27          | 5              | 47
  - r @27      | 23
  - r @33      | 5
  - w @38      | ########## | 42          | 5              | 47
  - r @42      | 38
  - w @47      | ########## | 51          | 23,38          | none
  - r @51      | 47

tmpIfTest:
  - w @8       | ########## | 13          | none           | none
  - r @13      | 8

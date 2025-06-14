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
let /*___5__*/ x = 1;
const /*___8__*/ tmpIfTest = $(1);
if (/*___13__*/ tmpIfTest) {
  /*14~28*/ $(/*___18__*/ x, 2);
  /*___23__*/ x = 10;
  $(/*___27__*/ x, 3);
} /*29~43*/ else {
  $(/*___33__*/ x, 4);
  /*___38__*/ x = 10;
  $(/*___42__*/ x, 5);
}
/*___47__*/ x = 4;
$(/*___51__*/ x);
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

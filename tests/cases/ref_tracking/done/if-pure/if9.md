# Preval test case

# if9.md

> Ref tracking > Done > If-pure > If9
>
> The point is that one branch updates it but not guaranteed

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  if ($(1)) {
    if ($(1)) {
      x = 10;
    } else {
    }
  }
  $(x); // 1,10
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
const tmpIfTest___8__ = $(1);
if (tmpIfTest___13__) {
  /*14*/ const tmpIfTest$1___17__ = $(1);
  if (tmpIfTest$1___22__) {
    /*23*/ x___27__ = 10;
  } /*28*/ else {
  }
} /*29*/ else {
}
$(x___33__);
`````

Ref tracking result:

                | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 33          | none           | none
  - w @27      | ########## | not read    | none           | none
  - r @33      | 4

tmpIfTest:
  - w @8       | ########## | 13          | none           | none
  - r @13      | 8

tmpIfTest$1:
  - w @17       | ########## | 22          | none           | none
  - r @22       | 17

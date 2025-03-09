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
    $(x___31__);
  } /*32*/ else {
    $(x___36__);
  }
} /*37*/ else {
  $(x___41__);
}
`````

Ref tracking result:

                | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 36,41       | none           | 27
  - w @27      | ########## | 31          | 4              | none
  - r @31      | 27
  - r @36      | 4
  - r @41      | 4

tmpIfTest:
  - w @8       | ########## | 13          | none           | none
  - r @13      | 8

tmpIfTest$1:
  - w @17       | ########## | 22          | none           | none
  - r @22       | 17

# Preval test case

# if8.md

> Ref tracking > Done > If-pure > If8
>
> base

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  if ($(1)) {
    if ($(1)) {
      $(x, 2); // entryRead, 1
      x = 10; // entryWrite, exitWrite
      $(x); // --
    } else {
      $(x, 3); // entryRead, 1
    }
    x = 4; // entryRead, exitWrite, 1,10
    $(x); // --, 4
  }
  $(x); // 1,4
}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___5__ = 1;
const tmpIfTest___8__ = $(1);
if (tmpIfTest___13__) {
  /*14*/ const tmpIfTest$1___17__ = $(1);
  if (tmpIfTest$1___22__) {
    /*23*/ $(x___27__, 2);
    x___32__ = 10;
    $(x___36__);
  } /*37*/ else {
    $(x___41__, 3);
  }
  x___46__ = 4;
  $(x___50__);
  $(x___54__);
} /*55*/ else {
  $(x___59__);
}
`````


## Todos triggered


None


## Ref tracking result


                | reads      | read by     | overWrites     | overwritten by
x:
  - w @5       | ########## | 27,41,59    | none           | 32,46
  - r @27      | 5
  - w @32      | ########## | 36          | 5              | 46
  - r @36      | 32
  - r @41      | 5
  - w @46      | ########## | 50,54       | 5,32           | none
  - r @50      | 46
  - r @54      | 46
  - r @59      | 5

tmpIfTest:
  - w @8       | ########## | 13          | none           | none
  - r @13      | 8

tmpIfTest$1:
  - w @17       | ########## | 22          | none           | none
  - r @22       | 17

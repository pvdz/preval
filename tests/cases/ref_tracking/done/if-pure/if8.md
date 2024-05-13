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
let x___4__ = 1;
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
} /*51*/ else {
}
$(x___55__);
`````

Ref tracking result:

                | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 27,41,55    | none           | 32,46
  - r @27      | 4
  - w @32      | ########## | 36          | 4              | 46
  - r @36      | 32
  - r @41      | 4
  - w @46      | ########## | 50,55       | 4,32           | none
  - r @50      | 46
  - r @55      | 4,46

tmpIfTest:
  - w @8       | ########## | 13          | none           | none
  - r @13      | 8

tmpIfTest$1:
  - w @17       | ########## | 22          | none           | none
  - r @22       | 17

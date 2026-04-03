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
/* stmt(4): */ let /*___5__*/ x = 1;
/* stmt(7): */ const /*___8__*/ tmpIfTest = $(1);
/* stmt(12): */ if (/*___13__*/ tmpIfTest) {
  /*14~54*/ /* stmt(16): */ const /*___17__*/ tmpIfTest$1 = $(1);
  /* stmt(21): */ if (/*___22__*/ tmpIfTest$1) {
    /*23~36*/ /* stmt(24): */ $(/*___27__*/ x, 2);
    /* stmt(29): */ /*___32__*/ x = 10;
    /* stmt(33): */ $(/*___36__*/ x);
  } /*37~42*/ else {
    /* stmt(38): */ $(/*___41__*/ x, 3);
  }
  /* stmt(43): */ /*___46__*/ x = 4;
  /* stmt(47): */ $(/*___50__*/ x);
  /* stmt(51): */ $(/*___54__*/ x);
} /*55~59*/ else {
  /* stmt(56): */ $(/*___59__*/ x);
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

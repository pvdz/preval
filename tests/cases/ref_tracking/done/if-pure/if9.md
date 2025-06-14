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
let /*___5__*/ x = 1;
const /*___8__*/ tmpIfTest = $(1);
if (/*___13__*/ tmpIfTest) {
  /*14~36*/ const /*___17__*/ tmpIfTest$1 = $(1);
  if (/*___22__*/ tmpIfTest$1) {
    /*23~31*/ /*___27__*/ x = 10;
    $(/*___31__*/ x);
  } /*32~36*/ else {
    $(/*___36__*/ x);
  }
} /*37~41*/ else {
  $(/*___41__*/ x);
}
`````


## Todos triggered


None


## Ref tracking result


                | reads      | read by     | overWrites     | overwritten by
x:
  - w @5       | ########## | 36,41       | none           | 27
  - w @27      | ########## | 31          | 5              | none
  - r @31      | 27
  - r @36      | 5
  - r @41      | 5

tmpIfTest:
  - w @8       | ########## | 13          | none           | none
  - r @13      | 8

tmpIfTest$1:
  - w @17       | ########## | 22          | none           | none
  - r @22       | 17

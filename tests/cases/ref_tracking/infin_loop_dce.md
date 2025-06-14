# Preval test case

# infin_loop_dce.md

> Ref tracking > Infin loop dce
>
> Normalization of assignments should work the same everywhere they are

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpUnaryArg$1 /*:unknown*/ = $(100);
  if (tmpUnaryArg$1) {
    x = 2;
    break;
  } else {
  }
}
$(x, `i am dead`);
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
while (/*___7__*/ $LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  /*8~23*/ const /*___11__*/ tmpUnaryArg$1 = $(100);
  if (/*___16__*/ tmpUnaryArg$1) {
    /*17~22*/ /*___21__*/ x = 2;
    break;
  } /*23~23*/ else {
  }
}
$(/*___27__*/ x, `i am dead`);
`````


## Todos triggered


None


## Ref tracking result


                  | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 21
  - w @21      | ########## | 27          | 4              | none
  - r @27      | 21

tmpUnaryArg$1:
  - w @11         | ########## | 16          | none           | none
  - r @16         | 11

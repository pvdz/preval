# Preval test case

# loop_write_continue_read3.md

> Ref tracking > Done > While-continue > Loop write continue read3
>
> Ref tracking cases

## Options

- refTest

## Input

`````js filename=intro
let x = 0;
let $tmpLoopUnrollCheck = true;
loopStop: {
  x = x + 1;
  $(x, 1);
  const tmpIfTest = x < 4;
  if (tmpIfTest) {}
  else {
    $(x, 2);
    $tmpLoopUnrollCheck = false;
    break loopStop;
  }
}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 0;
let $tmpLoopUnrollCheck___8__ = true;
loopStop___11__: /*12*/ {
  x___18__ = x___16__ + 1;
  $(x___22__, 1);
  const tmpIfTest___26__ = x___28__ < 4;
  if (tmpIfTest___31__) {
    /*32*/
  } /*33*/ else {
    $(x___37__, 2);
    $tmpLoopUnrollCheck___42__ = false;
    break loopStop___44__;
  }
}
`````


## Ref tracking result


                        | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 16          | none           | 18
  - r @16      | 4
  - w @18      | ########## | 22,28,37    | 4              | none
  - r @22      | 18
  - r @28      | 18
  - r @37      | 18

$tmpLoopUnrollCheck:
  - w @8                | ########## | not read    | none           | 42
  - w @42               | ########## | not read    | 8              | none

tmpIfTest:
  - w @26               | ########## | 31          | none           | none
  - r @31               | 26

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
let x___5__ = 0;
let $tmpLoopUnrollCheck___8__ = true;
loopStop___11__: /*12*/ {
  x___19__ = x___17__ + 1;
  $(x___23__, 1);
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


## Todos triggered


None


## Ref tracking result


                        | reads      | read by     | overWrites     | overwritten by
x:
  - w @5       | ########## | 17          | none           | 19
  - r @17      | 5
  - w @19      | ########## | 23,28,37    | 5              | none
  - r @23      | 19
  - r @28      | 19
  - r @37      | 19

$tmpLoopUnrollCheck:
  - w @8                | ########## | not read    | none           | 42
  - w @42               | ########## | not read    | 8              | none

tmpIfTest:
  - w @26               | ########## | 31          | none           | none
  - r @31               | 26

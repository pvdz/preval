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
let /*___5__*/ x = 0;
let /*___8__*/ $tmpLoopUnrollCheck = true;
/*___11__*/ loopStop: /*12~44*/ {
  /*___19__*/ x = /*___17__*/ x + 1;
  $(/*___23__*/ x, 1);
  const /*___26__*/ tmpIfTest = /*___28__*/ x < 4;
  if (/*___31__*/ tmpIfTest) {
    /*32~32*/
  } /*33~44*/ else {
    $(/*___37__*/ x, 2);
    /*___42__*/ $tmpLoopUnrollCheck = false;
    break /*___44__*/ loopStop;
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

# Preval test case

# for_of_regression_ref.md

> Ref tracking > Done > Forof > For of regression ref
>
> This was breaking because the for-body was always considered to loop.
> This is true for the while(true) case but not for-in/of.

## Options

- refTest

## Input

`````js filename=intro
$(undefined);
let x = undefined;
const list = [100];
let arr = undefined;
for (arr of list) {
  x = arr;
  $(x, `for`);
}
$(x);
`````

## Output

(Annotated with pids)

`````filename=intro
$(undefined___5__);
let x___8__ = undefined___9__;
const list___12__ = [100];
let arr___17__ = undefined___18__;
let tmpForOfGen___21__ = $forOf___23__(list___24__);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___26__) {
  /*27*/ let tmpForOfNext___30__ = tmpForOfGen___33__.next___34__();
  const tmpIfTest___37__ = tmpForOfNext___39__.done___40__;
  if (tmpIfTest___42__) {
    /*43*/ break;
  } /*45*/ else {
    arr___51__ = tmpForOfNext___49__.value___50__;
    x___55__ = arr___54__;
    $(x___59__, `for`);
  }
}
$(x___65__);
`````

Ref tracking result:

                 | reads      | read by     | overWrites     | overwritten by
x:
  - w @8       | ########## | 65          | none           | 55
  - w @55      | ########## | 59,65       | 8,55           | 55
  - r @59      | 55
  - r @65      | 8,55

list:
  - w @12      | ########## | 24          | none           | none
  - r @24      | 12

arr:
  - w @17      | ########## | not read    | none           | 51
  - w @51      | ########## | 54          | 17,51          | 51
  - r @54      | 51

tmpForOfGen:
  - w @21       | ########## | 33          | none           | none
  - r @33       | 21

tmpForOfNext:
  - w @30        | ########## | 39,49       | none           | none
  - r @39        | 30
  - r @49        | 30

tmpIfTest:
  - w @37        | ########## | 42          | none           | none
  - r @42        | 37

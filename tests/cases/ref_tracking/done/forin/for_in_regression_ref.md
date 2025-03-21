# Preval test case

# for_in_regression_ref.md

> Ref tracking > Done > Forin > For in regression ref
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
for (arr in list) {
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
let tmpForInGen___21__ = $forIn___23__(list___24__);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___26__) {
  /*27*/ let tmpForInNext___30__ = tmpForInGen___33__.next___34__();
  const tmpIfTest___37__ = tmpForInNext___39__.done___40__;
  if (tmpIfTest___42__) {
    /*43*/ break;
  } /*45*/ else {
    arr___51__ = tmpForInNext___49__.value___50__;
    x___55__ = arr___54__;
    $(arr___59__, `for`);
  }
}
$(x___65__);
`````

Ref tracking result:

                 | reads      | read by     | overWrites     | overwritten by
x:
  - w @8       | ########## | 65          | none           | 55
  - w @55      | ########## | 65          | 8,55           | 55
  - r @65      | 8,55

list:
  - w @12      | ########## | 24          | none           | none
  - r @24      | 12

arr:
  - w @17      | ########## | not read    | none           | 51
  - w @51      | ########## | 54,59       | 17,51          | 51
  - r @54      | 51
  - r @59      | 51

tmpForInGen:
  - w @21       | ########## | 33          | none           | none
  - r @33       | 21

tmpForInNext:
  - w @30        | ########## | 39,49       | none           | none
  - r @39        | 30
  - r @49        | 30

tmpIfTest:
  - w @37        | ########## | 42          | none           | none
  - r @42        | 37

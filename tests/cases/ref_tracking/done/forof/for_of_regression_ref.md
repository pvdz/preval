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
$(undefined___9__);
let x___11__ = undefined___12__;
const list___14__ = [100];
let arr___18__ = undefined___19__;
const tmpForOfGen___21__ = $forOf___23__(list___24__);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___26__) {
  /*27*/ const tmpForOfNext___31__ = tmpForOfGen___34__.next___35__();
  const tmpIfTest___37__ = tmpForOfNext___39__.done___40__;
  if (tmpIfTest___42__) {
    /*43*/ break;
  } /*45*/ else {
    arr___51__ = tmpForOfNext___49__.value___50__;
    x___55__ = arr___54__;
    $(arr___59__, `for`);
  }
}
$(x___65__);
`````


## Todos triggered


None


## Ref tracking result


                 | reads      | read by     | overWrites     | overwritten by
x:
  - w @11      | ########## | 65          | none           | 55
  - w @55      | ########## | 65          | 11,55          | 55
  - r @65      | 11,55

list:
  - w @14      | ########## | 24          | none           | none
  - r @24      | 14

arr:
  - w @18      | ########## | not read    | none           | 51
  - w @51      | ########## | 54,59       | 18,51          | 51
  - r @54      | 51
  - r @59      | 51

tmpForOfGen:
  - w @21       | ########## | 34          | none           | none
  - r @34       | 21

tmpForOfNext:
  - w @31        | ########## | 39,49       | none           | none
  - r @39        | 31
  - r @49        | 31

tmpIfTest:
  - w @37        | ########## | 42          | none           | none
  - r @42        | 37

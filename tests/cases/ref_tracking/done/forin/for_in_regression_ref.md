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
$(undefined___9__);
let x___11__ = undefined___12__;
const list___14__ = [100];
let arr___18__ = undefined___19__;
const tmpForInGenNext___21__ = $forIn___23__(list___24__);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___26__) {
  /*27*/ const tmpForInNext___31__ = tmpForInGenNext___33__();
  const tmpIfTest___35__ = tmpForInNext___37__.done___38__;
  if (tmpIfTest___40__) {
    /*41*/ break;
  } /*43*/ else {
    arr___49__ = tmpForInNext___47__.value___48__;
    x___53__ = arr___52__;
    $(arr___57__, `for`);
  }
}
$(x___63__);
`````


## Todos triggered


None


## Ref tracking result


                    | reads      | read by     | overWrites     | overwritten by
x:
  - w @11      | ########## | 63          | none           | 53
  - w @53      | ########## | 63          | 11,53          | 53
  - r @63      | 11,53

list:
  - w @14      | ########## | 24          | none           | none
  - r @24      | 14

arr:
  - w @18      | ########## | not read    | none           | 49
  - w @49      | ########## | 52,57       | 18,49          | 49
  - r @52      | 49
  - r @57      | 49

tmpForInGenNext:
  - w @21           | ########## | 33          | none           | none
  - r @33           | 21

tmpForInNext:
  - w @31           | ########## | 37,47       | none           | none
  - r @37           | 31
  - r @47           | 31

tmpIfTest:
  - w @35           | ########## | 40          | none           | none
  - r @40           | 35

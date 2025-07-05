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
$(/*___9__*/ undefined);
let /*___11__*/ x = /*___12__*/ undefined;
const /*___14__*/ list = [100];
let /*___18__*/ arr = /*___19__*/ undefined;
const /*___21__*/ tmpForOfGen = /*___23__*/ $forOf(/*___24__*/ list);
while (/*___26__*/ $LOOP_NO_UNROLLS_LEFT) {
  /*27~59*/ const /*___31__*/ tmpForOfNext = /*___33__*/ tmpForOfGen();
  const /*___35__*/ tmpIfTest = /*___37__*/ tmpForOfNext./*___38__*/ done;
  if (/*___40__*/ tmpIfTest) {
    /*41~42*/ break;
  } /*43~59*/ else {
    /*___49__*/ arr = /*___47__*/ tmpForOfNext./*___48__*/ value;
    /*___53__*/ x = /*___52__*/ arr;
    $(/*___57__*/ arr, `for`);
  }
}
$(/*___63__*/ x);
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

tmpForOfGen:
  - w @21       | ########## | 33          | none           | none
  - r @33       | 21

tmpForOfNext:
  - w @31        | ########## | 37,47       | none           | none
  - r @37        | 31
  - r @47        | 31

tmpIfTest:
  - w @35        | ########## | 40          | none           | none
  - r @40        | 35

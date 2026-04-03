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
/* stmt(6): */ $(/*___9__*/ undefined);
/* stmt(10): */ let /*___11__*/ x = /*___12__*/ undefined;
/* stmt(13): */ const /*___14__*/ list = [100];
/* stmt(17): */ let /*___18__*/ arr = /*___19__*/ undefined;
/* stmt(20): */ const /*___21__*/ tmpForInGenNext = /*___23__*/ $forIn(/*___24__*/ list);
/* stmt(25): */ while (/*___26__*/ $LOOP_NO_UNROLLS_LEFT) {
  /*27~59*/ /* stmt(30): */ const /*___31__*/ tmpForInNext = /*___33__*/ tmpForInGenNext();
  /* stmt(34): */ const /*___35__*/ tmpIfTest = /*___37__*/ tmpForInNext./*___38__*/ done;
  /* stmt(39): */ if (/*___40__*/ tmpIfTest) {
    /*41~42*/ /* stmt(42): */ break;
  } /*43~59*/ else {
    /* stmt(44): */ /*___49__*/ arr = /*___47__*/ tmpForInNext./*___48__*/ value;
    /* stmt(50): */ /*___53__*/ x = /*___52__*/ arr;
    /* stmt(54): */ $(/*___57__*/ arr, `for`);
  }
}
/* stmt(60): */ $(/*___63__*/ x);
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

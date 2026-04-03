# Preval test case

# while_forof.md

> Ref tracking > Done > Forof > While forof
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

## Options

- refTest

## Input

`````js filename=intro
const arr = [1, 2];
for (let x of arr) {
  $(x);
  continue;
}
$();
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(4): */ const /*___5__*/ arr = [1, 2];
/* stmt(9): */ const /*___10__*/ tmpForOfGenNext = /*___12__*/ $forOf(/*___13__*/ arr);
/* stmt(14): */ while (/*___15__*/ $LOOP_NO_UNROLLS_LEFT) {
  /*16~42*/ /* stmt(19): */ const /*___20__*/ tmpForOfNext = /*___22__*/ tmpForOfGenNext();
  /* stmt(23): */ const /*___24__*/ tmpIfTest = /*___26__*/ tmpForOfNext./*___27__*/ done;
  /* stmt(28): */ if (/*___29__*/ tmpIfTest) {
    /*30~31*/ /* stmt(31): */ break;
  } /*32~42*/ else {
    /* stmt(34): */ let /*___35__*/ x = /*___37__*/ tmpForOfNext./*___38__*/ value;
    /* stmt(39): */ $(/*___42__*/ x);
  }
}
/* stmt(43): */ $();
`````


## Todos triggered


None


## Ref tracking result


                    | reads      | read by     | overWrites     | overwritten by
arr:
  - w @5       | ########## | 13          | none           | none
  - r @13      | 5

tmpForOfGenNext:
  - w @10           | ########## | 22          | none           | none
  - r @22           | 10

tmpForOfNext:
  - w @20           | ########## | 26,37       | none           | none
  - r @26           | 20
  - r @37           | 20

tmpIfTest:
  - w @24           | ########## | 29          | none           | none
  - r @29           | 24

x:
  - w @35           | ########## | 42          | none           | none
  - r @42           | 35

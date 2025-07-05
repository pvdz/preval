# Preval test case

# forof_break.md

> Ref tracking > Done > Forof > Forof break
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Options

- refTest

## Input

`````js filename=intro
const arr = [ 10, 20 ];
for (const x of arr) {
  $(x);
  break;
}
$('after');
`````


## Output

(Annotated with pids)

`````filename=intro
const /*___5__*/ arr = [10, 20];
const /*___10__*/ tmpForOfGenNext = /*___12__*/ $forOf(/*___13__*/ arr);
while (/*___15__*/ $LOOP_NO_UNROLLS_LEFT) {
  /*16~43*/ const /*___20__*/ tmpForOfNext = /*___22__*/ tmpForOfGenNext();
  const /*___24__*/ tmpIfTest = /*___26__*/ tmpForOfNext./*___27__*/ done;
  if (/*___29__*/ tmpIfTest) {
    /*30~31*/ break;
  } /*32~43*/ else {
    const /*___35__*/ x = /*___37__*/ tmpForOfNext./*___38__*/ value;
    $(/*___42__*/ x);
    break;
  }
}
$(`after`);
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

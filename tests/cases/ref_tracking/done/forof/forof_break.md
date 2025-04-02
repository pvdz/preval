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
const arr___5__ = [10, 20];
const tmpForOfGen___10__ = $forOf___12__(arr___13__);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___15__) {
  /*16*/ const tmpForOfNext___20__ = tmpForOfGen___22__();
  const tmpIfTest___24__ = tmpForOfNext___26__.done___27__;
  if (tmpIfTest___29__) {
    /*30*/ break;
  } /*32*/ else {
    const x___35__ = tmpForOfNext___37__.value___38__;
    $(x___42__);
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

tmpForOfGen:
  - w @10       | ########## | 22          | none           | none
  - r @22       | 10

tmpForOfNext:
  - w @20        | ########## | 26,37       | none           | none
  - r @26        | 20
  - r @37        | 20

tmpIfTest:
  - w @24        | ########## | 29          | none           | none
  - r @29        | 24

x:
  - w @35        | ########## | 42          | none           | none
  - r @42        | 35

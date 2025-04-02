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
const arr___5__ = [1, 2];
const tmpForOfGen___10__ = $forOf___12__(arr___13__);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___15__) {
  /*16*/ const tmpForOfNext___20__ = tmpForOfGen___22__();
  const tmpIfTest___24__ = tmpForOfNext___26__.done___27__;
  if (tmpIfTest___29__) {
    /*30*/ break;
  } /*32*/ else {
    let x___35__ = tmpForOfNext___37__.value___38__;
    $(x___42__);
  }
}
$();
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

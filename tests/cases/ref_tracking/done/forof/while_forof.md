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
const arr___4__ = [1, 2];
let tmpForOfGen___10__ = $forOf___12__(arr___13__);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___15__) {
  /*16*/ let tmpForOfNext___19__ = tmpForOfGen___22__.next___23__();
  const tmpIfTest___26__ = tmpForOfNext___28__.done___29__;
  if (tmpIfTest___31__) {
    /*32*/ break;
  } /*34*/ else {
    let x___37__ = tmpForOfNext___39__.value___40__;
    $(x___44__);
  }
}
$();
`````


## Todos triggered


None


## Ref tracking result


                 | reads      | read by     | overWrites     | overwritten by
arr:
  - w @4       | ########## | 13          | none           | none
  - r @13      | 4

tmpForOfGen:
  - w @10       | ########## | 22          | none           | none
  - r @22       | 10

tmpForOfNext:
  - w @19        | ########## | 28,39       | none           | none
  - r @28        | 19
  - r @39        | 19

tmpIfTest:
  - w @26        | ########## | 31          | none           | none
  - r @31        | 26

x:
  - w @37        | ########## | 44          | none           | none
  - r @44        | 37

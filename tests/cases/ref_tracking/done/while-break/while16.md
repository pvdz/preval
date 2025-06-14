# Preval test case

# while16.md

> Ref tracking > Done > While-break > While16
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if ($1) {
    $(x); // x=1 3
    x = 5;
    break;
  } else {
    x = 4;
  }
  x = 3;
}
$(x); // x=5
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
while (/*___7__*/ $LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  /*8~29*/ if ($1) {
    /*11~20*/ $(/*___15__*/ x);
    /*___19__*/ x = 5;
    break;
  } /*21~29*/ else {
    /*___25__*/ x = 4;
    /*___29__*/ x = 3;
  }
}
$(/*___33__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15          | none           | 19,25
  - r @15      | 4,29
  - w @19      | ########## | 33          | 4,29           | none
  - w @25      | ########## | not read    | 4,29           | 29
  - w @29      | ########## | 15          | 25             | 19,25
  - r @33      | 19

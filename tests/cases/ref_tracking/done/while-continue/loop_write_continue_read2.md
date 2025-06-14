# Preval test case

# loop_write_continue_read2.md

> Ref tracking > Done > While-continue > Loop write continue read2
>
> Ref tracking cases

## Options

- refTest

## Input

`````js filename=intro
let x = 0;
while (true) {
  x = x + 1;
  if (x < 400) continue;
  $(x);
  break;
}
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 0;
while (true) {
  /*8~34*/ /*___10__*/ $continue: /*11~34*/ {
    /*___18__*/ x = /*___16__*/ x + 1;
    const /*___20__*/ tmpIfTest = /*___22__*/ x < 400;
    if (/*___25__*/ tmpIfTest) {
      /*26~28*/ break /*___28__*/ $continue;
    } /*29~34*/ else {
      $(/*___33__*/ x);
      break;
    }
  }
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 16          | none           | 18
  - r @16      | 4,18
  - w @18      | ########## | 16,22,33    | 4,18           | 18
  - r @22      | 18
  - r @33      | 18

tmpIfTest:
  - w @20      | ########## | 25          | none           | none
  - r @25      | 20

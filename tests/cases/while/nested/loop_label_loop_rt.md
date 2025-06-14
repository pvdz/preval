# Preval test case

# loop_label_loop_rt.md

> While > Nested > Loop label loop rt
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 10;
while(true) {
  foo: {
    while (true) {
      const t = $(x);
      if (t) {
        break foo;
      } else {
        x = 20;
      }
      $(x);
    }
  }
  $(x);
}
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 10;
while (true) {
  /*8~34*/ while (true) {
    /*11~30*/ const /*___14__*/ t = $(/*___17__*/ x);
    if (/*___19__*/ t) {
      /*20~21*/ break;
    } /*22~30*/ else {
      /*___26__*/ x = 20;
      $(/*___30__*/ x);
    }
  }
  $(/*___34__*/ x);
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 17,34       | none           | 26
  - r @17      | 4,26
  - w @26      | ########## | 17,30,34    | 4,26           | 26
  - r @30      | 26
  - r @34      | 4,26

t:
  - w @14      | ########## | 19          | none           | none
  - r @19      | 14

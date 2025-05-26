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
let x___4__ = 10;
while (true) {
  /*8*/ while (true) {
    /*11*/ const t___14__ = $(x___17__);
    if (t___19__) {
      /*20*/ break;
    } /*22*/ else {
      x___26__ = 20;
      $(x___30__);
    }
  }
  $(x___34__);
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

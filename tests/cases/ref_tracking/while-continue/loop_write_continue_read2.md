# Preval test case

# loop_write_continue_read2.md

> Ref tracking > While-continue > Loop write continue read2
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
let x___4__ = 0;
while (true) {
  /*8*/ x___14__ = x___12__ + 1;
  const tmpIfTest___17__ = x___19__ < 400;
  if (tmpIfTest___22__) {
    /*23*/ continue;
  } /*25*/ else {
    $(x___29__);
    break;
  }
}
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | none
  - r @12      | none (TDZ?)
  - w @14      | ########## | 19          | none           | none
  - r @19      | 14
  - r @29      | none (TDZ?)

tmpIfTest:
  - w @17      | ########## | 22          | none           | none
  - r @22      | 17

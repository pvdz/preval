# Preval test case

# while1_4.md

> Ref tracking > Done > While-break > While1 4
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  $(x); // x=1 2
  if ($) {
    if ($1) {
      // Now this exitWrite should be amended in the parent
      x = 2;
    }
    continue;
  } else {
  }
  if ($2) break;
}
$(x); // x=1 2
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ $(x___12__);
  if ($) {
    /*15*/ if ($1) {
      /*18*/ x___22__ = 2;
    } /*23*/ else {
    }
    continue;
  } /*25*/ else {
    if ($2) {
      /*28*/ break;
    } /*30*/ else {
    }
  }
}
$(x___34__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12,34       | none           | 22
  - r @12      | 4,22
  - w @22      | ########## | 12,34       | 4,22           | 22
  - r @34      | 4,22

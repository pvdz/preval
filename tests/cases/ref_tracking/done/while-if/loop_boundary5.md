# Preval test case

# loop_boundary5.md

> Ref tracking > Done > While-if > Loop boundary5
>
> For the case where the branch containing the `breka` conditionally writes it

## Options

- refTest

## Input

`````js filename=intro
let x = 5;
while (true) { 
  $(x); // 5, not 6
  if ($) {
    if ($(false)) {
      x = 6;
    }
    break;
  }
}
$(x); // 5 or 6
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 5;
while (true) {
  /*8~31*/ $(/*___12__*/ x);
  if ($) {
    /*15~30*/ const /*___18__*/ tmpIfTest = $(false);
    if (/*___23__*/ tmpIfTest) {
      /*24~28*/ /*___28__*/ x = 6;
    } /*29~29*/ else {
    }
    break;
  } /*31~31*/ else {
  }
}
$(/*___35__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 12,35       | none           | 28
  - r @12      | 4
  - w @28      | ########## | 35          | 4              | none
  - r @35      | 4,28

tmpIfTest:
  - w @18      | ########## | 23          | none           | none
  - r @23      | 18

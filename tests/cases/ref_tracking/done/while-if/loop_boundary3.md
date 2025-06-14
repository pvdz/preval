# Preval test case

# loop_boundary3.md

> Ref tracking > Done > While-if > Loop boundary3

## Options

- refTest

## Input

`````js filename=intro
let x = 5;
while (true) { 
  if ($(false)) {
    x = 6;
  }
  $(x); // 5 or 6
  break;
}
$(x); // 5 or 6
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___5__*/ x = 5;
const /*___8__*/ tmpIfTest = $(false);
if (/*___13__*/ tmpIfTest) {
  /*14~26*/ /*___18__*/ x = 6;
  $(/*___22__*/ x);
  $(/*___26__*/ x);
} /*27~35*/ else {
  $(/*___31__*/ x);
  $(/*___35__*/ x);
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @5       | ########## | 31,35       | none           | 18
  - w @18      | ########## | 22,26       | 5              | none
  - r @22      | 18
  - r @26      | 18
  - r @31      | 5
  - r @35      | 5

tmpIfTest:
  - w @8       | ########## | 13          | none           | none
  - r @13      | 8

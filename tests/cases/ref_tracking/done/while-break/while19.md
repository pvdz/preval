# Preval test case

# while19.md

> Ref tracking > Done > While-break > While19
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  if ($()) x = 2;
  while (true) {
    if ($()) x = 3; // May overwrite x=5
    break;
  }
  x = 5;
  break;
}
$(x); // x=5, always
`````


## Output

(Annotated with pids)

`````filename=intro
let x___6__ = 1;
const tmpIfTest___9__ = $();
if (tmpIfTest___13__) {
  /*14*/ x___18__ = 2;
} /*19*/ else {
}
const tmpIfTest$1___21__ = $();
if (tmpIfTest$1___25__) {
  /*26*/ x___30__ = 3;
} /*31*/ else {
}
x___35__ = 5;
$(x___39__);
`````


## Todos triggered


None


## Ref tracking result


                | reads      | read by     | overWrites     | overwritten by
x:
  - w @6       | ########## | not read    | none           | 18,30,35
  - w @18      | ########## | not read    | 6              | 30,35
  - w @30      | ########## | not read    | 6,18           | 35
  - w @35      | ########## | 39          | 6,18,30        | none
  - r @39      | 35

tmpIfTest:
  - w @9       | ########## | 13          | none           | none
  - r @13      | 9

tmpIfTest$1:
  - w @21       | ########## | 25          | none           | none
  - r @25       | 21

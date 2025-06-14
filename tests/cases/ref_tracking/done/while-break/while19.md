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
let /*___6__*/ x = 1;
const /*___9__*/ tmpIfTest = $();
if (/*___13__*/ tmpIfTest) {
  /*14~18*/ /*___18__*/ x = 2;
} /*19~19*/ else {
}
const /*___21__*/ tmpIfTest$1 = $();
if (/*___25__*/ tmpIfTest$1) {
  /*26~30*/ /*___30__*/ x = 3;
} /*31~31*/ else {
}
/*___35__*/ x = 5;
$(/*___39__*/ x);
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

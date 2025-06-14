# Preval test case

# while17.md

> Ref tracking > Done > While-if > While17
>
> All writes (beyond the first) overwrite all other writes
> The inner loop is endless, though, so x=5 is unreachable.
> The outer loop is also endless but it never even loops once anyways.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  if ($()) {
    x = 2;
  }
  while (true) {
    if ($()) {
      x = 3;
    }
    x = 4;
  }
  x = 5;
}
$(x); // unreachable
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
while (true) {
  /*8~41*/ const /*___11__*/ tmpIfTest = $();
  if (/*___15__*/ tmpIfTest) {
    /*16~20*/ /*___20__*/ x = 2;
  } /*21~21*/ else {
  }
  while (true) {
    /*24~41*/ const /*___27__*/ tmpIfTest$1 = $();
    if (/*___31__*/ tmpIfTest$1) {
      /*32~36*/ /*___36__*/ x = 3;
    } /*37~37*/ else {
    }
    /*___41__*/ x = 4;
  }
}
`````


## Todos triggered


None


## Ref tracking result


                | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 20,36,41
  - w @20      | ########## | not read    | 4              | 36,41
  - w @36      | ########## | not read    | 4,20,41        | 41
  - w @41      | ########## | not read    | 4,20,36,41     | 36,41

tmpIfTest:
  - w @11      | ########## | 15          | none           | none
  - r @15      | 11

tmpIfTest$1:
  - w @27       | ########## | 31          | none           | none
  - r @31       | 27

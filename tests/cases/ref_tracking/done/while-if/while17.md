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
let x___4__ = 1;
while (true) {
  /*8*/ const tmpIfTest___11__ = $();
  if (tmpIfTest___15__) {
    /*16*/ x___20__ = 2;
  } /*21*/ else {
  }
  while (true) {
    /*24*/ const tmpIfTest$1___27__ = $();
    if (tmpIfTest$1___31__) {
      /*32*/ x___36__ = 3;
    } /*37*/ else {
    }
    x___41__ = 4;
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

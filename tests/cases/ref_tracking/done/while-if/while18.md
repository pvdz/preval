# Preval test case

# while18.md

> Ref tracking > Done > While-if > While18
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  if ($()) {
    // Can NEVER overwrite x=2/x=3 because x=5 always follows it
    x = 2; // Overwrites 1
  } 
  while (true) {
    // May overwrite x=1 (first iteration of outer loop)
    // May overwrite x=2 (first iteration of outer loop)
    // May overwrite x=3 (after loop of inner loop)
    // May overwrite x=5 (after outer loop iteration)
    if ($()) {
      x = 3; // overwrites x=2 3
    } 
  }
  x = 5; // Unreachable
}
$(x); // Unreachable
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
  }
}
`````


## Ref tracking result


                | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 20,36
  - w @20      | ########## | not read    | 4              | 36
  - w @36      | ########## | not read    | 4,20,36        | 36

tmpIfTest:
  - w @11      | ########## | 15          | none           | none
  - r @15      | 11

tmpIfTest$1:
  - w @27       | ########## | 31          | none           | none
  - r @31       | 27

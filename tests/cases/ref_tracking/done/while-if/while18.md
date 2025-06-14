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
let /*___4__*/ x = 1;
while (true) {
  /*8~37*/ const /*___11__*/ tmpIfTest = $();
  if (/*___15__*/ tmpIfTest) {
    /*16~20*/ /*___20__*/ x = 2;
  } /*21~21*/ else {
  }
  while (true) {
    /*24~37*/ const /*___27__*/ tmpIfTest$1 = $();
    if (/*___31__*/ tmpIfTest$1) {
      /*32~36*/ /*___36__*/ x = 3;
    } /*37~37*/ else {
    }
  }
}
`````


## Todos triggered


None


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

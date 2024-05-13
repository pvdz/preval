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
    break;
  }
  x___42__ = 5;
  break;
}
$(x___47__);
`````

Ref tracking result:

                | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 20,36,42
  - w @20      | ########## | not read    | 4              | 36,42
  - w @36      | ########## | not read    | 4,20           | 42
  - w @42      | ########## | 47          | 4,20,36        | none
  - r @47      | 42

tmpIfTest:
  - w @11      | ########## | 15          | none           | none
  - r @15      | 11

tmpIfTest$1:
  - w @27       | ########## | 31          | none           | none
  - r @31       | 27

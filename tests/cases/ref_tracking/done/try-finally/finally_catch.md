# Preval test case

# finally_catch.md

> Ref tracking > Done > Try-finally > Finally catch

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $(x);       // x=1
  x = 2;
  try {
    $(x);     // x=2
    x = 3;
  } finally {
    $(x);     // x=2 3
    x = 4;
    $(x);     // x=4
  }
} catch {
  $(x);       // x=1 2 3 4
  x = 5;
  $(x);       // x=5
}
$(x);         // x=4 5
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
try /*7*/ {
  $(x___11__);
  x___15__ = 2;
  try /*17*/ {
    $(x___21__);
    x___25__ = 3;
  } finally /*26*/ {
    $(x___30__);
    x___34__ = 4;
    $(x___38__);
  }
} catch (e___40__) /*41*/ {
  $(x___45__);
  x___49__ = 5;
  $(x___53__);
}
$(x___57__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 11,45       | none           | 15,49
  - r @11      | 4
  - w @15      | ########## | 21,30,45    | 4              | 25,34,49
  - r @21      | 15
  - w @25      | ########## | 30,45       | 15             | 34,49
  - r @30      | 15,25
  - w @34      | ########## | 38,45,57    | 15,25          | 49
  - r @38      | 34
  - r @45      | 4,15,25,34
  - w @49      | ########## | 53,57       | 4,15,25,34     | none
  - r @53      | 49
  - r @57      | 34,49

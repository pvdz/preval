# Preval test case

# try_catch2.md

> Ref tracking > Done > Try-catch > Try catch2

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $(x);
  x = 2; // overwrite 1
} catch { 
  x = 3; // overwrite 1, 2
         // (technically not 2 because the write is the final operation
         // of the try block. If it succeeds then it won't enter the
         // catch. Otherwise it will and the 2 can't be observed.)
}

// x=3. 
// But preval must consider x=2 possible too.
// x=1 is not possible because either the try 
// overwites it or the catch does.

$(x); // reads x = 2,3
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
try /*7*/ {
  $(x___11__);
  x___15__ = 2;
} catch (e___17__) /*18*/ {
  x___22__ = 3;
}
$(x___26__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 11          | none           | 15,22
  - r @11      | 4
  - w @15      | ########## | 26          | 4              | 22
  - w @22      | ########## | 26          | 4,15           | none
  - r @26      | 15,22

# Preval test case

# try_catch.md

> Ref tracking > Done > Try-catch > Try catch

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $();
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
let /*___4__*/ x = 1;
try /*7~14*/ {
  $();
  /*___14__*/ x = 2;
} catch (/*___16__*/ e) /*17~21*/ {
  /*___21__*/ x = 3;
}
$(/*___25__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 14,21
  - w @14      | ########## | 25          | 4              | 21
  - w @21      | ########## | 25          | 4,14           | none
  - r @25      | 14,21

e:
  - w @16      | ########## | not read    | none           | none

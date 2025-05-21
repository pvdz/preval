# Preval test case

# try_catch3.md

> Ref tracking > Done > Try-catch > Try catch3

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $();
  x = 2; // overwrite 1
} catch {
  $(x); // can observe 1 2 
        // (technically not 2 because the write is the final operation
        // of the try block. If it succeeds then it won't enter the
        // catch. Otherwise it will and the 2 can't be observed.)
  x = 3; // overwrite 1, 2
         // (with same "but" as above)
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
  $();
  x___14__ = 2;
} catch (e___16__) /*17*/ {
  $(x___21__);
  x___25__ = 3;
}
$(x___29__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 21          | none           | 14,25
  - w @14      | ########## | 21,29       | 4              | 25
  - r @21      | 4,14
  - w @25      | ########## | 29          | 4,14           | none
  - r @29      | 14,25

e:
  - w @16      | ########## | not read    | none           | none

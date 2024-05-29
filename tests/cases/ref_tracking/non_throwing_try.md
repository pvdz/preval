# Preval test case

# non_throwing_try.md

> Ref tracking > Non throwing try
> 
> Trying to produce a test case where a catch inherits the parent exitWrites even though it can't throw
> and then incorrectly claims writes are reachable when they actually aren't.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  x = 2; // We _know_ this can't throw... (and should end up eliminating the try entirely)
} catch {
  $(x);
}
$(x);
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
try /*7*/ {
  x___11__ = 2;
} catch (e___13__) /*14*/ {
  $(x___18__);
}
$(x___22__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18,22       | none           | 11
  - w @11      | ########## | 18,22       | 4              | none
  - r @18      | 4,11
  - r @22      | 4,11

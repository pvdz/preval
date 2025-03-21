# Preval test case

# base_finally.md

> Ref tracking > Done > Throw > Base finally
>
> Base case

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  x = 2;
  throw 'abc';
} catch (e) {
  x = 3;
}
$(x);
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
try /*7*/ {
  x___11__ = 2;
  throw `abc`;
} catch (e___16__) /*17*/ {
  x___21__ = 3;
}
$(x___25__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 11,21
  - w @11      | ########## | not read    | 4              | 21
  - w @21      | ########## | 25          | 4,11           | none
  - r @25      | 21

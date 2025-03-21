# Preval test case

# try2.md

> Ref tracking > Done > Try-catch > Try2
>
> Simplest case? Noop for the binding.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $();
} catch {
}
$(x);
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
try /*7*/ {
  $();
} catch (e___12__) /*13*/ {}
$(x___17__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 17          | none           | none
  - r @17      | 4

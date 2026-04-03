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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ try /*7~10*/ {
  /* stmt(8): */ $();
} catch (/*___12__*/ e) /*13~13*/ {}
/* stmt(14): */ $(/*___17__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 17          | none           | none
  - r @17      | 4

e:
  - w @12      | ########## | not read    | none           | none

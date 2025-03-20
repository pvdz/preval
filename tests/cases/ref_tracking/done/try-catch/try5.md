# Preval test case

# try5.md

> Ref tracking > Done > Try-catch > Try5
>
> Double assignment
> In theory x=2 could succeed and x=3 could fail. Not in this trivialized
> case but in a more complex case.
> As it stands, this trivialized case may be optimized away at some point,
> considering that in this very particular case, if an assignment of a 
> primitive to a binding did not throw before it, the second one will not
> fail either. In that world, the first one is invisible and can be pruned.
> Anyways, in that case we'll have to make this test case more complex to 
> show the spirit of the case.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  x = 2; // Overwrite 1
  x = 3; // Ovewrite 2. In general, this _may_ not execute if the previous assign failed
} catch {
}
$(x); // 1 or 2 or 3 ("any assignment _could_ fail")
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
try /*7*/ {
  x___11__ = 2;
  x___15__ = 3;
} catch (e___17__) /*18*/ {}
$(x___22__);
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 22          | none           | 11
  - w @11      | ########## | 22          | 4              | 15
  - w @15      | ########## | 22          | 11             | none
  - r @22      | 4,11,15

# Preval test case

# try_catch_finally.md

> Ref tracking > Try > Try catch finally

## Options

- refTest

## Input

`````js filename=intro
let a = 1;
try {
  $(a); // can observe 1 2
  a = 2;
} catch {
  $(a); // can observe 1 2
  a = 3;
} finally {
  $(a); // can observe 1 2 3
  a = 4;
}
$(a); // can observe 1 2 3 4
`````

## Output

(Annotated with pids)

`````filename=intro
let a___4__ = 1;
try /*7*/ {
  $(a___11__);
  a___15__ = 2;
} catch (e___17__) /*18*/ {
  $(a___22__);
  a___26__ = 3;
} finally /*27*/ {
  $(a___31__);
  a___35__ = 4;
}
$(a___39__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
a:
  - w @4       | ########## | 39          | none           | none
  - r @11      | none (TDZ?)
  - w @15      | ########## | not read    | none           | none
  - r @22      | none (TDZ?)
  - w @26      | ########## | not read    | none           | none
  - r @31      | none (TDZ?)
  - w @35      | ########## | not read    | none           | none
  - r @39      | 4

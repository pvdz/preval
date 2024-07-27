# Preval test case

# non-entering.md

> Tofix > Non-entering
>
> Normalization of assignments should work the same everywhere they are

Probably caused by ref tracking gone bad...

Ref tracking result:

                | reads      | read by     | overWrites     | overwritten by
a:
- w @4          | ########## | not read    | none           | 21
- w @21         | ########## | 27          | 4              | none
- r @27         | 21

tmpCallCallee:
- w @8          | ########## | 18          | none           | none
- r @18         | 8

tmpCalleeParam:
- w @12         | ########## | 19          | none           | none
- r @19         | 12

tmpForOfRhs:
- w @16         | ########## | 22          | none           | none
- r @22         | 16

## Options

- refTest

## Input

`````js filename=intro
let a = {};
for (a of $([]));
$(a);
`````

## Output

(Annotated with pids)

`````filename=intro
let a___4__ = {};
const tmpCallCallee___8__ = $;
const tmpCalleeParam___12__ = [];
const tmpForOfRhs___16__ = tmpCallCallee___18__(tmpCalleeParam___19__);
for (a___21__ of tmpForOfRhs___22__) /*23*/ {
}
$(a___27__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
a:
  - w @4       | ########## | not read    | none           | 21
  - w @21      | ########## | 27          | 4              | none
  - r @27      | 21

tmpCallCallee:
  - w @8          | ########## | 18          | none           | none
  - r @18         | 8

tmpCalleeParam:
  - w @12          | ########## | 19          | none           | none
  - r @19          | 12

tmpForOfRhs:
  - w @16          | ########## | 22          | none           | none
  - r @22          | 16

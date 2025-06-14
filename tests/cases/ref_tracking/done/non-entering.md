# Preval test case

# non-entering.md

> Ref tracking > Done > Non-entering
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
let /*___7__*/ a = {};
let /*___10__*/ tmpCalleeParam$1 = [];
let /*___13__*/ tmpCalleeParam = $(/*___16__*/ tmpCalleeParam$1);
const /*___18__*/ tmpForOfGen = /*___20__*/ $forOf(/*___21__*/ tmpCalleeParam);
while (/*___23__*/ $LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  /*24~46*/ const /*___28__*/ tmpForOfNext = /*___30__*/ tmpForOfGen();
  const /*___32__*/ tmpIfTest = /*___34__*/ tmpForOfNext./*___35__*/ done;
  if (/*___37__*/ tmpIfTest) {
    /*38~39*/ break;
  } /*40~46*/ else {
    /*___46__*/ a = /*___44__*/ tmpForOfNext./*___45__*/ value;
  }
}
$(/*___50__*/ a);
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
a:
  - w @7       | ########## | 50          | none           | 46
  - w @46      | ########## | 50          | 7,46           | 46
  - r @50      | 7,46

tmpCalleeParam$1:
  - w @10            | ########## | 16          | none           | none
  - r @16            | 10

tmpCalleeParam:
  - w @13            | ########## | 21          | none           | none
  - r @21            | 13

tmpForOfGen:
  - w @18            | ########## | 30          | none           | none
  - r @30            | 18

tmpForOfNext:
  - w @28            | ########## | 34,44       | none           | none
  - r @34            | 28
  - r @44            | 28

tmpIfTest:
  - w @32            | ########## | 37          | none           | none
  - r @37            | 32

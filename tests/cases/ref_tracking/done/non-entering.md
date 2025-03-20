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
let a___4__ = {};
const tmpCalleeParam$1___8__ = [];
const tmpCalleeParam___12__ = $(tmpCalleeParam$1___15__);
let tmpForOfGen___18__ = $forOf___20__(tmpCalleeParam___21__);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___23__) {
  /*24*/ let tmpForOfNext___27__ = tmpForOfGen___30__.next___31__();
  const tmpIfTest___34__ = tmpForOfNext___36__.done___37__;
  if (tmpIfTest___39__) {
    /*40*/ break;
  } /*42*/ else {
    a___48__ = tmpForOfNext___46__.value___47__;
  }
}
$(a___52__);
`````


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
a:
  - w @4       | ########## | 52          | none           | 48
  - w @48      | ########## | 52          | 4,48           | 48
  - r @52      | 4,48

tmpCalleeParam$1:
  - w @8             | ########## | 15          | none           | none
  - r @15            | 8

tmpCalleeParam:
  - w @12            | ########## | 21          | none           | none
  - r @21            | 12

tmpForOfGen:
  - w @18            | ########## | 30          | none           | none
  - r @30            | 18

tmpForOfNext:
  - w @27            | ########## | 36,46       | none           | none
  - r @36            | 27
  - r @46            | 27

tmpIfTest:
  - w @34            | ########## | 39          | none           | none
  - r @39            | 34

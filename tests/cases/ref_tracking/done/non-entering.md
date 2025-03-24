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
let a___7__ = {};
let tmpCalleeParam$1___10__ = [];
let tmpCalleeParam___13__ = $(tmpCalleeParam$1___16__);
const tmpForOfGen___18__ = $forOf___20__(tmpCalleeParam___21__);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___23__) {
  /*24*/ const tmpForOfNext___28__ = tmpForOfGen___31__.next___32__();
  const tmpIfTest___34__ = tmpForOfNext___36__.done___37__;
  if (tmpIfTest___39__) {
    /*40*/ break;
  } /*42*/ else {
    a___48__ = tmpForOfNext___46__.value___47__;
  }
}
$(a___52__);
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
a:
  - w @7       | ########## | 52          | none           | 48
  - w @48      | ########## | 52          | 7,48           | 48
  - r @52      | 7,48

tmpCalleeParam$1:
  - w @10            | ########## | 16          | none           | none
  - r @16            | 10

tmpCalleeParam:
  - w @13            | ########## | 21          | none           | none
  - r @21            | 13

tmpForOfGen:
  - w @18            | ########## | 31          | none           | none
  - r @31            | 18

tmpForOfNext:
  - w @28            | ########## | 36,46       | none           | none
  - r @36            | 28
  - r @46            | 28

tmpIfTest:
  - w @34            | ########## | 39          | none           | none
  - r @39            | 34

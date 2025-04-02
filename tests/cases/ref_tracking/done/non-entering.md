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
  /*24*/ const tmpForOfNext___28__ = tmpForOfGen___30__();
  const tmpIfTest___32__ = tmpForOfNext___34__.done___35__;
  if (tmpIfTest___37__) {
    /*38*/ break;
  } /*40*/ else {
    a___46__ = tmpForOfNext___44__.value___45__;
  }
}
$(a___50__);
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

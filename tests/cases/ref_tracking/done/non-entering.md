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
const tmpCallCallee___8__ = $forOf___9__;
const tmpCallCallee$1___12__ = $;
const tmpCalleeParam$1___16__ = [];
const tmpCalleeParam___20__ = tmpCallCallee$1___22__(tmpCalleeParam$1___23__);
let tmpForOfGen___26__ = tmpCallCallee___28__(tmpCalleeParam___29__);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___31__) {
  /*32*/ let tmpForOfNext___35__ = tmpForOfGen___38__.next___39__();
  const tmpIfTest___42__ = tmpForOfNext___44__.done___45__;
  if (tmpIfTest___47__) {
    /*48*/ break;
  } /*50*/ else {
    a___56__ = tmpForOfNext___54__.value___55__;
  }
}
$(a___60__);
`````

Ref tracking result:

                     | reads      | read by     | overWrites     | overwritten by
a:
  - w @4       | ########## | 60          | none           | 56
  - w @56      | ########## | 60          | 4,56           | 56
  - r @60      | 4,56

tmpCallCallee:
  - w @8          | ########## | 28          | none           | none
  - r @28         | 8

tmpCallCallee$1:
  - w @12           | ########## | 22          | none           | none
  - r @22           | 12

tmpCalleeParam$1:
  - w @16            | ########## | 23          | none           | none
  - r @23            | 16

tmpCalleeParam:
  - w @20            | ########## | 29          | none           | none
  - r @29            | 20

tmpForOfGen:
  - w @26            | ########## | 38          | none           | none
  - r @38            | 26

tmpForOfNext:
  - w @35            | ########## | 44,54       | none           | none
  - r @44            | 35
  - r @54            | 35

tmpIfTest:
  - w @42            | ########## | 47          | none           | none
  - r @47            | 42

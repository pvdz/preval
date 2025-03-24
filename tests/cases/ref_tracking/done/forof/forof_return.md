# Preval test case

# forof_return.md

> Ref tracking > Done > Forof > Forof return
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Options

- refTest

## Input

`````js filename=intro
function f() {
  for (let x of [10, 20]) {
    return $(1, 'return');
    $('fail');
  }
  $('keep, do not eval');
}
$(f());
`````


## Output

(Annotated with pids)

`````filename=intro
let f___5__ = function () /*7*/ {
  debugger;
  let tmpCalleeParam___12__ = [10, 20];
  const tmpForOfGen___17__ = $forOf___19__(tmpCalleeParam___20__);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___22__) {
    /*23*/ const tmpForOfNext___27__ = tmpForOfGen___30__.next___31__();
    const tmpIfTest___33__ = tmpForOfNext___35__.done___36__;
    if (tmpIfTest___38__) {
      /*39*/ break;
    } /*41*/ else {
      let x___45__ = tmpForOfNext___47__.value___48__;
      const tmpReturnArg___50__ = $(1, `return`);
      return tmpReturnArg___58__;
    }
  }
  $(`keep, do not eval`);
  return undefined___65__;
};
let tmpCalleeParam$1___67__ = f___69__();
$(tmpCalleeParam$1___73__);
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
f:
  - w @5       | ########## | 69          | none           | none
  - r @69      | 5

tmpCalleeParam:
  - w @12          | ########## | 20          | none           | none
  - r @20          | 12

tmpForOfGen:
  - w @17          | ########## | 30          | none           | none
  - r @30          | 17

tmpForOfNext:
  - w @27          | ########## | 35,47       | none           | none
  - r @35          | 27
  - r @47          | 27

tmpIfTest:
  - w @33          | ########## | 38          | none           | none
  - r @38          | 33

x:
  - w @45          | ########## | not read    | none           | none

tmpReturnArg:
  - w @50          | ########## | 58          | none           | none
  - r @58          | 50

tmpCalleeParam$1:
  - w @67            | ########## | 73          | none           | none
  - r @73            | 67

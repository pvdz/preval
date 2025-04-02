# Preval test case

# forin_return.md

> Ref tracking > Done > Forin > Forin return
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Options

- refTest

## Input

`````js filename=intro
function f() {
  const obj = {a:10, b:20};
  for (const x in obj) {
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
  const obj___12__ = { a___15__: 10, b___18__: 20 };
  const tmpForInGen___21__ = $forIn___23__(obj___24__);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___26__) {
    /*27*/ const tmpForInNext___31__ = tmpForInGen___33__();
    const tmpIfTest___35__ = tmpForInNext___37__.done___38__;
    if (tmpIfTest___40__) {
      /*41*/ break;
    } /*43*/ else {
      const x___47__ = tmpForInNext___49__.value___50__;
      const tmpReturnArg___52__ = $(1, `return`);
      return tmpReturnArg___60__;
    }
  }
  $(`keep, do not eval`);
  return undefined___67__;
};
let tmpCalleeParam___69__ = f___71__();
$(tmpCalleeParam___75__);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
f:
  - w @5       | ########## | 71          | none           | none
  - r @71      | 5

obj:
  - w @12      | ########## | 24          | none           | none
  - r @24      | 12

tmpForInGen:
  - w @21       | ########## | 33          | none           | none
  - r @33       | 21

tmpForInNext:
  - w @31        | ########## | 37,49       | none           | none
  - r @37        | 31
  - r @49        | 31

tmpIfTest:
  - w @35        | ########## | 40          | none           | none
  - r @40        | 35

x:
  - w @47        | ########## | not read    | none           | none

tmpReturnArg:
  - w @52        | ########## | 60          | none           | none
  - r @60        | 52

tmpCalleeParam:
  - w @69          | ########## | 75          | none           | none
  - r @75          | 69

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
    /*27*/ const tmpForInNext___31__ = tmpForInGen___34__.next___35__();
    const tmpIfTest___37__ = tmpForInNext___39__.done___40__;
    if (tmpIfTest___42__) {
      /*43*/ break;
    } /*45*/ else {
      const x___49__ = tmpForInNext___51__.value___52__;
      const tmpReturnArg___54__ = $(1, `return`);
      return tmpReturnArg___62__;
    }
  }
  $(`keep, do not eval`);
  return undefined___69__;
};
let tmpCalleeParam___71__ = f___73__();
$(tmpCalleeParam___77__);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
f:
  - w @5       | ########## | 73          | none           | none
  - r @73      | 5

obj:
  - w @12      | ########## | 24          | none           | none
  - r @24      | 12

tmpForInGen:
  - w @21       | ########## | 34          | none           | none
  - r @34       | 21

tmpForInNext:
  - w @31        | ########## | 39,51       | none           | none
  - r @39        | 31
  - r @51        | 31

tmpIfTest:
  - w @37        | ########## | 42          | none           | none
  - r @42        | 37

x:
  - w @49        | ########## | not read    | none           | none

tmpReturnArg:
  - w @54        | ########## | 62          | none           | none
  - r @62        | 54

tmpCalleeParam:
  - w @71          | ########## | 77          | none           | none
  - r @77          | 71

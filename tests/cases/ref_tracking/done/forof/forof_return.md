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
let f___4__ = function () /*6*/ {
  debugger;
  const tmpCalleeParam___10__ = [10, 20];
  let tmpForOfGen___16__ = $forOf___18__(tmpCalleeParam___19__);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___21__) {
    /*22*/ let tmpForOfNext___25__ = tmpForOfGen___28__.next___29__();
    const tmpIfTest___32__ = tmpForOfNext___34__.done___35__;
    if (tmpIfTest___37__) {
      /*38*/ break;
    } /*40*/ else {
      let x___43__ = tmpForOfNext___45__.value___46__;
      const tmpReturnArg___49__ = $(1, `return`);
      return tmpReturnArg___57__;
    }
  }
  $(`keep, do not eval`);
  return undefined___64__;
};
const tmpCalleeParam$1___67__ = f___69__();
$(tmpCalleeParam$1___73__);
`````

Ref tracking result:

                     | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 69          | none           | none
  - r @69      | 4

tmpCalleeParam:
  - w @10          | ########## | 19          | none           | none
  - r @19          | 10

tmpForOfGen:
  - w @16          | ########## | 28          | none           | none
  - r @28          | 16

tmpForOfNext:
  - w @25          | ########## | 34,45       | none           | none
  - r @34          | 25
  - r @45          | 25

tmpIfTest:
  - w @32          | ########## | 37          | none           | none
  - r @37          | 32

x:
  - w @43          | ########## | not read    | none           | none

tmpReturnArg:
  - w @49          | ########## | 57          | none           | none
  - r @57          | 49

tmpCalleeParam$1:
  - w @67            | ########## | 73          | none           | none
  - r @73            | 67

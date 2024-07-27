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
let f___4__ = function () {
  debugger;
  const tmpCallCallee___10__ = $forOf___11__;
  const tmpCalleeParam___14__ = [10, 20];
  let tmpForOfGen___20__ = tmpCallCallee___22__(tmpCalleeParam___23__);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___25__) {
    /*26*/ let tmpForOfNext___29__ = tmpForOfGen___32__.next___33__();
    const tmpIfTest___36__ = tmpForOfNext___38__.done___39__;
    if (tmpIfTest___41__) {
      /*42*/ break;
    } /*44*/ else {
      let x___47__ = tmpForOfNext___49__.value___50__;
      const tmpReturnArg___53__ = $(1, `return`);
      return tmpReturnArg___61__;
    }
  }
  $(`keep, do not eval`);
  return undefined___68__;
};
const tmpCallCallee$1___71__ = $;
const tmpCalleeParam$1___75__ = f___77__();
tmpCallCallee$1___80__(tmpCalleeParam$1___81__);
`````

Ref tracking result:

                     | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 77          | none           | none
  - r @77      | 4

tmpCallCallee:
  - w @10         | ########## | 22          | none           | none
  - r @22         | 10

tmpCalleeParam:
  - w @14          | ########## | 23          | none           | none
  - r @23          | 14

tmpForOfGen:
  - w @20          | ########## | 32          | none           | none
  - r @32          | 20

tmpForOfNext:
  - w @29          | ########## | 38,49       | none           | none
  - r @38          | 29
  - r @49          | 29

tmpIfTest:
  - w @36          | ########## | 41          | none           | none
  - r @41          | 36

x:
  - w @47          | ########## | not read    | none           | none

tmpReturnArg:
  - w @53          | ########## | 61          | none           | none
  - r @61          | 53

tmpCallCallee$1:
  - w @71           | ########## | 80          | none           | none
  - r @80           | 71

tmpCalleeParam$1:
  - w @75            | ########## | 81          | none           | none
  - r @81            | 75

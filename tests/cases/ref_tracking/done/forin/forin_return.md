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
let f___4__ = function () {
  debugger;
  const obj___10__ = { a___13__: 10, b___16__: 20 };
  let tmpForInGen___20__ = $forIn___22__(obj___23__);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___25__) {
    /*26*/ let tmpForInNext___29__ = tmpForInGen___32__.next___33__();
    const tmpIfTest___36__ = tmpForInNext___38__.done___39__;
    if (tmpIfTest___41__) {
      /*42*/ break;
    } /*44*/ else {
      const x___47__ = tmpForInNext___49__.value___50__;
      const tmpReturnArg___53__ = $(1, `return`);
      return tmpReturnArg___61__;
    }
  }
  $(`keep, do not eval`);
  return undefined___68__;
};
const tmpCallCallee___71__ = $;
const tmpCalleeParam___75__ = f___77__();
tmpCallCallee___80__(tmpCalleeParam___81__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 77          | none           | none
  - r @77      | 4

obj:
  - w @10      | ########## | 23          | none           | none
  - r @23      | 10

tmpForInGen:
  - w @20       | ########## | 32          | none           | none
  - r @32       | 20

tmpForInNext:
  - w @29        | ########## | 38,49       | none           | none
  - r @38        | 29
  - r @49        | 29

tmpIfTest:
  - w @36        | ########## | 41          | none           | none
  - r @41        | 36

x:
  - w @47        | ########## | not read    | none           | none

tmpReturnArg:
  - w @53        | ########## | 61          | none           | none
  - r @61        | 53

tmpCallCallee:
  - w @71         | ########## | 80          | none           | none
  - r @80         | 71

tmpCalleeParam:
  - w @75          | ########## | 81          | none           | none
  - r @81          | 75

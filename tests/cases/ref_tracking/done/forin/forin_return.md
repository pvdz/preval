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
  const tmpForInDeclRhs___20__ = obj___21__;
  let x___24__ = undefined___25__;
  for (x___27__ in tmpForInDeclRhs___28__) /*29*/ {
    const tmpReturnArg___32__ = $(1, `return`);
    return tmpReturnArg___40__;
  }
  $(`keep, do not eval`);
  return undefined___47__;
};
const tmpCallCallee___50__ = $;
const tmpCalleeParam___54__ = f___56__();
tmpCallCallee___59__(tmpCalleeParam___60__);
`````

Ref tracking result:

                    | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 56          | none           | none
  - r @56      | 4

obj:
  - w @10      | ########## | 21          | none           | none
  - r @21      | 10

tmpForInDeclRhs:
  - w @20           | ########## | 28          | none           | none
  - r @28           | 20

x:
  - w @24           | ########## | not read    | none           | 27
  - w @27           | ########## | not read    | 24             | none

tmpReturnArg:
  - w @32           | ########## | 40          | none           | none
  - r @40           | 32

tmpCallCallee:
  - w @50           | ########## | 59          | none           | none
  - r @59           | 50

tmpCalleeParam:
  - w @54           | ########## | 60          | none           | none
  - r @60           | 54

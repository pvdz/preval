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
  const tmpForOfDeclRhs___10__ = [10, 20];
  let x___16__ = undefined___17__;
  for (x___19__ of tmpForOfDeclRhs___20__) /*21*/ {
    const tmpReturnArg___24__ = $(1, `return`);
    return tmpReturnArg___32__;
  }
  $(`keep, do not eval`);
  return undefined___39__;
};
const tmpCallCallee___42__ = $;
const tmpCalleeParam___46__ = f___48__();
tmpCallCallee___51__(tmpCalleeParam___52__);
`````

Ref tracking result:

                    | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 48          | none           | none
  - r @48      | 4

tmpForOfDeclRhs:
  - w @10           | ########## | 20          | none           | none
  - r @20           | 10

x:
  - w @16           | ########## | not read    | none           | 19
  - w @19           | ########## | not read    | 16             | none

tmpReturnArg:
  - w @24           | ########## | 32          | none           | none
  - r @32           | 24

tmpCallCallee:
  - w @42           | ########## | 51          | none           | none
  - r @51           | 42

tmpCalleeParam:
  - w @46           | ########## | 52          | none           | none
  - r @52           | 46

# Preval test case

# forof.md

> Normalize > Dce > Return > Forof
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

#TODO

## Input

`````js filename=intro
function f() {
  for (let x of [10, 20]) {
    return $(1, 'return');
    $('fail');
  }
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpForOfDeclRhs = [10, 20];
  let x;
  for (x of tmpForOfDeclRhs) {
    const tmpReturnArg = $(1, 'return');
    return tmpReturnArg;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpForOfDeclRhs = [10, 20];
  let x;
  for (x of tmpForOfDeclRhs) {
    const tmpReturnArg = $(1, 'return');
    return tmpReturnArg;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'return'
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

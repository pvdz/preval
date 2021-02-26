# Preval test case

# forin1.md

> Normalize > Dce > Return > Forin1
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

#TODO

## Input

`````js filename=intro
function f() {
  for (let x in {a: 1, b: 2}) {
    return $(1, 'return');
  }
  $('keep, do not eval');
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpForInDeclRhs = { a: 1, b: 2 };
  let x;
  for (x in tmpForInDeclRhs) {
    const tmpReturnArg = $(1, 'return');
    return tmpReturnArg;
  }
  $('keep, do not eval');
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpForInDeclRhs = { a: 1, b: 2 };
  let x;
  for (x in tmpForInDeclRhs) {
    const tmpReturnArg = $(1, 'return');
    return tmpReturnArg;
  }
  $('keep, do not eval');
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

# Preval test case

# base.md

> normalize > dce > base
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
  $('keep, do not eval');
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    const tmpForOfDeclRhs = [10, 20];
    let x;
    for (x of tmpForOfDeclRhs) {
      const tmpReturnArg = $(1, 'return');
      return tmpReturnArg;
    }
  }
  $('keep, do not eval');
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1, 'return'
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined

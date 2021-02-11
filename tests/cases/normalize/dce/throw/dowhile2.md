# Preval test case

# base.md

> normalize > dce > base
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  do {
    throw $(1, 'return');
    $('fail');
  } while ($(true));
  $('keep, do not eval');
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let tmpDoWhileTest;
  do {
    let tmpThrowArg = $(1, 'return');
    throw tmpThrowArg;
  } while (tmpDoWhileTest);
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
 - eval returned: ('<crash[ 1 ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined

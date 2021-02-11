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
    throw $(1, 'throw');
    $('fail');
  } while ($(true));
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let tmpDoWhileTest;
  do {
    let tmpThrowArg = $(1, 'throw');
    throw tmpThrowArg;
  } while (tmpDoWhileTest);
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
 - 1: 1, 'throw'
 - eval returned: ('<crash[ 1 ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined

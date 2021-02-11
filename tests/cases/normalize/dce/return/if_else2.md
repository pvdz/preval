# Preval test case

# base.md

> normalize > dce > base
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    return 2;
    $('fail');
  }
  return 3;
  $('fail');
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    return 2;
  }
  return 3;
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
 - 1: 1
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined

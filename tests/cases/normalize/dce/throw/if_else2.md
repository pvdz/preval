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
    throw 2;
    $('fail');
  }
  throw 3;
  $('fail');
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    throw 2;
  }
  throw 3;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    throw 2;
  }
  throw 3;
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ 2 ]>')

Normalized calls: Same

Final output calls: Same
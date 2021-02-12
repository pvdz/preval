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
  $('keep, do not eval');
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
  $('keep, do not eval');
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
    return 2;
  }
  $('keep, do not eval');
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

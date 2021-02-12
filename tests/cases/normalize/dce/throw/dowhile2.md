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
  let tmpDoWhileFlag = true;
  while (true) {
    let tmpIfTest = tmpDoWhileFlag;
    if (tmpIfTest) {
    } else {
      tmpIfTest = $(true);
    }
    if (tmpIfTest) {
      tmpDoWhileFlag = false;
      const tmpThrowArg = $(1, 'return');
      throw tmpThrowArg;
    } else {
      break;
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
function f() {
  let tmpDoWhileFlag = true;
  while (true) {
    let tmpIfTest = tmpDoWhileFlag;
    if (tmpIfTest) {
    } else {
      tmpIfTest = $(true);
    }
    if (tmpIfTest) {
      tmpDoWhileFlag = false;
      const tmpThrowArg = $(1, 'return');
      throw tmpThrowArg;
    } else {
      break;
    }
  }
  $('keep, do not eval');
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 1, 'return'
 - eval returned: ('<crash[ 1 ]>')

Normalized calls: Same

Final output calls: Same

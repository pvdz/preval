# Preval test case

# dowhile.md

> Normalize > Dce > Throw > Dowhile
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

## Pre Normal

`````js filename=intro
let f = function () {
  {
    let tmpDoWhileFlag = true;
    while (tmpDoWhileFlag || $(true)) {
      tmpDoWhileFlag = false;
      {
        throw $(1, 'throw');
        $('fail');
      }
    }
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let tmpDoWhileFlag = true;
  while (true) {
    let tmpIfTest = tmpDoWhileFlag;
    if (tmpIfTest) {
    } else {
      tmpIfTest = $(true);
    }
    if (tmpIfTest) {
      tmpDoWhileFlag = false;
      const tmpThrowArg = $(1, 'throw');
      throw tmpThrowArg;
    } else {
      break;
    }
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  let tmpDoWhileFlag = true;
  while (true) {
    let tmpIfTest = tmpDoWhileFlag;
    if (tmpIfTest) {
    } else {
      tmpIfTest = $(true);
    }
    if (tmpIfTest) {
      tmpDoWhileFlag = false;
      const tmpThrowArg = $(1, 'throw');
      throw tmpThrowArg;
    } else {
      break;
    }
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'throw'
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

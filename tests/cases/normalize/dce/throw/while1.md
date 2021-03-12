# Preval test case

# while1.md

> Normalize > Dce > Throw > While1
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

#TODO

## Input

`````js filename=intro
function f() {
  while ($(true)) {
    throw $(1, 'throw');
  }
  $('keep, do not eval');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  while ($(true)) {
    throw $(1, 'throw');
  }
  $('keep, do not eval');
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  while (true) {
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      const tmpThrowArg = $(1, 'throw');
      throw tmpThrowArg;
    } else {
      break;
    }
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
  while (true) {
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      const tmpThrowArg = $(1, 'throw');
      throw tmpThrowArg;
    } else {
      break;
    }
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
 - 1: true
 - 2: 1, 'throw'
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

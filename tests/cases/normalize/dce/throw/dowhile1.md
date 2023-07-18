# Preval test case

# dowhile1.md

> Normalize > Dce > Throw > Dowhile1
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  do {
    throw $(1, 'return');
  } while ($(true));
  $('keep, do not eval');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let tmpDoWhileFlag = true;
    while (tmpDoWhileFlag) {
      {
        throw $(1, `return`);
      }
      tmpDoWhileFlag = $(true);
    }
  }
  $(`keep, do not eval`);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let tmpDoWhileFlag = true;
  while (true) {
    if (tmpDoWhileFlag) {
      const tmpThrowArg = $(1, `return`);
      throw tmpThrowArg;
    } else {
      break;
    }
  }
  $(`keep, do not eval`);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpThrowArg = $(1, `return`);
throw tmpThrowArg;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1, "return" );
throw a;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'return'
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

# Preval test case

# if_else.md

> Normalize > Dce > Return > If else
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) return 2;
  else return 3;
  $('fail');
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($(1)) return 2;
  else return 3;
  $(`fail`);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    return 2;
  } else {
    return 3;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    return 2;
  } else {
    return 3;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  if (b) {
    return 2;
  }
  else {
    return 3;
  }
};
const c = a();
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

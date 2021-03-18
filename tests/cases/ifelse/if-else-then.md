# Preval test case

# if-else-then.md

> Ifelse > If-else-then
>
> This should be abstracted

#TODO

## Input

`````js filename=intro
function f() {
  $('A');
  if ($(1)) {
    $('B');
  } else {
    $('C');
  }
  $('D');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  $('A');
  if ($(1)) {
    $('B');
  } else {
    $('C');
  }
  $('D');
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  $('A');
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $('B');
  } else {
    $('C');
  }
  $('D');
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  $('A');
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $('B');
  } else {
    $('C');
  }
  $('D');
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'A'
 - 2: 1
 - 3: 'B'
 - 4: 'D'
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
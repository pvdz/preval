# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Assignments > Tagged > Auto ident arrow
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = () => {})} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = () => {
  debugger;
})} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
a = function () {
  debugger;
  return undefined;
};
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ['before ', ' after'];
const a = function () {
  debugger;
  return undefined;
};
$(tmpCalleeParam, a);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['before ', ' after'], '<function>'
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

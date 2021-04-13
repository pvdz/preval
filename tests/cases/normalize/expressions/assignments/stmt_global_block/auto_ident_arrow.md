# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Assignments > Stmt global block > Auto ident arrow
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = () => {};
  $(a);
}
`````

## Pre Normal

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = () => {
    debugger;
  };
  $(a);
}
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = function () {
  debugger;
  return undefined;
};
$(a);
`````

## Output

`````js filename=intro
const tmpSSA_a = function () {
  debugger;
  return undefined;
};
$(tmpSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

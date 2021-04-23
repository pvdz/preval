# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Assignments > For in right > Auto ident arrow
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = () => {}));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = () => {
  debugger;
}));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = function () {
  debugger;
  return undefined;
};
let tmpForInDeclRhs = a;
let x = undefined;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Output

`````js filename=intro
const a = function () {
  debugger;
  return undefined;
};
let x = undefined;
for (x in a) {
}
$(a);
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

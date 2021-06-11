# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Statement > For of right > Auto ident arrow
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of () => {});
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of () => {
  debugger;
});
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpForOfDeclRhs = function () {
  debugger;
  return undefined;
};
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Output

`````js filename=intro
const tmpForOfDeclRhs = function () {
  debugger;
  return undefined;
};
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

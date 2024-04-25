# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Statement > Arr spread > Auto ident func anon
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...function () {}];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
[
  ...function () {
    debugger;
  },
];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpArrElToSpread = function () {
  debugger;
  return undefined;
};
[...tmpArrElToSpread];
$(a);
`````

## Output

`````js filename=intro
const tmpArrElToSpread = function () {
  debugger;
  return undefined;
};
[...tmpArrElToSpread];
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
[ ... a ];
const b = {
a: 999,
b: 1000
;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

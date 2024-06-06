# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > For in right > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = function f() {}));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = function f() {
  debugger;
}));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const f = function () {
  debugger;
  return undefined;
};
a = f;
let tmpForInDeclRhs = a;
let x = undefined;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  return undefined;
};
let x = undefined;
for (x in f) {
}
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
let b = undefined;
for (b in a) {

}
$( a );
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

# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Assignments > Arr element > Auto ident func anon
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = function () {}) + (a = function () {}));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = function () {
    debugger;
  }) +
    (a = function () {
      debugger;
    }),
);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = function () {
  debugger;
  return undefined;
};
let tmpBinBothLhs = a;
a = function () {
  debugger;
  return undefined;
};
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = function () {
  debugger;
  return undefined;
};
const tmpBinBothLhs = a;
a = function () {
  debugger;
  return undefined;
};
const tmpCalleeParam = tmpBinBothLhs + a;
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = function() {
  debugger;
  return undefined;
};
const b = a;
a = function() {
  debugger;
  return undefined;
};
const c = b + a;
$( c );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function() {return undefined;}function() {return undefined;}'
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
